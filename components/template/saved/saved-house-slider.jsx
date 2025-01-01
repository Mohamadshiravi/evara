"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { FreeMode } from "swiper/modules";
import { HomeCard } from "@/components/module/home-card";

export default function SavedHousesSlider({ houses }) {
  return (
    <section className="sm:mt-20 mt-10 w-full">
      <Swiper
        className="w-full h-full"
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          1500: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 3,
          },
          850: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {houses.map((e, i) => (
          <SwiperSlide key={i}>
            <HomeCard
              img={e.house.images[0]}
              id={e.house._id}
              title={e.house.title}
              city={e.house.city}
              area={e.house.address}
              price={e.house.price}
              room={e.house.room}
              floor={e.house.floor}
              meter={e.house.meter}
              isSaved={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
