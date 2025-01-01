"use client";

import { TiThMenu } from "react-icons/ti";

import { useEffect, useState } from "react";

import "swiper/css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import DarkModeBtn from "../module/dark-mode-btn";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "../module/mobile-menu";
import IsUserLogedIn from "@/utils/user/is-user-logedin-client";
import UserDetailsDropdown from "./user-dashboard";
import { newErrorToast } from "@/utils/helper-function";

export default function HomeHeader(prop) {
  const router = useRouter();
  const [allCountry, setAllCountry] = useState([
    {
      label: "آذربایجان شرقی",
      value: [
        "اسكو",
        "اهر",
        "ایلخچی",
        "باسمنج",
        "بستان آباد",
        "بناب",
        "تبريز",
        "تسوج",
        "جلفا",
        "خسروشهر",
        "سراب",
        "سهند",
        "شبستر",
        "صوفیان",
        "مراغه",
        "مرند",
        "ملكان",
        "ممقان",
        "ميانه",
        "هاديشهر",
        "هريس",
        "هشترود",
        "ورزقان",
      ],
    },
    {
      label: "آذربایجان غربی",
      value: [
        "اروميه",
        "اشنويه",
        "بوكان",
        "تكاب",
        "خوي",
        "سر دشت",
        "سلماس",
        "شاهين دژ",
        "ماكو",
        "مهاباد",
        "مياندوآب",
        "نقده",
        "پلدشت",
        "پيرانشهر",
        "چالدران",
      ],
    },
    {
      label: "اردبیل",
      value: [
        "اردبيل",
        "خلخال",
        "مشگين شهر",
        "نمين",
        "نير",
        "پارس آباد",
        "گرمي",
      ],
    },
    {
      label: "اصفهان",
      value: [
        "آران و بيدگل",
        "اردستان",
        "اصفهان",
        "باغ بهادران",
        "تودشک",
        "تيران",
        "حاجي آباد",
        "خميني شهر",
        "خوانسار",
        "درچه",
        "دهاقان",
        "زرين شهر",
        "سميرم",
        "شهرضا",
        "عسگران",
        "علويجه",
        "فلاورجان",
        "كاشان",
        "مباركه",
        "نجف آباد",
        "نطنز",
        "ورزنه",
        "کوهپایه",
        "گلپايگان",
      ],
    },
    {
      label: "ایلام",
      value: [
        "آبدانان",
        "ايلام",
        "ايوان",
        "دره شهر",
        "دهلران",
        "سرابله",
        "مهران",
      ],
    },
    {
      label: "بوشهر",
      value: [
        "اهرم",
        "برازجان",
        "بوشهر",
        "جم",
        "خورموج",
        "دير",
        "عسلویه",
        "كنگان",
        "کاکی",
        "گناوه",
      ],
    },
    {
      label: "تهران",
      value: [
        "اسلامشهر",
        "باقرشهر",
        "بومهن",
        "تجريش",
        "تهران",
        "دماوند",
        "رباط كريم",
        "رودهن",
        "ري",
        "شريف آباد",
        "شهريار",
        "فشم",
        "فيروزكوه",
        "قدس",
        "قرچك",
        "كهريزك",
        "لواسان",
        "ملارد",
        "ورامين",
        "پاكدشت",
        "چهاردانگه",
      ],
    },
    {
      label: "چهارمحال و بختیاری",
      value: ["اردل", "بروجن", "شهركرد", "فارسان", "لردگان", "چلگرد"],
    },

    {
      label: "خراسان رضوی",
      value: [
        "تايباد",
        "تربت جام",
        "تربت حيدريه",
        "خواف",
        "درگز",
        "سبزوار",
        "سرخس",
        "طبس",
        "طرقبه",
        "فريمان",
        "قوچان",
        "كاشمر",
        "مشهد",
        "نيشابور",
        "چناران",
        "گناباد",
      ],
    },
    {
      label: "خوزستان",
      value: [
        "آبادان",
        "انديمشك",
        "اهواز",
        "ايذه",
        "ايرانشهر",
        "باغ ملك",
        "بندر امام خميني",
        "بندر ماهشهر",
        "بهبهان",
        "حمیدیه",
        "خرمشهر",
        "دزفول",
        "رامشیر",
        "رامهرمز",
        "سوسنگرد",
        "شادگان",
        "شادگان",
        "شوش",
        "شوشتر",
        "لالي",
        "مسجد سليمان",
        "ملاثانی",
        "هنديجان",
        "هويزه",
      ],
    },
    {
      label: "سیستان و بلوچستان",
      value: [
        "ايرانشهر",
        "خاش",
        "زابل",
        "زاهدان",
        "سراوان",
        "سرباز",
        "ميرجاوه",
        "چابهار",
      ],
    },
    {
      label: "فارس ",
      value: [
        "آباده",
        "اردكان",
        "ارسنجان",
        "استهبان",
        "اقليد",
        "بوانات",
        "جهرم",
        "حاجي آباد",
        "خرامه",
        "خنج",
        "داراب",
        "زرقان",
        "سروستان",
        "سوريان",
        "سپيدان",
        "شيراز",
        "صفاشهر",
        "فراشبند",
        "فسا",
        "فيروز آباد",
        "كازرون",
        "لار",
        "لامرد",
        "مرودشت",
        "مهر",
        "کوار",
      ],
    },
    {
      label: "کرج ",
      value: ["اشتهارد", "طالقان", "كرج", "ماهدشت", "نظرآباد", "هشتگرد"],
    },

    {
      label: "کرمان ",
      value: [
        "انار",
        "بافت",
        "بردسير",
        "بم",
        "جيرفت",
        "راور",
        "رفسنجان",
        "زرند",
        "سيرجان",
        "كرمان",
        "كهنوج",
        "کوهبنان",
      ],
    },
    {
      label: "کرمانشاه ",
      value: [
        "اسلام آباد غرب",
        "جوانرود",
        "سنقر",
        "صحنه",
        "قصر شيرين",
        "كرمانشاه",
        "كنگاور",
        "هرسين",
        "پاوه",
      ],
    },
    {
      label: "گلستان ",
      value: [
        "آزاد شهر",
        "آق قلا",
        "راميان",
        "علي آباد كتول",
        "كردكوی",
        "كلاله",
        "گرگان",
        "گنبد كاووس",
      ],
    },
    {
      label: "گیلان ",
      value: [
        "آستارا",
        "املش",
        "تالش",
        "رشت",
        "رودبار",
        "شفت",
        "صومعه سرا",
        "فومن",
        "لاهیجان",
        "لنگرود",
        "ماسال",
        "ماسوله",
        "منجيل",
        "هشتپر",
      ],
    },
    {
      label: "لرستان ",
      value: [
        "ازنا",
        "الشتر",
        "اليگودرز",
        "بروجرد",
        "خرم آباد",
        "دزفول",
        "دورود",
        "كوهدشت",
        "ماهشهر",
        "نور آباد",
      ],
    },
    {
      label: "مازندران ",
      value: [
        "آمل",
        "بابل",
        "بابلسر",
        "بلده",
        "بهشهر",
        "تنكابن",
        "جويبار",
        "رامسر",
        "ساري",
        "قائم شهر",
        "محمود آباد",
        "نكا",
        "نور",
        "نوشهر",
        "چالوس",
      ],
    },
    {
      label: "هرمزگان ",
      value: [
        "بستك",
        "بندر جاسك",
        "بندر خمیر",
        "بندر لنگه",
        "بندرعباس",
        "حاجي آباد",
        "دهبارز",
        "قشم",
        "قشم",
        "كيش",
        "ميناب",
      ],
    },
    {
      label: "همدان ",
      value: ["اسدآباد", "بهار", "رزن", "ملاير", "نهاوند", "همدان"],
    },
    {
      label: "یزد ",
      value: [
        "ابركوه",
        "اردكان",
        "اشكذر",
        "بافق",
        "تفت",
        "خضرآباد",
        "زارچ",
        "طبس",
        "مهريز",
        "ميبد",
        "هرات",
        "يزد",
      ],
    },
  ]);

  const [userData, setUserData] = useState(false);

  const [ostan, setOstan] = useState("");
  const [shahr, setShahr] = useState("");
  const [address, setAddress] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    async function fetchUserData() {
      const isUser = await IsUserLogedIn();
      setUserData(isUser);
    }
    fetchUserData();

    setOstan(prop.province || "");
    setShahr(prop.city || "");
    setAddress(prop.address || "");
  }, []);

  const handleOstanChange = (e) => {
    setOstan(e.target.value);
  };
  const handleShahrChange = (e) => {
    setShahr(e.target.value);
  };
  return (
    <>
      <header
        id="header-cover"
        className="relative h-[300px] bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute top-0 left-0 w-full h-full dark:bg-zinc-800/70 bg-green-900/40 backdrop-blur-[5px]">
          <div className="h-[80px]"></div>
          <h1 className="sm:mt-10 md:text-5xl sm:text-4xl flex sm:flex-row flex-col justify-center gap-2 text-4xl sm:px-12 text-white text-center moraba-bold">
            <span>بگذارید</span>
            <Swiper
              className="inline w-[320px] sm:h-[150px] h-[50px] m-0"
              loop={true}
              direction={"vertical"}
              cssMode={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              <SwiperSlide>خانه جدیدتان را</SwiperSlide>
              <SwiperSlide>باغ جدیدتان را</SwiperSlide>
              <SwiperSlide>مغازه جدیدتان را</SwiperSlide>
              <SwiperSlide>زمین جدیدتان را</SwiperSlide>
            </Swiper>
            <span>ما به شما نشان دهیم</span>
          </h1>
        </div>
        <div
          data-aos-once="true"
          data-aos="fade-up"
          className="moraba-regular px-4 py-3 dark:bg-zinc-800 flex md:flex-row flex-col md:gap-0 gap-4 justify-center items-center bg-white text-zinc-700 rounded-lg z-10 absolute md:bottom-[-10%] bottom-[-55%] xl:w-[60%] xl:left-[20%] lg:w-[80%] w-[90%] lg:left-[10%] left-[5%] shadow-lg"
        >
          <div className="flex flex-row w-full gap-3">
            <Select
              defaultSelectedKeys={[prop.province]}
              size="sm"
              color="primary"
              variant="underlined"
              label="استان"
              placeholder="انتخاب"
              className="w-full"
              dir="rtl"
              onChange={handleOstanChange}
            >
              {allCountry.map((e) => (
                <SelectItem key={e.label}>{e.label}</SelectItem>
              ))}
            </Select>
            <Select
              defaultSelectedKeys={[prop.city]}
              size="sm"
              color="primary"
              variant="underlined"
              label="شهر"
              placeholder="انتخاب"
              className="w-full"
              dir="rtl"
              disabledKeys={["dis"]}
              onChange={handleShahrChange}
            >
              {!ostan ? (
                <SelectItem key={"dis"}>ابتدا استان را انتخاب کنید</SelectItem>
              ) : (
                allCountry
                  .filter((e) => e.label === ostan)[0]
                  .value.map((e) => <SelectItem key={e}>{e}</SelectItem>)
              )}
            </Select>
            <Select
              disabledKeys={["شناسایی نشده"]}
              size="sm"
              color="primary"
              variant="underlined"
              label="محدوده"
              placeholder="انتخاب"
              className="w-full"
              dir="rtl"
            >
              <SelectItem key={"شناسایی نشده"}>شناسایی نشده</SelectItem>
            </Select>
          </div>
          <div className="flex items-center md:flex-row flex-col md:gap-0 gap-3 w-full h-full">
            <div className="md:border-x-2 w-full dark:border-zinc-700 border-zinc-200 md:px-3 md:mx-3">
              <Input
                value={address === "undefined" ? "" : address}
                onValueChange={setAddress}
                color="primary"
                variant="faded"
                radius="sm"
                size="sm"
                type="text"
                className="md:w-[250px] w-full dark:text-zinc-400"
                label="ادرس"
              />
            </div>
            <Button
              onPress={SearchHandler}
              dir="ltr"
              radius="sm"
              size="lg"
              className="bg-gradient-to-l from-blue-500 to-emerald-600 text-white md:px-14 px-0 w-full"
            >
              جستجو
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu closeMenu={CloseMenu} isMenu={isMenuOpen} />
    </>
  );
  function CloseMenu() {
    setIsMenuOpen(false);
  }
  function SearchHandler() {
    if (ostan === "" || shahr === "") {
      return newErrorToast("حدئقل استان و شهر را انتخاب کنید");
    } else {
      router.push(`/search/${ostan}/${shahr}/${address}`);
    }
  }
}
