import Image from "next/image";
import profImage from "@/public/images/guest.jpg";
import Footer from "@/components/module/footer";
import BreadCrumb from "@/components/module/bread-crumb";

export default function AboutSitePage() {
  return (
    <>
      <BreadCrumb route={"درباره سایت"} />
      <main className="sm:p-10 p-4">
        <section className="">
          <h2 className="moraba-bold md:text-4xl text-2xl text-headcolor">
            برنامه نویس فرانت اند :
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mt-6 flex gap-6 lg:w-6/12 w-full">
            <Image
              alt="prof"
              src={profImage}
              width={800}
              height={800}
              className="rounded-full sm:w-[100px] w-[70px] aspect-square object-cover"
            />
            <div className="flex flex-col gap-2">
              <h2 className="moraba-bold text-zinc-600 dark:text-white sm:text-2xl text-xl">
                محمد شیروی
              </h2>
              <h3 className="text-zinc-500 dark:text-white shabnam">
                برنامه نویس React.js/Next.js
              </h3>
            </div>
          </div>
          <hr className="border border-gray-200 dark:border-zinc-700 my-10" />
          <h2 className="moraba-bold mt-10 md:text-4xl text-2xl text-headcolor">
            برنامه نویس بک اند :
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 mt-6 flex gap-6 lg:w-6/12 w-full">
            <Image
              alt="prof"
              src={profImage}
              width={800}
              height={800}
              className="rounded-full sm:w-[100px] w-[70px] aspect-square object-cover"
            />
            <div className="flex flex-col gap-2">
              <h2 className="moraba-bold text-zinc-600 dark:text-white sm:text-2xl text-xl">
                محمد شیروی
              </h2>
              <h3 className="text-zinc-500 dark:text-white shabnam">
                برنامه نویس React.js/Next.js
              </h3>
            </div>
          </div>
          <hr className="border border-gray-200 dark:border-zinc-700 my-10" />
          <h2 className="moraba-bold md:text-4xl text-2xl mt-10 text-headcolor">
            زبان های برنامه نویسی / نشانه گذاری :
          </h2>
          <div className="flex flex-wrap items-center text-white gap-3 mt-6">
            <span className="bg-orange-500 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              HTML
            </span>
            <span className="bg-blue-500 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              CSS
            </span>
            <span className="bg-yellow-500 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              JavaScript
            </span>
          </div>
          <hr className="border border-gray-200 dark:border-zinc-700 my-10" />
          <h2 className="moraba-bold md:text-4xl text-2xl mt-10 text-headcolor">
            <span className="mx-3 text-green-800">FrameWork / Library</span> های
            استفاده شده :
          </h2>
          <div className="flex flex-wrap items-center text-white gap-3 mt-6">
            <span className="bg-indigo-500 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              TailWind
            </span>

            <span className="bg-blue-900 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              React.js
            </span>
            <span className="bg-zinc-950 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              Next.js
            </span>
            <span className="bg-fuchsia-600 rounded-lg px-8 py-2 md:text-3xl shadow-lg text-xl font-black font-mono">
              Next Ui
            </span>
          </div>
          <hr className="border border-gray-200 dark:border-zinc-700 my-10" />
          <h2 className="moraba-bold md:text-4xl text-2xl mt-10 text-headcolor">
            <span className="text-green-800 mx-3">dependencie</span> های پروژه :
          </h2>
          <div className="flex flex-wrap items-center text-white gap-3 mt-6">
            <span className="bg-zinc-600 flex-grow text-center rounded-lg px-8 py-2 md:text-3xl text-xl shadow-lg font-black font-mono">
              Aos
            </span>
            <span className="bg-zinc-600 flex-grow text-center rounded-lg px-8 py-2 md:text-3xl text-xl shadow-lg font-black font-mono">
              Yup
            </span>
            <span className="bg-zinc-600 flex-grow text-center rounded-lg px-8 py-2 md:text-3xl text-xl shadow-lg font-black font-mono">
              Framer motion
            </span>
            <span className="bg-zinc-600 flex-grow text-center rounded-lg px-8 py-2 md:text-3xl text-xl shadow-lg font-black font-mono">
              Swiper
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
