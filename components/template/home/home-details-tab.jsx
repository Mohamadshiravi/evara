"use client";

import { IoImagesOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { MdOutline3dRotation } from "react-icons/md";
import { TbView360Number } from "react-icons/tb";

import HomePhotoSlider from "@/components/template/home/home-photo-slider";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

export default function HomePageTabs({ images }) {
  const [tab, setTab] = useState("images");

  const MapSection = useMemo(
    () =>
      dynamic(() => import("./map-section"), {
        loading: () => (
          <div className="w-full h-full rounded-lg bg-gray-300 dark:bg-zinc-700 animate-pulse"></div>
        ),
        ssr: false,
      }),
    []
  );
  return (
    <>
      <section className="w-full aspect-video overflow-hidden rounded-lg shadow-md">
        {tab === "images" && <HomePhotoSlider images={images} />}
        {tab === "map" && <MapSection />}
        {tab === "2" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-zinc-700 text-2xl px-10 text-center">
              این قابلیت پیاده سازی نشده است.
            </p>
          </div>
        )}
        {tab === "3" && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-zinc-700 text-2xl px-10 text-center">
              این قابلیت پیاده سازی نشده است.
            </p>
          </div>
        )}
      </section>

      <div className="w-full gap-4 rounded-lg grid grid-cols-[6fr_6fr]">
        <label
          className={`${
            tab === "images"
              ? "bg-gradient-to-b text-white from-emerald-400 to-blue-400 shadow-sm"
              : "bg-white dark:bg-zinc-800 shadow-lg text-zinc-400"
          } flex lg:py-0 py-8  hover:shadow-sm transition duration-700 cursor-pointer  flex-col rounded-lg gap-2  items-center justify-center`}
        >
          <span className="sm:text-8xl text-6xl">
            <IoImagesOutline />
          </span>
          <span className="moraba-bold">تصاویر ملک</span>
          <input
            className="w-0 h-0"
            type="radio"
            checked={tab === "images" && true}
            onChange={() => {
              setTab("images");
            }}
          />
        </label>
        <label
          className={`${
            tab === "map"
              ? "bg-gradient-to-b text-white from-emerald-400 to-blue-400 shadow-sm"
              : "bg-white dark:bg-zinc-800 shadow-lg text-zinc-400"
          } flex lg:py-0 py-8  hover:shadow-sm transition duration-700 cursor-pointer  flex-col rounded-lg gap-2  items-center justify-center`}
        >
          <span className="sm:text-8xl text-6xl">
            <GrMapLocation />
          </span>
          <span className="moraba-bold">نمایش روی نقشه</span>
          <input
            className="w-0 h-0"
            type="radio"
            checked={tab === "map" && true}
            onChange={() => {
              setTab("map");
            }}
          />
        </label>
        <label
          className={`${
            tab === "2"
              ? "bg-gradient-to-b text-white from-emerald-400 to-blue-400 shadow-sm"
              : "bg-white dark:bg-zinc-800 shadow-lg text-zinc-400"
          } flex lg:py-0 py-8  hover:shadow-sm transition duration-700 cursor-pointer  flex-col rounded-lg gap-2  items-center justify-center`}
        >
          <span className="sm:text-8xl text-6xl">
            <MdOutline3dRotation />
          </span>
          <span className="moraba-bold">نمایش سه بعدی</span>
          <input
            className="w-0 h-0"
            type="radio"
            checked={tab === "2" && true}
            onChange={() => {
              setTab("2");
            }}
          />
        </label>
        <label
          className={`${
            tab === "3"
              ? "bg-gradient-to-b text-white from-emerald-400 to-blue-400 shadow-sm"
              : "bg-white dark:bg-zinc-800 shadow-lg text-zinc-400"
          } flex lg:py-0 py-8  hover:shadow-sm transition duration-700 cursor-pointer  flex-col rounded-lg gap-2  items-center justify-center`}
        >
          <span className="sm:text-8xl text-6xl">
            <TbView360Number />
          </span>
          <span className="moraba-bold">تور مجازی</span>
          <input
            className="w-0 h-0"
            type="radio"
            checked={tab === "3" && true}
            onChange={() => {
              setTab("3");
            }}
          />
        </label>
      </div>
    </>
  );
}
