"use client";

import Link from "next/link";
import { HomeCard } from "../module/home-card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllHomes() {
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
    <section data-aos="fade-up-right">
      <div className="dark:bg-zinc-800 bg-white rounded-lg">
        <h1 className="after:content-[''] after:absolute after:top-0 md:after:left-[45%] after:left-0 md:after:w-[100px] after:w-full after:h-[5px] after:bg-emerald-600 relative text-center moraba-bold w-full m-auto text-4xl py-4 dark:text-white">
          همه اگهی ها
        </h1>
        <div className="mt-2 p-4 grid xl:grid-cols-[3fr_3fr_3fr_3fr] lg:grid-cols-[4fr_4fr_4fr] sm:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-4">
          {house.map((e, i) => (
            <HomeCard
              key={i}
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
          ))}
          {loading &&
            Array.from({ length: 6 }).map((e, i) => <HomeCard loading />)}
        </div>
        {!loading && house.length === 0 && (
          <div className="h-[300px] flex items-center justify-center flex-col gap-4">
            <h2 className="text-3xl text-center">
              هنوز هیچ خانه ای اضافه / تایید نشده
            </h2>
            <Link
              href={"/new-house"}
              className="bg-emerald-600 px-8 py-3 rounded-lg text-base text-white"
            >
              خانه خود را اضافه کنید
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
