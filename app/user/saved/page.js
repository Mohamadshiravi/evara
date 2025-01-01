"use client";

import SavedHousesSlider from "@/components/template/saved/saved-house-slider";
import { FaRegHeart } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

import IsUserLogedIn from "@/utils/user/is-user-logedin-client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import BreadCrumb from "@/components/module/bread-crumb";
import { HomeCard } from "@/components/module/home-card";

export default function UserSaved() {
  const router = useRouter();
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function FetchUserSaved() {
      setLoading(true);
      const theUser = await IsUserLogedIn();
      if (!theUser) {
        router.push("/auth/login");
      } else {
        const userHouse = await axios.get(`/api/saved/${theUser._id}`);
        setHouse(userHouse.data.data);
        setLoading(false);
      }
    }
    FetchUserSaved();
  }, []);

  return (
    <>
      <BreadCrumb route={"ذخیره شده ها"} />
      <main className="sm:p-10 p-4">
        <section className="bg-white dark:bg-zinc-800 rounded-md px-4 py-6">
          {!loading && house.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-screen px-6">
              <FaRegHeart className="text-9xl text-zinc-300 dark:text-zinc-600" />
              <h1 className="moraba-bold sm:text-4xl text-3xl mt-3 text-center">
                لیست ذخیره شده های شما خالی است
              </h1>
              <p className="text-center shabnam mt-6 text-zinc-600 sm:px-20 px-4">
                شما هنوز هیچ محصولی در لیست ذخیره شده های خود ندارید. در صفحه
                "خانه" خانه های جالب زیادی پیدا خواهید کرد.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="moraba-bold text-white px-8 py-2 bg-emerald-600 text-lg rounded-md mt-6"
              >
                بازگشت به خانه
              </Button>
            </div>
          )}
          {!loading && house.length !== 0 && (
            <>
              <div className="flex justify-between items-center w-full">
                <h2 className="after:content-[''] text-zinc-800 after:absolute after:top-0 after:right-0 after:w-[100px] after:h-[5px] after:bg-emerald-600 relative moraba-bold w-full m-auto sm:text-4xl text-3xl py-4 dark:text-white">
                  املاک ذخیره شده شما
                </h2>
                <Link
                  href={"/"}
                  className="bg-emerald-600 rounded-full p-4 hover:bg-emerald-700 transition text-xl ml-6"
                >
                  <IoArrowBack />
                </Link>
              </div>
              <SavedHousesSlider houses={house} />
            </>
          )}
          <div className="grid lg:grid-cols-[4fr_4fr_4fr] md:grid-cols-[6fr_6fr] gap-4">
            {loading &&
              Array.from({ length: 3 }).map((e, i) => <HomeCard loading />)}
          </div>
        </section>
      </main>
    </>
  );
}
