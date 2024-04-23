import React from "react";
import { useState, useEffect } from "react";
import { COMMON_TNS } from "@/lib/i18n/consts";

import { useTranslation } from "react-i18next";
// import { useTheme } from "next-themes";
// import { useRouter } from "next/router";
import Button from "@/components/atomic/Button/Button";
import { PriceCardTradingView } from "@/components/atomic/PriceCard/PriceCard";
import classNames from "classnames";

import styles from "./hello.module.css";
import { useMediaQuery } from "react-responsive";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config'

type props = {
  onClickRollupBtn?: () => void;
};
const fullConfig = resolveConfig(tailwindConfig as any)
const Hello = ({ onClickRollupBtn }: props) => {
  const { t, i18n } = useTranslation([COMMON_TNS]);
  const isXl = useMediaQuery({
    query: `(min-width: ${fullConfig.theme.screens.xl})`,
  })
  return (
    <section
      className={classNames(
        styles.hello,
        "relative"
      )}
    >
      <p
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-once="false"
        className="text-4xl font-extrabold tracking-tight text-center whitespace-pre-wrap pt-32 text-slate-900 dark:text-white xl:pt-64 md:text-6xl font-work max-w-lg mx-auto"
      >
        {t("Join the Future of Trading")}
      </p>

      <p
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="300"
        className=" mt-2 font-medium leading-normal text-center whitespace-pre-wrap md:text-lg md:mt-6 text-slate-800 dark:text-slate-200 font-work max-w-lg mx-auto"
      >
        {t(
          "Zigzag is a native, easy-to-use, reliable, fully secure and low fee Decentralized Exchange built on ZK Rollups."
        )}
      </p>

      <div
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="600"
        className="flex flex-col items-center justify-center gap-4 mx-16 mt-8 text-center md:mx-0 md:flex-row"
      >
        <a
          href="https://trade.zklite.io/"
          rel="noopener noreferrer"
          target="_blank"
          className="!hover:no-underline"
        >
          <Button
            className="px-2 py-2.5 text-base font-extrabold font-work md:w-100 hover:no-underline"
            type="gradient"
          >
            {t("Trade on zkSync Lite")}
          </Button>
        </a>
      </div>

      {
        isXl
          ? <>
          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute top-32 2xl:left-38 xl:left-16 "
          >
            <PriceCardTradingView symbol="BTCUSD" />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute top-32 right-1 xl:right-1"
          >
            <PriceCardTradingView symbol="AAVEUSD" />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute top-80 2xl:left-44 xl:left-44"
          >
            <PriceCardTradingView symbol="DAIUSD" />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute  left-10 xl:left-10"
          >
            <PriceCardTradingView symbol="LINKUSD" />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute 2xl:right-1 xl:right-1"
          >
            <PriceCardTradingView symbol="BNBUSD" />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="absolute top-96 2xl:right-44 xl:right-16"
          >
            <PriceCardTradingView symbol="ETHUSD" />
          </div>
          </>
          : <div
            data-aos="zoom-in"
            data-aos-duration="600"
            className="flex flex-col items-center justify-around gap-8 mt-16 md:gap-0 md:flex-row"
          >
            <PriceCardTradingView symbol="BTCUSD" />
            <PriceCardTradingView symbol="ETHUSD" />
            <PriceCardTradingView symbol="BNBUSD" />
          </div>
      }
    </section>
  );
};

import dynamic from "next/dynamic";
export default dynamic(() => Promise.resolve(Hello), {
  ssr: false,
});
