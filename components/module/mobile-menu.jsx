import { Button } from "@nextui-org/react";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { SiNextdotjs } from "react-icons/si";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function MobileMenu({ isMenu, closeMenu }) {
  const path = usePathname();
  return (
    <>
      <section
        onClick={closeMenu}
        className={`${
          isMenu ? "block" : "hidden"
        } bg-black/20 backdrop-blur-sm fixed top-0 left-0 w-full h-screen z-[70]`}
      ></section>
      <nav
        className={`${
          isMenu ? "translate-x-0" : "-translate-x-[310px]"
        } flex flex-col items-center bg-gray-100 dark:bg-zinc-800 transition gap-3 sahdow-lg p-4 w-[300px] z-[71] h-screen fixed top-0 left-0`}
      >
        <div className="py-2 text-4xl flex items-center justify-center font-black text-emerald-600 w-full relative">
          <span>EVARA</span>
          <button
            onClick={closeMenu}
            className={`${
              isMenu ? "translate-x-8" : "translate-x-0"
            } absolute top-0 right-0 bg-gray-100 dark:bg-zinc-800 rounded-full p-1`}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
        <ul className="w-full flex flex-col gap-4" dir="ltr">
          <Link
            onClick={closeMenu}
            href={"/"}
            className={`${
              path === "/" && "ring-2 border border-emerald-500"
            } hover:ring-2 cursor-pointer dark:bg-zinc-700 transition dark:ring-zinc-400 ring-zinc-300 flex items-center gap-4 w-full bg-white rounded-md px-3 py-2`}
          >
            <FaHome className="text-2xl text-emerald-600" />
            <span className="moraba-bold text-zinc-700 dark:text-white">
              خانه
            </span>
          </Link>
          <Link
            onClick={closeMenu}
            href={"/allhomes"}
            className={`${
              path === "/allhomes" && "ring-2 border border-emerald-500"
            } hover:ring-2 cursor-pointer dark:bg-zinc-700 transition dark:ring-zinc-400 ring-zinc-300 flex items-center gap-4 w-full bg-white rounded-md px-3 py-2`}
          >
            <PiBuildingApartmentFill className="text-2xl text-emerald-600" />
            <span className="moraba-bold text-zinc-700 dark:text-white">
              املاک
            </span>
          </Link>
          <Link
            onClick={closeMenu}
            href={"/about-us"}
            className={`${
              path === "/about-us" && "ring-2 border border-emerald-500"
            } hover:ring-2 cursor-pointer dark:bg-zinc-700 transition dark:ring-zinc-400 ring-zinc-300 flex items-center gap-4 w-full bg-white rounded-md px-3 py-2`}
          >
            <FaHeadphonesSimple className="text-2xl text-emerald-600" />
            <span className="moraba-bold text-zinc-700 dark:text-white">
              درباره ما
            </span>
          </Link>
          <Link
            onClick={closeMenu}
            href={"/about-site"}
            className={`${
              path === "/about-site" && "ring-2 border border-emerald-500"
            } hover:ring-2 cursor-pointer dark:bg-zinc-700 transition dark:ring-zinc-400 ring-zinc-300 flex items-center gap-4 w-full bg-white rounded-md px-3 py-2`}
          >
            <SiNextdotjs className="text-2xl text-emerald-600" />
            <span className="moraba-bold text-zinc-700 dark:text-white">
              درباره سایت
            </span>
          </Link>
        </ul>
      </nav>
    </>
  );
}
