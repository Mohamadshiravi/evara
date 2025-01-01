"use client";

import { IoIosArrowUp } from "react-icons/io";

export default function GoToTopBtn() {
  return (
    <button
      onClick={GoTop}
      className="absolute text-zinc-500 dark:text-zinc-300 dark:bg-zinc-600 shadow-lg sm:left-6 sm:top-6 top-0 left-2 animate-bounce bg-white w-[50px] aspect-square text-2xl flex items-center justify-center rounded-full"
    >
      <IoIosArrowUp />
    </button>
  );
  function GoTop() {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.scrollTop = 0;
  }
}
