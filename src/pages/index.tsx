import { useRef } from "react";

import Benefits from "@/components/organism/Benefits/Benefits";
import FAQ from "@/components/organism/FAQ/FAQ";
import AOS from "aos";
import GetStarted from "@/components/organism/GetStarted/GetStarted";
// import RoadMap from "@/components/organism/RoadMap/RoadMap";
import News from "@/components/organism/News/News";
import { Header } from "@/components/organism/Header/Header";
import Footer from "@/components/organism/Footer/Footer";
import Hello from "@/components/organism/Hello/Hello";
import { COMMON_TNS } from "@/lib/i18n/consts";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [COMMON_TNS])),
      // Will be passed to the page component as props
    },
  };
};

const Homepage: NextPage = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [rollup, setRollUp] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 2000,
      once: true,
      easing: "ease-out-cubic",
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const onRollupOpen = () => {
    setRollUp(!rollup);
  };

  const onClickRollupBtn = () => {
    setRollUp(true);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    (async function registerDevice(tryCount: number) {
      let keyNewRefCode = 'newRefCode';
      let keyDeviceAlias = 'deviceAlias';
      let keyRefCode = 'refCode';

      const searchParams = new URLSearchParams(window.location.search)
      let newRefCode = searchParams.get("referrer")

      if (newRefCode) localStorage.setItem(keyNewRefCode, newRefCode)
      else newRefCode = localStorage.getItem(keyNewRefCode)

      let deviceAlias = localStorage.getItem(keyDeviceAlias)
      let refCode = localStorage.getItem(keyRefCode)
      if (refCode && newRefCode === refCode) {
        localStorage.removeItem(keyNewRefCode)
        newRefCode = null;
      }

      if (newRefCode || !deviceAlias) {
        return await fetch(`https://api.zklite.io/api/v1/referral/reg_device`, {
          method: 'POST', credentials: 'include',
          body: JSON.stringify({refCode: newRefCode}),
          headers: { 'Content-Type': 'application/json' }
        }).then(async (res) => {
          if (res.ok) {
            localStorage.removeItem(keyNewRefCode)
            const {deviceAlias, refCode} = await res.json()
            localStorage.setItem(keyDeviceAlias, deviceAlias)
            refCode
              ? localStorage.setItem(keyRefCode, refCode)
              : localStorage.removeItem(keyRefCode)
            return {deviceAlias, refCode}
          } else throw Error(`Fetch failure ${res.status} ${res.statusText}`)
        }).catch(err => {
          console.error(err)
          if (newRefCode && tryCount < 3) {
            setTimeout(() => registerDevice(tryCount + 1), 3000 * tryCount)
          }
        })
      }
    })(1)
  }, []);

  return (
    <div
      className={
        "dark:bg-[#061c21] bg-slate-50 bg-80% bg-no-repeat bg-top" +
        " " +
        styles.root
      }
    >
      <Head>
        <title>zkLite Exchange</title>
        <meta name="description" content="An order-book DEX on zkSync Lite" />
        <meta property="og:title" content="zkLite Exchange" />
        <meta property="og:description" content="An order-book DEX on zkSync Lite" />
        <meta property="og:image" content="/assets/wide_banner.png" />
        
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />

        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <meta
          name="twitter:widgets:theme"
          content="dark" />
      </Head>
      <Header />
      <main className="container mx-auto px-2">
        <Hello onClickRollupBtn={onClickRollupBtn} />
        <Benefits />
        <GetStarted />
        <FAQ
          ref={ref}
          setRollupOpen={() => onRollupOpen()}
          rollupOpen={rollup}
        />
        <News />
        {/* <RoadMap /> */}
        <Footer />
      </main>
    </div>
  );
};

export default Homepage;
