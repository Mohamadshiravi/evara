"use client";

import IsUserLogedIn from "@/utils/user/is-user-logedin-client";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { PiMapPinLineBold } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import {
  RiErrorWarningLine,
  RiMapPinUserFill,
  RiMapPinUserLine,
} from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
import {
  PiArrowsOutLight,
  PiBed,
  PiBuildingLight,
  PiToiletLight,
  PiBathtubLight,
} from "react-icons/pi";
import { FaRegImage } from "react-icons/fa";
import ImgInputRealTime from "@/components/module/image-uploader";
import AddNewHouseHandler from "@/utils/house/create-house-form";
import FormBtn from "@/components/module/form-btn";

import swal from "sweetalert";
import RegisterNewAccount from "@/components/template/regitser-account-form";
import { LuDollarSign } from "react-icons/lu";

export default function AddNewHomeSection() {
  const [state, formAction] = useFormState(AddNewHouseHandler, {
    status: false,
    error: [],
  });

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
  const [province, setProvince] = useState(null);

  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const [inputLength, setInputLength] = useState(1);

  useEffect(() => {
    async function fetchUserData() {
      const isUser = await IsUserLogedIn();
      setIsUserLogedIn(isUser);
    }
    fetchUserData();
  }, []);
  useEffect(() => {
    async function HouseCreated() {
      if (state.status) {
        const isOk = await swal({
          icon: "success",
          title: "اگهی شما اضافه شد",
          text: "اگهی شما با موفقیت در صف قرار گرفت و پس از تایید مدیریت در سایت به نمایش گذاشته میشود",
          buttons: "ممنون",
        });
        if (isOk) {
          location.reload();
        } else {
          location.reload();
        }
      }
    }
    HouseCreated();
  }, [state]);
  return (
    <main className="bg-gray-100 dark:bg-zinc-900 sm:pt-36 pt-28 pb-16">
      <section className="bg-white dark:bg-zinc-800 m-auto rounded-lg shadow-lg w-11/12 py-10 sm:px-10 px-4">
        <h1 className="text-center text-emerald-600 font-black text-5xl">
          EVARA
        </h1>
        <h2 className="text-2xl font-bold mt-4">اضافه کردن خانه جدید</h2>
        <h3 className="text-ذشسث text-zinc-600 dark:text-zinc-400 my-6">
          سلام !<br />
          لطفا تمام مشخصات خونت رو این پایین بنویس و بعد از تایید مدیریت به سایت
          و بقیه خونه ها اضافه میشه.
        </h3>
        <div className="grid relative lg:grid-cols-[6fr_6fr] grid-cols-[1fr] gap-8 mt-20 select-none">
          {!isUserLogedIn && <RegisterNewAccount />}
          <form
            action={formAction}
            className="flex flex-col items-center gap-6"
          >
            <Input
              name="title"
              type="text"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="عنوان"
              placeholder="عنوان اگهی شما"
              startContent={
                <AiOutlineHome className="text-2xl text-emerald-600" />
              }
            />
            <Select
              name="province"
              type="text"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="استان"
              placeholder="استان خود را انتخاب کنید"
              startContent={
                <RiMapPinUserFill className="text-2xl text-emerald-600" />
              }
              dir="rtl"
              onSelectionChange={setProvince}
            >
              {allCountry.map((e) => (
                <SelectItem key={e.label}>{e.label}</SelectItem>
              ))}
            </Select>
            <Select
              name="city"
              type="text"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="شهر"
              placeholder="شهر خود را انتخاب کنید"
              startContent={
                <RiMapPinUserLine className="text-2xl text-emerald-600" />
              }
              dir="rtl"
              disabledKeys={["dis"]}
            >
              {!province ? (
                <SelectItem key={"dis"}>ابتدا استان را انتخاب کنید</SelectItem>
              ) : (
                allCountry
                  .filter((e) => e.label === province.currentKey)[0]
                  .value.map((e, i) => <SelectItem key={e}>{e}</SelectItem>)
              )}
            </Select>
            <Textarea
              name="address"
              type="text"
              radius="sm"
              variant="bordered"
              size="lg"
              color="primary"
              label="ادرس"
              placeholder="ادرس خانه خود را بنویسید"
              startContent={
                <PiMapPinLineBold className="text-2xl text-emerald-600" />
              }
              minRows={5}
            />
            <Textarea
              name="description"
              type="text"
              radius="sm"
              variant="bordered"
              size="lg"
              color="primary"
              label="توضیحات"
              placeholder="توضیحات تکمیلی خانه خود را بنویسید"
              startContent={
                <TbFileDescription className="text-2xl text-emerald-600" />
              }
              minRows={12}
            />
            <h2 className="text-emerald-600 text-2xl w-full">
              ویژگی های خانه خود را انتخاب کنید
            </h2>
            <Input
              name="room"
              type="number"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="اتاق"
              placeholder="تعداد اتاق های خانه خود را بنویسید"
              startContent={<PiBed className="text-2xl text-emerald-600" />}
            />
            <Input
              name="bathroom"
              type="number"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="حمام"
              placeholder="تعداد حمام های خانه خود را بنویسید "
              startContent={
                <PiBathtubLight className="text-2xl text-emerald-600" />
              }
            />
            <Input
              name="toilet"
              type="number"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="توالت"
              placeholder="تعداد توالت های خانه خود را بنویسید"
              startContent={
                <PiToiletLight className="text-2xl text-emerald-600" />
              }
            />
            <Input
              name="floor"
              type="number"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="طبقه"
              placeholder="ساختمان چند طبقه است"
              startContent={
                <PiBuildingLight className="text-2xl text-emerald-600" />
              }
            />
            <Input
              name="meter"
              type="number"
              radius="sm"
              variant="underlined"
              size="lg"
              color="primary"
              label="متراژ"
              placeholder="متراژ خانه شما چقدر است"
              startContent={
                <PiArrowsOutLight className="text-2xl text-emerald-600" />
              }
            />
            <div className="flex flex-col items-start w-full mt-8">
              <h2 className="text-2xl text-emerald-600 flex items-center gap-3">
                <FaRegImage className="text-2xl" />
                عکس های خانه را اپلود کنید
              </h2>
              <p>دقت کنید از اپلود عکس های بی کیفیت یا بسیار پرحجم بپرهیزید</p>
            </div>
            <div className="flex flex-wrap items-end w-full gap-2">
              {Array.from({ length: inputLength }).map((e, i) => (
                <ImgInputRealTime
                  name={`img${i}`}
                  key={i}
                  GetValueHandler={GetValueHandler}
                />
              ))}
            </div>
            <Input
              name="price"
              type="number"
              radius="sm"
              variant="bordered"
              size="lg"
              color="primary"
              label="قیمت"
              placeholder="قیمتی که برای خانه تعیین کرده اید"
              startContent={
                <LuDollarSign className="text-2xl text-emerald-600" />
              }
              labelPlacement="outside"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">تومان</span>
                </div>
              }
            />
            <input type="hidden" name="imagesLength" value={inputLength - 1} />
            <ul className="bg-red-100 rounded-lg px-2 flex flex-col w-full">
              {state.error.map((e, i) => (
                <li
                  key={i}
                  className="my-1 text-red-700 flex items-center gap-2"
                >
                  <RiErrorWarningLine />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <FormBtn className={"py-8 text-2xl"}>اضافه کردن خانه</FormBtn>
          </form>
        </div>
      </section>
    </main>
  );
  async function GetValueHandler(name) {
    Array.from({ length: inputLength }).map((e, i) => {
      if (name === `img${i}`) {
        setInputLength(inputLength + 1);
      } else {
        setInputLength(inputLength);
      }
    });
  }
}
