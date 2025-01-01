"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { Button, Image } from "@nextui-org/react";
import { MdFullscreen } from "react-icons/md";

export default function HomeSlider({ images }) {
  return (
    <Swiper
      className=" w-full h-full"
      loop={true}
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 8000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      grabCursor
      style={{ "--swiper-pagination-color": "#059669" }}
    >
      {images.length === 0 ? (
        <SwiperSlide>
          <Image
            isZoomed
            width={"100%"}
            height={"100%"}
            src="/images/default-img.avif"
            alt="default house images"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ) : (
        images.map((e, i) => (
          <SwiperSlide key={i}>
            <div className="relative group w-full h-full">
              <Button
                onPress={(e) => {
                  e.target.parentElement.children[1].requestFullscreen() ||
                    webkitRequestFullscreen();
                }}
                variant="bordered"
                isIconOnly
                radius="sm"
                className="absolute top-4 right-4 z-20 backdrop-blur-lg border-zinc-800/20 opacity-0 group-hover:opacity-100"
              >
                <MdFullscreen className="text-4xl text-zinc-800" />
              </Button>
              <Image
                removeWrapper
                width={"100%"}
                height={"100%"}
                key={i}
                src={e}
                alt="house images"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}
