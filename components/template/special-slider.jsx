"use client";

import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { HomeCard } from "../module/home-card";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export function SpecialSLider() {
  const Router = useRouter();
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchUserHouse() {
      setLoading(true);

      const userHouse = await axios.get(`/api/house`);
      setHouse(userHouse.data.data);

      setLoading(false);
    }
    FetchUserHouse();
  }, []);
  return (
    <section
      data-aos-once="true"
      data-aos="fade-up-left"
      className="lg:mt-16 md:flex-row flex-col md:mt-28 mt-[200px] h-auto overflow-hidden rounded-lg shadow-xl flex"
    >
      <div className="relative md:w-3/12 w-full flex flex-col justify-between pb-4 px-4 bg-gray-200 dark:bg-zinc-800 dark:text-white">
        <div>
          <h2 className="moraba-heavy text-center text-2xl py-3 text-zinc-800 dark:text-white">
            اگهی ها ویژه
          </h2>
          <h3 className="text-justify mt-4 moraba-regular md:mb-0 mb-16">
            اگهی های خرید و فروش اپارتمانها و واحد های مسکونی با بهترین قیمت
            نسبت به متراژ با بیشترین بازدید
          </h3>
        </div>
        <Button
          onPress={() => {
            Router.push("/allhomes");
          }}
          dir="ltr"
          size="lg"
          radius="sm"
          className="bg-gradient-to-l py-6 text-white w-full from-blue-500 to-emerald-600"
        >
          مشاهده همه اگهی ها
        </Button>
      </div>
      <div className="w-full md:w-9/12 h-full bg-white dark:bg-zinc-900 p-3">
        <Swiper
          className="w-full h-full"
          spaceBetween={10}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            1500: {
              slidesPerView: 4,
            },
            1100: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {house.map((e, i) => (
            <SwiperSlide key={i}>
              <HomeCard
                img={e.images[0]}
                id={e._id}
                title={e.title}
                city={e.city}
                area={e.address}
                price={e.price}
                room={e.room}
                floor={e.floor}
                meter={e.meter}
              />
            </SwiperSlide>
          ))}
          {loading &&
            Array.from({ length: 6 }).map((e, i) => (
              <SwiperSlide key={i}>
                <HomeCard loading />
              </SwiperSlide>
            ))}
        </Swiper>
        {!loading && house.length === 0 && (
          <div className="h-[350px] flex items-center justify-center flex-col gap-4">
            <h2 className="text-3xl text-center">
              هنوز هیچ خانه ای اضافه / تایید نشده
            </h2>
            <Button
              radius="sm"
              color="primary"
              size="lg"
              onClick={() => Router.push("/new-house")}
            >
              خانه خود را اضافه کنید
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
