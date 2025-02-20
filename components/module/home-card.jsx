"use client";

import Link from "next/link";

import { PiArrowsOutLight, PiBed, PiBuildingLight } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa6";

import { Button, Skeleton, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { newErrorToast, newToast, ShowSwal } from "@/utils/helper-function";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

export function HomeCard(props) {
  return props.loading ? (
    <section className="flex flex-col w-full border border-zinc-200 dark:border-zinc-700 rounded-lg">
      <Skeleton className="w-full rounded-t-md">
        <div className="h-[200px] w-full"></div>
      </Skeleton>
      <div className="p-2">
        <Skeleton className="w-full rounded-md">
          <div className=" h-[30px]"></div>
        </Skeleton>
        <Skeleton className="rounded-md mt-2 w-[150px]">
          <div className="h-[30px]"></div>
        </Skeleton>
        <Skeleton className="rounded-md mt-2 w-full">
          <div className="h-[40px]"></div>
        </Skeleton>
        <div className="flex gap-2">
          <Skeleton className="rounded-md mt-2 w-full">
            <div className="h-[30px]"></div>
          </Skeleton>
          <Skeleton className="rounded-md mt-2 w-full">
            <div className="h-[30px]"></div>
          </Skeleton>
          <Skeleton className="rounded-md mt-2 w-full">
            <div className="h-[30px]"></div>
          </Skeleton>
        </div>
      </div>
    </section>
  ) : (
    <div
      className={`border-2 dark:border-zinc-700 dark:text-white transition duration-500 relative rounded-md w-full h-full overflow-hidden`}
    >
      <div className="w-full h-[200px]">
        <div className="w-full h-full relative">
          <div className="opacity-0 hover:opacity-100 transition-all duration-500 w-full h-full bg-black/30 backdrop-blur-[4px] absolute top-0 left-0">
            {!props.isSaved ? (
              <Tooltip
                radius="sm"
                showArrow
                placement="left"
                content="ذخیره کردن"
              >
                <Button
                  onPress={AddToSaveHandler}
                  radius="sm"
                  isIconOnly
                  variant="light"
                  className="absolute top-3 right-3"
                >
                  <FaRegBookmark className="text-2xl text-white" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                radius="sm"
                showArrow
                placement="left"
                content="حذف از ذخیره شده ها"
              >
                <Button
                  onPress={DeleteFromSavedHandler}
                  radius="sm"
                  isIconOnly
                  variant="light"
                  className="absolute top-3 right-3"
                >
                  <IoCloseSharp className="text-3xl text-white" />
                </Button>
              </Tooltip>
            )}
          </div>
          <Image
            width={800}
            height={800}
            radius="none"
            src={props.img || "/images/default-img.avif"}
            className="w-full h-full object-center object-cover"
            alt="house photo"
          />
        </div>
      </div>
      <Link href={`/allhomes/${props.id}`} className="block">
        <h1 className="w-full moraba-bold text-2xl truncate p-2">
          {props.title}
        </h1>
        <div className="flex gap-2 px-2 text-xs text-zinc-600 dark:text-zinc-200 items-center">
          <span className="text-sm text-emerald-600 font-bold">
            {props.city}
          </span>
          <span>{props.area}</span>
        </div>
        <h1 className="w-full p-2 text-2xl text-emerald-600 flex gap-2 justify-center">
          <span className="truncate moraba-bold">
            {props.price.toLocaleString()}
          </span>
          <span className="moraba-bold">تومان</span>
        </h1>
        <div className="w-full h-full border-t-2 dark:border-zinc-800 flex justify-center p-4 gap-4 text-zinc-500 dark:text-zinc-500">
          <div className="flex text-sm font-bold gap-2">
            <span className="text-xl">
              <PiBed />
            </span>
            <span className="flex gap-2">
              <span>{props.room}</span> خواب
            </span>
          </div>
          <div className="flex text-sm font-bold gap-2">
            <span className="text-xl">
              <PiBuildingLight />
            </span>
            <span className="flex gap-2">
              <span>{props.floor}</span> طبقه
            </span>
          </div>
          <div className="flex text-sm font-bold gap-2">
            <span className="text-xl">
              <PiArrowsOutLight />
            </span>
            <span className="flex gap-2">
              <span>{props.meter}</span> متر
            </span>
          </div>
        </div>
      </Link>
      {props.isDeletable && (
        <Tooltip
          radius="sm"
          showArrow
          placement="right"
          content="حذف کردن اگهی"
        >
          <Button
            size="lg"
            color="danger"
            onPress={DeleteHouseHandler}
            radius="sm"
            isIconOnly
            className="absolute top-3 left-3 bg-red-500"
          >
            <IoCloseSharp className="text-4xl text-white" />
          </Button>
        </Tooltip>
      )}
      {props.isAcceptable && props.queued && (
        <Tooltip
          radius="sm"
          showArrow
          placement="right"
          content="تایید کردن اگهی"
        >
          <Button
            size="lg"
            color="danger"
            onPress={AcceptHouseHandler}
            radius="sm"
            isIconOnly
            className="absolute top-16 left-3 bg-green-500"
          >
            <FaCheck className="text-2xl text-white" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
  async function AddToSaveHandler() {
    try {
      const res = await axios.post("/api/saved", { houseID: props.id });
      if (res.status === 201) {
        newToast("خانه ذخیره شد");
      } else {
        newToast("خانه در ذخیره شده های شما موجود است");
      }
    } catch (error) {
      newErrorToast("لطفا ابتدا وارد اکانت خود شوید");
    }
  }
  async function DeleteFromSavedHandler() {
    try {
      const res = await axios.delete(`/api/saved/${props.id}`);

      if (res.status === 200) {
        newToast("خانه از ذخیره های شما حذف شد");
        if (props.reRenderHouse) {
          props.reRenderHouse();
        }
      }
    } catch (error) {
      newErrorToast("خانه از ذخیره های شما حذف نشد");
    }
  }
  async function DeleteHouseHandler() {
    const isOk = await ShowSwal("warning", "ایا از حذف اگهی مطمعن هستید", [
      "خیر",
      "بله",
    ]);

    if (isOk) {
      const res = await axios.delete(`/api/house/${props.id}`);
      if (res.status === 200) {
        newToast("اگهی شما حذف شد");
        if (props.reRenderHouse) {
          props.reRenderHouse();
        }
      }
    }
  }
  async function AcceptHouseHandler() {
    const isOk = await ShowSwal("warning", "ایا از تایید اگهی مطمعن هستید", [
      "خیر",
      "بله",
    ]);

    if (isOk) {
      const res = await axios.put(`/api/house/${props.id}`);
      if (res.status === 200) {
        newToast("اگهی شما تایید شد");
        setInterval(() => {
          location.reload();
        }, 1500);
      }
    }
  }
}
