"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import { FaLock } from "react-icons/fa6";
import { MdOutlineSpeed } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaCubes } from "react-icons/fa";
import { MdCall } from "react-icons/md";

export default function EvaraSlider() {
  const [evaradet, setEvaradet] = useState([
    {
      icon: <FaLock />,
      des: "اطلاعاتتون پیش ما جاش امنه !!!",
      title: "امنیت بالا",
    },
    { icon: <MdOutlineSpeed />, des: "سایت بهینه و پرسرعت", title: "سرعت" },
    {
      icon: <TbWorld />,
      des: "از همه جای دنیا میتونی توی اوارا معامله کنی",
      title: "درگاه جهانی",
    },
    {
      icon: <FaCubes />,
      des: "اینجا از توی گوشیت میتونی خونه رو کامل ببینی",
      title: "نمایش سه بعدی",
    },
    {
      icon: <MdCall />,
      des: "تیم پشتیبانی ما همیشه با حوصله جواب شما رو میده",
      title: "پشتیبانی قوی",
    },
  ]);
  return (
    <div className="bg-white relative dark:bg-zinc-700 w-full shadow-xl flex rounded-3xl overflow-hidden">
      <Swiper
        cssMode={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
      >
        {evaradet.map((e, i) => (
          <SwiperSlide key={i}>
            <div className="w-full p-2 h-full flex gap-3 flex-col justify-center items-center">
              <h2 className="md:text-5xl text-2xl moraba-bold text-emerald-600">
                {e.title}
              </h2>
              <h3 className="md:text-3xl text-مل moraba-regular dark:text-white text-center">
                {e.des}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="rounded-3xl md:w-[200px] w-[100px] bg-gradient-to-t md:p-8 p-6 from-blue-500 md:text-8xl text-5xl to-emerald-600 flex items-center aspect-square justify-center">
        <Swiper
          cssMode={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]}
        >
          {evaradet.map((e, i) => (
            <SwiperSlide key={i}>
              <span className="flex text-zinc-700 items-center justify-center w-full h-full">
                {e.icon}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full h-full top-0 left-0 absolute opacity-0 z-20"></div>
    </div>
  );
}
