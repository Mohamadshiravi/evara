"use client";

import { useEffect, useState } from "react";

import { TiThMenu } from "react-icons/ti";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import DarkModeBtn from "./dark-mode-btn";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "./mobile-menu";
import IsUserLogedIn from "@/utils/user/is-user-logedin-client";
import UserDetailsDropdown from "./user-dashboard";

export function Header() {
  const router = useRouter();
  const path = usePathname();
  const [isNavTop, setIsNavTop] = useState(false);

  const [userData, setUserData] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [darkText, setDarkText] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const isUser = await IsUserLogedIn();

      setUserData(isUser);
    }
    fetchUserData();

    //sticky nav config
    function HandleNavBar() {
      const currentScrolled = window.pageYOffset;
      if (currentScrolled > 100) {
        setIsNavTop(true);
      } else {
        setIsNavTop(false);
      }
    }

    window.addEventListener("scroll", HandleNavBar);
    return () => {
      window.removeEventListener("scroll", HandleNavBar);
    };
  }, []);

  useEffect(() => {
    if (
      path === "/auth/login" ||
      path === "/auth/register" ||
      path === "/new-house"
    ) {
      setDarkText(true);
    } else {
      setDarkText(false);
    }
  });
  return (
    <>
      <nav
        id={`${isNavTop ? "animate-fade" : "noID"}`}
        className={`${
          isNavTop ? "fixed px-4 md:py-1 py-3" : "absolute px-6 sm:py-3 py-4"
        } ${
          !isNavTop
            ? "bg-transparent"
            : `dark:bg-zinc-800 bg-white ${isNavTop && "shadow-lg"}`
        }  justify-between flex transition items-center top-0 left-0 z-50 w-full text-sm`}
      >
        <div className="flex items-center gap-4 text-white">
          <Button
            dir="ltr"
            onPress={() => {
              router.push("/new-house");
            }}
            variant="shadow"
            color="primary"
            radius="sm"
          >
            ثبت رایگان ملک
          </Button>
          {userData ? (
            <div className="border-x-2 border-zinc-200 dark:border-zinc-700 sm:px-3 px-2 dark:text-zinc-200">
              <UserDetailsDropdown user={userData} />
            </div>
          ) : (
            <Link
              href={"/auth/login"}
              className="hover:text-emerald-500 border-x-2 border-zinc-200 dark:border-zinc-700 sm:px-3 px-2 transition moraba-bold dark:text-zinc-200 text-lg text-zinc-700"
            >
              ورود
            </Link>
          )}
          <DarkModeBtn />
        </div>
        <div
          className={`md:flex items-center gap-8 hidden moraba-bold text-sm ${
            !isNavTop && !darkText
              ? "text-white"
              : "text-zinc-800 dark:text-zinc-200"
          } `}
        >
          <Link
            href={"/"}
            className={`${
              path === "/" && "border-b-[3px]"
            }  hover:border-b-[3px] border-emerald-600 cursor-pointer transition`}
          >
            خانه
          </Link>
          <Link
            href={"/allhomes"}
            className={`${
              path === "/allhomes" && "border-b-[3px]"
            } hover:border-b-[3px] border-emerald-600 cursor-pointer transition`}
          >
            املاک
          </Link>
          <Link
            href={"/about-us"}
            className={`${
              path === "/about-us" && "border-b-[3px]"
            } hover:border-b-[3px] border-emerald-600 cursor-pointer transition`}
          >
            درباره ما
          </Link>
          <Link
            href={"/about-site"}
            className={`${
              path === "/about-site" && "border-b-[3px]"
            } hover:border-b-[3px] border-emerald-600 cursor-pointer transition`}
          >
            درباره سایت
          </Link>
        </div>
        <div className="py-2 text-4xl font-black text-emerald-600 md:block hidden">
          EVARA
        </div>
        <button
          dir="ltr"
          onClick={() => {
            setIsMenuOpen(true);
          }}
          className="md:hidden text-zinc-700 text-3xl hover:text-emerald-600 transition"
        >
          <TiThMenu />
        </button>
        <div
          id="page-status"
          className={`${
            isNavTop ? "block" : "hidden"
          } bg-gradient-to-r from-emerald-500 to-blue-500 w-full h-[4px] absolute -bottom-1 left-0`}
        ></div>
      </nav>
      {userData.role === "admin" && (
        <Link
          href={"/p-admin/house"}
          className="fixed bottom-4 right-4 z-50 bg-gray-100 dark:bg-zinc-700 dark:text-white border-2 border-zinc-300 dark:border-zinc-800 px-10 py-3 text-xl text-zinc-700 moraba-bold rounded-lg shadow-lg"
        >
          رفتن به پنل ادمین
        </Link>
      )}
      <MobileMenu closeMenu={CloseMenu} isMenu={isMenuOpen} />
    </>
  );
  function CloseMenu() {
    setIsMenuOpen(false);
  }
}
