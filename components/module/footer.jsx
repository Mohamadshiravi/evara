import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import GoToTopBtn from "./go-top-btn";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-200 dark:bg-zinc-800 relative dark:text-white">
      <GoToTopBtn />
      <div className="grid sm:grid-cols-[6fr_6fr] grid-cols-[1fr] p-4">
        <div className="w-full flex flex-col items-center">
          <h1 className="moraba-bold text-2xl">اوارا در شبکه های مجازی</h1>
          <div className="shadow-lg hover:shadow-xl cursor-pointer hover:shadow-emerald-600/50 transition flex items-center bg-emerald-600 justify-center rounded-lg mt-8 mb-2">
            <span className="text-white text-lg w-[150px] text-center">
              _ins_Eavara
            </span>
            <span className="bg-white text-emerald-600 w-[50px] aspect-square text-3xl rounded-lg flex items-center justify-center">
              <FaInstagram />
            </span>
          </div>
          <div className="shadow-lg hover:shadow-xl cursor-pointer hover:shadow-emerald-600/50 transition flex items-center bg-emerald-600 justify-center rounded-lg mb-8 mt-2">
            <span className="text-white text-lg w-[150px] text-center">
              _tel_Eavara @
            </span>
            <span className="bg-white text-emerald-600 w-[50px] aspect-square text-3xl rounded-lg flex items-center justify-center">
              <FaTelegramPlane />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center text-2xl gap-2 moraba-bold mt-6">
            <span dir="ltr">0901 146 8142</span>
            <MdCall />
          </div>
          <div className="flex items-center text-2xl gap-2 moraba-bold mt-2">
            <span dir="ltr">0905 282 1134</span>
            <MdCall />
          </div>
          <div className="flex gap-2 mt-8 py-4 border-t border-zinc-400">
            <span dir="ltr">2020...2024</span>
            <span className="text-5xl font-bold text-emerald-600">EVARA</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-zinc-700 flex md:flex-row flex-col justify-center p-1">
        <p className="text-center text-white p-2 moraba-regular">
          طراحی UI UX و برنامه نویسی سایت توسط محمد شیروی انجام شده است
        </p>
      </div>
    </footer>
  );
}
