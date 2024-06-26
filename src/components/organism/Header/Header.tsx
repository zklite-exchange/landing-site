/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import { COMMON_TNS } from "@/lib/i18n/consts";
import LinkText from "@/components/atomic/LinkText/LinkText";
import { Listbox, Transition } from "@headlessui/react";
import { FaDiscord, FaTwitter, FaTelegram, FaGithub } from "react-icons/fa";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";
import { useRouter } from "next/router";
import Dropdown from "@/components/atomic/Dropdown/Dropdown";
import MobileDropdown from "@/components/atomic/MobileDropdown/MobileDropdown";
import Button from "@/components/atomic/Button/Button";
import Link from "next/link";

type HeaderProps = {};

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "en",
    icon: "https://raw.githubusercontent.com/OnTheGoSystems/SVG-flags-language-switcher/master/flags/en.svg",
  },
  {
    code: "zh",
    name: "中文",
    country_code: "zh",
    icon: "https://raw.githubusercontent.com/OnTheGoSystems/SVG-flags-language-switcher/master/flags/cn.svg",
  },
  {
    code: "ir",
    name: "فارسی",
    country_code: "ir",
    icon: "https://raw.githubusercontent.com/OnTheGoSystems/SVG-flags-language-switcher/master/flags/ir.svg",
  },
  {
    code: "tr",
    name: "Türkçe",
    country_code: "tr",
    icon: "https://raw.githubusercontent.com/OnTheGoSystems/SVG-flags-language-switcher/master/flags/tr.svg",
  },
  {
    code: "kr",
    name: "한국어",
    country_code: "kr",
    icon: "https://raw.githubusercontent.com/OnTheGoSystems/SVG-flags-language-switcher/master/flags/kr.svg",
  },
];

const mobileOptions = [
  {
    value: "documents",
    label: "Documents",
    url: "https://docs.zklite.io/",
  },
  {
    value: "community",
    label: "Community Support",
    url: "https://t.me/zklite_io",
  },
  { value: "contact", label: "Contact", url: "mailto:contact@zklite.io" },
];

/** Make sure to pass GLOSSARY_TNS and COMMON_TNS to where it is called */
export const Header: React.FC<HeaderProps> = (props) => {
  //const { children } = props;
  const router = useRouter();
  const theme = 'dark';
  const { locale } = useRouter();
  const { t, i18n } = useTranslation([COMMON_TNS]);

  const [isMounted, setIsMounted] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const [mobileSupportMenu, setMobileSupportMenu] = useState(mobileOptions);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const p: any = languages.find((lng) => lng.code === locale);
    setSelected(p);
    const mobileSupport: any = mobileOptions.map((item) => {
      return { ...item, label: t(item.label) };
    });
    setMobileSupportMenu(mobileSupport);
  }, [locale, t]);

  // const switchTheme = () => {
  //   if (isMounted) setTheme(theme === "light" ? "dark" : "light");
  // };

  const handleSelectLang = (option: any) => {
    //TODO as hook
    const v = option;
    i18n.changeLanguage(option.code);
    router.push(router.route, undefined, { locale: option.code });
    setSelected(v);
  };

  if (!isMounted) return null;

  return (
    <>
      <header
        data-aos="fade-down"
        data-aos-duration="600"
        className="sticky top-0 left-0 right-0 z-40 flex-none w-full px-4 transition-colors duration-500 md:px-8 backdrop-blur lg:z-10 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
      >
        <div className="flex items-center justify-between h-20 m-auto 2xl:max-w-screen-2xl xl:max-w-screen-xl ">
          <div className="flex items-center ">
            <Link href="/" passHref={true}>
              <Image
                src="/assets/logo.png"
                alt="Vercel Logo"
                width={100}
                height={32}
              />
            </Link>
            {/* <Dropdown
              btnText={t("fiat")}
              options={fiatOptions}
              className="hidden lg:ml-4 xl:ml-7 lg:block"
            /> */}
            <LinkText
              href="https://docs.zklite.io"
              target="_blank"
              className="hidden py-2 text-sm font-semibold leading-6 dark:hover:text-amber-400 text-slate-800 dark:text-slate-200 lg:ml-4 xl:ml-10 font-work lg:block hover:underline hover:underline-offset-2"
            >
              {t("Documents")}
            </LinkText>
            <LinkText
              href="/contact"
              target="_blank"
              className="hidden py-2 text-sm font-semibold leading-6 dark:hover:text-amber-400 text-slate-800 dark:text-slate-200 lg:ml-4 xl:ml-10 font-work lg:block hover:underline hover:underline-offset-2"
            >
              {t("Contact")}
            </LinkText>
            {/* <Dropdown
              btnText={"ZigZag Labs"}
              options={labsOptions}
              className="hidden lg:ml-0 xl:ml-7 lg:block"
            /> */}
            <div className="ml-2 lg:hidden md:ml-7">
              <MobileDropdown options={mobileSupportMenu} />
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="hidden gap-6 mt-1 lg:flex">
              <a
                href="https://twitter.com/zklite_exchange"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaTwitter
                  className="cursor-pointer dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
                  size={20}
                />
              </a>
              <a
                href="https://github.com/zklite-exchange"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub
                  className="cursor-pointer dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
                  size={20}
                />
              </a>
               <a
                href="https://discord.gg/cQGuG2XX"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaDiscord
                  className="cursor-pointer dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
                  size={20}
                />{" "}
              </a> 

              <a
                href="https://t.me/zklite_io"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaTelegram
                  className="cursor-pointer dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
                  size={20}
                />
              </a>
            </div>
            <div className="flex items-center ml-2 mr-4 md:ml-6">
              <Listbox value={selected} onChange={handleSelectLang}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative flex items-center w-full gap-2 py-[3px] pl-3 pr-8 text-sm font-semibold dark:hover:text-amber-400 text-left cursor-pointer hover:text-primary-900 font-work dark:text-white-900 text-foreground400 ">
                    <Image
                      src={selected.icon}
                      alt={selected.name}
                      className="rounded-full"
                      width={20}
                      height={20}
                    />
                    <span className="block truncate">{selected.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon
                        className="w-5 h-5 mt-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute min-w-max right-0 py-1 mt-1 overflow-auto text-sm dark:bg-[#191A33] border dark:border-foreground-400 bg-sky-100 rounded-md shadow-lg max-h-60">
                      {languages.map((lang, langIdx) => (
                        <Listbox.Option
                          key={langIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 px-4 ${
                              active
                                ? "dark:bg-[#2B2E4A] bg-[#ecf8fa]"
                                : "text-white-900"
                            }`
                          }
                          value={lang}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`flex items-center gap-2 truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                <img
                                  src={lang.icon}
                                  alt={lang.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                {lang.name}
                              </span>
                              {/* {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-900">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              {/*<div className="md:px-4">*/}
              {/*  {theme === "dark" ? (*/}
              {/*    <SunIcon*/}
              {/*      className="w-5 h-5 text-white cursor-pointer"*/}
              {/*      onClick={switchTheme}*/}
              {/*    />*/}
              {/*  ) : (*/}
              {/*    <MoonIcon*/}
              {/*      className="w-5 h-5 cursor-pointer"*/}
              {/*      onClick={switchTheme}*/}
              {/*    />*/}
              {/*  )}*/}
              {/*</div>*/}
            </div>

            <div>
              <a
                href="https://trade.zklite.io/"
                rel="noopener noreferrer"
                target="_blank"
                className="!hover:no-underline"
              >
                <Button
                  className="text-xs font-bold uppercase "
                  type="gradient"
                >
                  {t("Start Trading")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
