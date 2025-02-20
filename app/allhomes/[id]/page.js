import { CiLocationOn } from "react-icons/ci";

import {
  PiArrowsOutLight,
  PiBed,
  PiBuildingLight,
  PiToiletLight,
  PiBathtubLight,
} from "react-icons/pi";
import { LuDollarSign } from "react-icons/lu";

import { IoArrowBack } from "react-icons/io5";

import Link from "next/link";
import houseModel from "@/models/house";
import ConnectTODB from "@/config/connect-to-DB";
import BreadCrumb from "@/components/module/bread-crumb";
import HomeSlider from "@/components/template/home/home-photo-slider";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import Image from "next/image";

export default async function HomeDetailsPage({ params }) {
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    notFound();
  }

  await ConnectTODB();
  const currentHome = await houseModel
    .findOne({ _id: params.id }, "-__v -updatedAt -queued")
    .populate("user", "name email avatar");

  if (!currentHome) {
    notFound();
  }
  return (
    <>
      <BreadCrumb route={currentHome.title} />
      <section className="sm:py-10 py-4 sm:px-10 px-4 bg-white dark:bg-zinc-900 dark:text-zinc-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="moraba-bold text-3xl">{currentHome.title}</h1>
            <div className="flex items-center">
              <h2 className="h-full moraba-regular text-zinc-500 mt-2 flex items-center gap-1">
                <CiLocationOn className="text-xl" />
                <span className="text-emerald-600 mx-1">
                  {currentHome.city}
                </span>
                <span>{currentHome.address}</span>
              </h2>
            </div>
          </div>
          <Link
            href={"/"}
            className="bg-emerald-600 rounded-full p-3 hover:bg-emerald-700 transition text-xl mx-2"
          >
            <IoArrowBack />
          </Link>
        </div>
        <div className="grid lg:grid-cols-[8fr_4fr] gap-4 mt-4">
          <section className="w-full aspect-video overflow-hidden rounded-lg shadow-md">
            <HomeSlider
              images={JSON.parse(JSON.stringify(currentHome.images))}
            />
          </section>
          <div className="w-full flex flex-col items-center gap-3 justify-between">
            <div className="flex lg:flex-col items-center lg:justify-center gap-3 w-full h-full">
              <Image
                src={currentHome.user.avatar}
                alt="user avatar"
                width={1000}
                height={1000}
                className="rounded-full lg:w-[200px] lg:h-[200px] sm:w-[100px] sm:h-[100px] w-[60px] object-cover h-[60px] shadow-xl"
              />
              <div className="flex flex-col lg:items-center justify-center">
                <span className="sm:text-3xl text-lg">
                  {currentHome.user.name}
                </span>
                <span className="sm:text-base text-xs text-zinc-500">
                  {currentHome.user.email}
                </span>
              </div>
            </div>

            <button className="w-full hover:bg-emerald-700 shadow-xl shadow-emerald-600/10 hover:shadow-lg transition duration-500 text-white bg-emerald-600 rounded-lg py-3">
              تماس با فروشنده
            </button>
          </div>
          <div className="lg:hidden flex items-center dark:border-zinc-700 p-6 justify-between border rounded-lg">
            <span className="text-zinc-500 moraba-bold gap-1 text-xl flex items-center">
              <LuDollarSign className="text-2xl" />
              <span>قیمت</span>
            </span>
            <span className="text-emerald-600 moraba-bold flex gap-2 text-2xl">
              {currentHome.price.toLocaleString()}
              <span> تومان</span>
            </span>
          </div>
          <div className="w-full dark:border-zinc-700 border rounded-lg">
            <div>
              <div className="flex sm:flex-row gap-2 flex-col items-center p-6 justify-between">
                <span className="moraba-bold text-xl">ویژگی های اصلی</span>
                <span className="bg-gray-100 dark:bg-zinc-800 px-3 flex gap-2 py-1 text-xs rounded-sm">
                  <span>تاریخ ثبت اگهی</span>
                  {new Date(currentHome.createdAt).toLocaleDateString("fa-ir")}
                </span>
              </div>
              <div className="w-full h-full border-b dark:border-zinc-700 flex justify-center flex-wrap py-6 px-6 gap-4 gap-y-8 text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center text-sm font-bold gap-2 px-6">
                  <span className="text-2xl">
                    <PiToiletLight />
                  </span>
                  <span className="flex gap-2">
                    <span className="text-zinc-700 dark:text-white">
                      {currentHome.toilet}
                    </span>
                    عدد
                  </span>
                </div>
                <div className="flex items-center text-sm font-bold gap-2 px-6">
                  <span className="text-2xl">
                    <PiBathtubLight />
                  </span>
                  <span className="flex gap-2">
                    <span className="text-zinc-700 dark:text-white">
                      {currentHome.bathroom}
                    </span>
                    عدد
                  </span>
                </div>
                <div className="flex items-center text-sm font-bold gap-2 px-6">
                  <span className="text-2xl">
                    <PiArrowsOutLight />
                  </span>
                  <span className="flex gap-2">
                    <span className="text-zinc-700 dark:text-white">
                      {currentHome.meter}
                    </span>
                    متر
                  </span>
                </div>
                <div className="flex items-center text-sm font-bold gap-2 px-6">
                  <span className="text-2xl">
                    <PiBuildingLight />
                  </span>
                  <span className="flex gap-2">
                    <span className="text-zinc-700 dark:text-white">
                      {currentHome.floor}
                    </span>
                    طبقه
                  </span>
                </div>
                <div className="flex items-center text-sm font-bold gap-2 px-6">
                  <span className="text-2xl">
                    <PiBed />
                  </span>
                  <span className="flex gap-2">
                    <span className="text-zinc-700 dark:text-white">
                      {currentHome.room}
                    </span>
                    خواب
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6">
              <h2 className="py-4 moraba-bold text-xl">درباره ملک</h2>
              <p className="text-justify pb-8">{currentHome.description}</p>
            </div>
          </div>
          <div className=" w-full rounded-lg flex flex-col justify-between">
            <div className="lg:flex hidden items-center dark:border-zinc-700 p-6 justify-between border rounded-lg">
              <span className="text-zinc-500 moraba-bold gap-1 text-xl flex items-center">
                <LuDollarSign className="text-2xl" />
                <span>قیمت</span>
              </span>
              <span className="text-emerald-600 moraba-bold flex gap-2 text-2xl">
                {currentHome.price.toLocaleString()}
                <span> تومان</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
