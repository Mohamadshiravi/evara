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
import HomePageTabs from "@/components/template/home/home-details-tab";
import evaraHouseModel from "@/models/evara-house";
import ConnectTODB from "@/config/connect-to-DB";
import BreadCrumb from "@/components/module/bread-crumb";

export default async function HomeDetailsPage({ params }) {
  await ConnectTODB();

  const currentHome = await evaraHouseModel.findOne({ _id: params.id });
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
          <HomePageTabs
            images={JSON.parse(JSON.stringify(currentHome.images))}
          />
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
          <div className="border dark:border-zinc-700 w-full rounded-lg">
            <div className="flex items-center dark:border-zinc-700 p-6 justify-between border-b">
              <span className="text-zinc-500 moraba-bold gap-1 flex items-center">
                <LuDollarSign className="text-xl" />
                <span>قیمت</span>
              </span>
              <span className="text-emerald-600 moraba-bold flex gap-2">
                {currentHome.price.toLocaleString()}
                <span> تومان</span>
              </span>
            </div>
            <div className="p-6">
              <p className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
            <div className="p-6">
              <button className="w-full hover:bg-emerald-700 hover:shadow-lg transition duration-500 text-white bg-emerald-600 rounded-lg py-3">
                تماس با فروشنده
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
