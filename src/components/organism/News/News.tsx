import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { COMMON_TNS } from "@/lib/i18n/consts";
import { useTranslation } from "react-i18next";
import BlogItem from "@/components/atomic/BlogItem";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import { useTheme } from "next-themes";

const mediumURL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ZigZagExchange";

const News = () => {
  const { t, i18n } = useTranslation([COMMON_TNS]);

  const [data, setData] = useState<any>();
  const [tweetsId, setTweetsId] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    axios
      .get("/api/tweets")
      .then((data: any) => {
        console.log(data.data.meta);
        setTweetsId(data.data.meta.newest_id);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const config = {};
    axios
      .get(mediumURL)
      .then((data: any) => {
        const avatar = data.data.feed.image;
        const profileLink = data.data.feed.link;
        const res = data.data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = res.filter((item: any) => item.categories.length > 0);

        const title = data.data.feed.title;
        let d: any = {};
        d.profile = {};
        d.profile.ptitle = title;
        d.profile.avtar = avatar;
        d.profile.profileurl = profileLink;
        d.item = posts;
        d.isLoading = false;
        d.error = null;
        setData(d);
      })
      .catch((e) => {
        setData({ error: e.toJSON() });
        console.log(e);
      });
  }, []);

  return (
    <section className={"mt-48 md:px-8"}>
      <p className="text-4xl font-extrabold text-center dark:text-slate-50 text-slate-900 md:text-5xl">
        {t("newsandupdates")}
      </p>
      <div className="grid gap-6 mt-16 lg:grid-cols-3 md:grid-cols-1 xl:gap-10">
        <TwitterTweetEmbed
          tweetId={"1584945659664551936"}
          options={{
            // cards: "hidden",
            height: 400,
            width: "100%",
            maxWidth: "100%",
          }}
        />
        <TwitterTweetEmbed tweetId={"1573020039762034689"} />
        <TwitterTweetEmbed tweetId={"1578418911363465225"} />
        {data &&
          data?.item.slice(0, 3).map((item: any, index: any) => {
            return <BlogItem data={item} {...data.profile} key={index} />;
          })}
      </div>
    </section>
  );
};

export default News;
