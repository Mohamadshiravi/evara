import { HomeCard } from "@/components/module/home-card";
import ConnectTODB from "@/config/connect-to-DB";
import evaraHouseModel from "@/models/evara-house";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function PAdminHouse() {
  await ConnectTODB();
  const AllHouse = await evaraHouseModel.find({}, null, { sort: "-_id" });

  return (
    <main className={`sm:px-10 px-6 sm:py-20 py-8`}>
      <section className="bg-white dark:bg-zinc-800 rounded-md px-4 py-6">
        <div className="flex justify-between items-center w-full">
          <h2 className="after:content-[''] text-zinc-800 after:absolute after:top-0 after:right-0 after:w-[100px] after:h-[5px] after:bg-emerald-600 relative moraba-bold w-full m-auto sm:text-3xl text-2xl py-4 pl-4 dark:text-white">
            تمام اگهی های املاک
          </h2>
          <Link
            href={"/"}
            className="bg-emerald-600 rounded-full p-4 hover:bg-emerald-700 transition text-xl ml-6"
          >
            <IoArrowBack />
          </Link>
        </div>
        <section className="sm:mt-20 mt-10 w-full grid lg:grid-cols-[4fr_4fr_4fr] md:grid-cols-[6fr_6fr] gap-4">
          {AllHouse.map((e, i) => (
            <HomeCard
              key={i}
              img={JSON.parse(JSON.stringify(e.images[0] || null))}
              id={JSON.parse(JSON.stringify(e._id))}
              title={JSON.parse(JSON.stringify(e.title))}
              city={JSON.parse(JSON.stringify(e.city))}
              area={JSON.parse(JSON.stringify(e.address))}
              price={JSON.parse(JSON.stringify(e.price))}
              room={JSON.parse(JSON.stringify(e.room))}
              floor={JSON.parse(JSON.stringify(e.floor))}
              meter={JSON.parse(JSON.stringify(e.meter))}
              queued={JSON.parse(JSON.stringify(e.queued))}
              isDeletable
              isAcceptable
            />
          ))}
        </section>
      </section>
    </main>
  );
}
