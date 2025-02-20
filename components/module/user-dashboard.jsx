import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";

import Image from "next/image";

import { FaRegBookmark } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import LogOutUser from "@/utils/auth/log-out";
import { newErrorToast, newToast } from "@/utils/helper-function";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdPhotoCamera } from "react-icons/md";
import { toast } from "react-toastify";

export default function UserDetailsDropdown({ user }) {
  const [imgSrc, setImgSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setImgSrc(user.avatar);
  }, []);

  return (
    <Dropdown
      backdrop="blur"
      radius="sm"
      showArrow
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer border-2 border-zinc-400"
          src={imgSrc || "/images/guest.jpg"}
        />
      </DropdownTrigger>
      <DropdownMenu disabledKeys={["profile"]} variant="bordered">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly key={"profile"} className="opacity-100">
            <div className="flex items-center gap-3 justify-end">
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
        </DropdownSection>
        <DropdownSection>
          <DropdownItem isReadOnly>
            <label
              htmlFor="photoInp"
              className="relative block w-[150px] h-[150px] border rounded-full m-auto my-4 border-4 border-emerald-600"
            >
              <Image
                src={imgSrc}
                width={800}
                height={800}
                alt="user avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="bg-black/60 opacity-70 hover:opacity-100 transition duration-300 cursor-pointer rounded-full w-full h-full absolute top-0 left-0 flex items-center justify-center">
                <MdPhotoCamera className="text-zinc-300 text-4xl" />
              </div>
            </label>
            <input
              id="photoInp"
              onChange={AddAvatarHandler}
              accept="image/*"
              type="file"
              className="absolute w-0 h-0 top-0"
            />
          </DropdownItem>
        </DropdownSection>

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
  async function AddAvatarHandler(e) {
    if (e.target.files && e.target.files[0]) {
      const fileSizeInMB = e.target.files[0].size / (1024 * 1024); //to MB

      if (fileSizeInMB < 4) {
        const formData = new FormData();
        formData.append("img", e.target.files[0]);

        const id = toast.loading("در حال اپلود عکس ...");
        setIsModalOpen(false);
        const res = await axios.post(`/api/avatar/${user._id}`, formData);
        if (res.status === 200) {
          toast.update(id, {
            render: "عکس پروفایل شما با موفقیت تغییر کرد",
            type: "success",
            isLoading: false,
            autoClose: 4000,
            theme: "colored",
          });
          setImgSrc(res.data.url);
        } else {
          toast.update(id, {
            render: "عکس پروفایل شما تغییر نکرد",
            type: "error",
            isLoading: false,
            autoClose: 4000,
            theme: "colored",
          });
        }
      } else {
        newErrorToast("حجم عکس نباید بیشتر از دو مگابایت باشد");
      }
    }
  }
}
