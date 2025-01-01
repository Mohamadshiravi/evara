import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import Image from "next/image";

import { FaRegBookmark } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import LogOutUser from "@/utils/auth/log-out";
import { newToast } from "@/utils/helper-function";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserDetailsDropdown({ user }) {
  const [imgSrc, setImgSrc] = useState("");

  const path = usePathname();

  const [imagesSrc, setImagesSrc] = useState([
    "/uploads/avatar/66beeaec47a55.jpg",
    "/uploads/avatar/66c440fd12ba6.png",
    "/uploads/avatar/6628792bd5ab7.jpg",
    "/uploads/avatar/66c4444071532.png",
    "/uploads/avatar/66f230da90a04.png",
    "/uploads/avatar/657aa3ce3b26c.jpg",
  ]);

  useEffect(() => {
    setImgSrc(user.avatar || "/images/guest.jpg");
  }, []);

  async function ChangeUserAvatar(src) {
    if (imgSrc === src) {
      return false;
    } else {
      await axios.post("/api/avatar", {
        src: src,
        userID: user._id,
      });
      setImgSrc(src);
      newToast("عکس پروفایل شما تغییر کرد");
    }
  }
  return (
    <Dropdown backdrop="blur" radius="sm" showArrow>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer border-2 border-zinc-400"
          src={imgSrc}
        />
      </DropdownTrigger>
      <DropdownMenu variant="bordered">
        <DropdownItem isReadOnly>
          <div className="flex items-center gap-3 justify-end border-b border-zinc-300 dark:border-zinc-700 pb-3">
            <div className="flex flex-col items-end">
              <span className="dark:text-zinc-200 font-bold text-zinc-800 font-sans text-lg">
                {user.name}
              </span>
              <span
                dir="ltr"
                className="sm:w-[280px] w-[220px] truncate text-left text-base font-mono text-zinc-400 dark:text-zinc-500"
              >
                {user.email}
              </span>
            </div>
            <img
              src={imgSrc}
              className="w-[50px] h-[50px] object-cover border border-zinc-300 dark:border-zinc-700 rounded-full"
            />
          </div>
        </DropdownItem>
        <DropdownItem isReadOnly>
          <h3 className="text-center mb-3">
            میتوانید عکس پروفایل خود را تغییر دهید
          </h3>
          <div className="grid grid-cols-[4fr_4fr_4fr] gap-2 mt-2">
            {imagesSrc.map((e, i) => (
              <div
                key={i}
                onClick={() => ChangeUserAvatar(e)}
                className={` ${
                  e === imgSrc &&
                  "border-2 overflow-hidden rounded-full border-emerald-600 p-1"
                }`}
              >
                <Image
                  src={e}
                  width={800}
                  height={800}
                  alt={e + i}
                  className="sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] rounded-full object-cover hover:scale-[110%] transition"
                />
              </div>
            ))}
          </div>
        </DropdownItem>

        <DropdownItem
          className={`text-2xl mt-6 ${
            path === "/user/houses" &&
            "border border-zinc-300 dark:border-zinc-700"
          } `}
          startContent={<LuBuilding2 className="text-emerald-500" />}
        >
          <Link
            href={"/user/houses"}
            className="text-lg block w-full text-center font-bold "
          >
            املاک من
          </Link>
        </DropdownItem>
        <DropdownItem
          className={`text-2xl ${
            path === "/user/saved" &&
            "border border-zinc-300 dark:border-zinc-700"
          } `}
          startContent={<FaRegBookmark className="text-emerald-500" />}
        >
          <Link
            href={"/user/saved"}
            className="text-lg block w-full text-center font-bold"
          >
            ذخیره شده ها
          </Link>
        </DropdownItem>
        <DropdownItem isReadOnly className="mt-6">
          <Button
            dir="ltr"
            onPress={LogOutUser}
            className="bg-red-500 text-white"
            size="lg"
            radius="sm"
            fullWidth
          >
            خروج
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
