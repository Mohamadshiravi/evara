"use client";

import Link from "next/link";
import { HomeCard } from "../module/home-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { TfiLayoutGrid4 } from "react-icons/tfi";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { Button, Select, SelectItem } from "@nextui-org/react";

export default function HomesSection() {
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("newest");
  const [gridCol, setGridCols] = useState("md:grid-cols-[4fr_4fr_4fr]");

  useEffect(() => {
    async function FetchUserHouse() {
      setLoading(true);
      const userHouse = await axios.get(`/api/house`);
      setHouse(userHouse.data.data);
      setLoading(false);
    }
    FetchUserHouse();
  }, []);

  useEffect(() => {
    if (house.length !== 0) {
      switch (filter) {
        case "newest": {
          const newData = [...house].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setHouse(newData);
          break;
        }
        case "oldest": {
          const newData = [...house].sort(
            (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
          );
          setHouse(newData);
          break;
        }
        case "expensive": {
          const newData = [...house].sort((a, b) => b.price - a.price);
          setHouse(newData);
          break;
        }
        case "cheapest": {
          const newData = [...house].sort((a, b) => a.price - b.price);
          setHouse(newData);
          break;
        }
        default:
          break;
      }
    }
  }, [filter]);

  return (
    <section data-aos="fade-up-right p-4">
      <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-md flex items-center justify-between p-2">
        <div className="md:flex items-center hidden text-zinc-800 gap-2 text-2xl">
          <Button
            className="lg:flex hidden"
            isIconOnly
            radius="full"
            size="lg"
            onPress={() => setGridCols("md:grid-cols-[3fr_3fr_3fr_3fr]")}
          >
            <TfiLayoutGrid4
              className={`${
                gridCol === "md:grid-cols-[3fr_3fr_3fr_3fr]"
                  ? "text-zinc-800"
                  : "text-zinc-500"
              } hover:text-zinc-600 transition cursor-pointer text-[28px]`}
            />
          </Button>
          <Button
            className="md:flex hidden"
            isIconOnly
            radius="full"
            size="lg"
            onPress={() => setGridCols("md:grid-cols-[4fr_4fr_4fr]")}
          >
            <TfiLayoutGrid3
              className={`${
                gridCol === "md:grid-cols-[4fr_4fr_4fr]"
                  ? "text-zinc-800"
                  : "text-zinc-500"
              } hover:text-zinc-600 transition cursor-pointer text-[26px]`}
            />
          </Button>

          <Button
            className="md:flex hidden"
            isIconOnly
            radius="full"
            size="lg"
            onPress={() => setGridCols("md:grid-cols-[6fr_6fr]")}
          >
            <TfiLayoutGrid2
              className={`${
                gridCol === "md:grid-cols-[6fr_6fr]"
                  ? "text-zinc-800"
                  : "text-zinc-500"
              } hover:text-zinc-600 transition cursor-pointer text-[28px]`}
            />
          </Button>
        </div>
        <div>
          <Select
            defaultSelectedKeys={"newest"}
            size="sm"
            color="primary"
            variant="underlined"
            placeholder="جدیدترین"
            className="w-[250px]"
            dir="rtl"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <SelectItem key={"newest"}>جدیدترین</SelectItem>
            <SelectItem key={"oldest"}>قدیمی ترین</SelectItem>
            <SelectItem key={"expensive"}>گران ترین</SelectItem>
            <SelectItem key={"cheapest"}>ارزان ترین</SelectItem>
          </Select>
        </div>
      </div>
      <div className={`mt-4 grid ${gridCol} grid-cols-[1fr] gap-4`}>
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
          Array.from({ length: 6 }).map((e, i) => <HomeCard key={i} loading />)}
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
    </section>
  );
}
