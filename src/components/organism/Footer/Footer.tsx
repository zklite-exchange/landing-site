import classNames from "classnames";
import React from "react";
import { BsTwitter, BsGithub, BsDiscord, BsTelegram } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { COMMON_TNS } from "@/lib/i18n/consts";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

import styles from "./footer.module.css";

const content = [
  {
    category: "Resources",
    items: [
      {
        name: "Documentation",
        url: "https://docs.zklite.io/",
      },
      {
        name: "Uptime Status",
        url: "https://status.zklite.io//",
      },
      {
        name: "GitHub",
        url: "https://github.com/zklite-exchange",
      },
    ],
  },
  {
    category: "Links",
    items: [
      {
        name: "zkSync",
        url: "https://zksync.io/",
      },
      {
        name: "zkScan",
        url: "https://zkscan.io/",
      },
      // {
      //   name: "CoinGecko",
      //   url: "https://www.coingecko.com/en/coins/zigzag",
      // },
      // {
      //   name: "CoinMarketCap",
      //   url: "https://coinmarketcap.com/currencies/zigzag/",
      // },
    ],
  },
  {
    category: "Community",
    items: [
      {
        name: "Twitter",
        url: "https://twitter.com/zklite_exchange",
      },
      {
        name: "Discord",
        url: "https://discord.gg/cQGuG2XX",
      },  
      {
        name: "Telegram",
        url: "https://t.me/zklite_io",
      },
    ],
  },
];

const Footer = () => {
  const { t } = useTranslation([COMMON_TNS]);
  const { theme } = useTheme();
  return (
    <div className="px-2 md:px-8">
      <div
        className={classNames(
          styles.footer,
          "grid grid-cols-1 md:grid-cols-3 mt-44 lg:gap-16 gap-10 pb-16"
        )}
      >
        <div>
          <Link href="/" passHref={true}>
            <Image
              src="/assets/logo.png"
              alt="Vercel Logo"
              width={100}
              height={32}
            />
          </Link>
          <p className="mt-5 font-normal leading-8 tracking-wide font-work text-slate-800 dark:text-slate-200">
            {t(
              "A decentralized order book exchange powered by zero-knowledge technology."
            )}
          </p>
          <div className="flex items-center gap-10 mt-7">
            <a
              href="https://twitter.com/zklite_exchange"
              className=" text-base !font-light font-work dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsTwitter className="w-6 h-6 cursor-pointer" />
            </a>
            <a
              href="https://github.com/zklite-exchange"
              className=" text-base !font-light font-work dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsGithub className="w-6 h-6 cursor-pointer " />
            </a>
            <a
              href="https://discord.com/invite/cQGuG2XX"
              className=" text-base !font-light font-work dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsDiscord className="w-6 h-6 cursor-pointer " />
            </a> 
            <a
              href="https://t.me/zklite_io"
              className=" text-base !font-light font-work dark:hover:text-amber-400 text-slate-800 dark:text-slate-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsTelegram className="w-6 h-6 cursor-pointer " />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-2 gap-5 lg:grid-cols-3">
          {content.map((data: any, idx: any) => {
            return (
              <div className="flex flex-col gap-4 md:ml-10 lg:ml-0" key={idx}>
                <p className="text-base font-medium font-work">
                  {data.category}
                </p>
                {data.items.map((item: any, index: any) => {
                  return (
                    <a
                      href={item.url}
                      className=" text-base !font-normal dark:hover:text-amber-400 text-slate-800 dark:text-slate-200 font-work  hover:underline hover:underline-offset-4 "
                      rel="noopener noreferrer"
                      target="_blank"
                      key={index}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="py-10 text-center">
        <p className="font-normal font-work text-slate-600 dark:text-slate-400">
          © 2024 zkLite Exchange. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
