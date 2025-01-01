"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { HomeCard } from "../module/home-card";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function RecentlySLider() {
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
      data-aos="fade-up-left"
      className="dark:bg-zinc-800 bg-white rounded-lg mt-10"
    >
      <h1 className="after:content-[''] after:absolute after:top-0 md:after:left-[45%] after:left-0 md:after:w-[100px] after:w-full after:h-[5px] after:bg-emerald-600 relative text-center moraba-bold w-full m-auto text-4xl py-4 dark:text-white">
        اگهی های اخیر
      </h1>
      <div className="mt-2 p-2">
        <Swiper
          spaceBetween={10}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            800: {
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
          <div className="h-[250px] flex items-center justify-center flex-col gap-4">
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
