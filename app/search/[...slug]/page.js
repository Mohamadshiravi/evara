import { HomeCard } from "@/components/module/home-card";
import HomeHeader from "@/components/module/home-header";
import ConnectTODB from "@/config/connect-to-DB";
import evaraHouseModel from "@/models/evara-house";

export default async function SearchSection({ params, searchParams }) {
  const decodedProvince = decodeURIComponent(params.slug[0]);
  const decodedCity = decodeURIComponent(params.slug[1]);
  const decodedAddress = decodeURIComponent(params.slug[2]);

  await ConnectTODB();
  let searchedHouse = [];
  if (params.slug[2] === undefined) {
    searchedHouse = await evaraHouseModel.find({ city: decodedCity });
  } else {
    let firstSearchedHouse = await evaraHouseModel.find({ city: decodedCity });
    searchedHouse = firstSearchedHouse.filter((e) =>
      e.address.includes(decodedAddress)
    );
  }
  return (
    <>
      <HomeHeader
        city={JSON.parse(JSON.stringify(decodedCity))}
        province={JSON.parse(JSON.stringify(decodedProvince))}
        address={JSON.parse(JSON.stringify(decodedAddress))}
      />
      <main className="sm:px-10 sm:px-6 px-5 sm:py-20 py-8">
        <section className="bg-white dark:bg-zinc-800 sm:p-10 p-3 rounded-md md:mt-0 mt-40">
          <div className="w-full">
            {params.slug[2] ? (
              <h2 className="after:content-[''] md:flex-row flex-col flex md:items-center gap-6 text-zinc-800 after:absolute after:top-0 after:right-0 after:w-[100px] after:h-[5px] after:bg-emerald-600 relative moraba-bold w-full m-auto sm:text-2xl text-xl py-4 pl-4 dark:text-white">
                اگهی های املاک ثبت شده در
                <span className="text-emerald-600 sm:text-2xl text-base">
                  {decodedCity}
                </span>
                <span className="text-zinc-400 dark:text-zinc-600 md:block hidden">
                  /
                </span>
                <span className="text-emerald-600 sm:text-2xl text-base">
                  {decodedAddress}
                </span>
              </h2>
            ) : (
              <h2 className="after:content-[''] md:flex-row flex-col flex md:items-center gap-6 text-zinc-800 after:absolute after:top-0 after:right-0 after:w-[100px] after:h-[5px] after:bg-emerald-600 relative moraba-bold w-full m-auto sm:text-2xl text-xl py-4 pl-4 dark:text-white">
                اگهی های املاک ثبت شده در
                <span className="text-emerald-600 sm:text-2xl text-base">
                  {decodedProvince}
                </span>
                <span className="text-zinc-400 dark:text-zinc-600 md:block hidden">
                  /
                </span>
                <span className="text-emerald-600 sm:text-2xl text-base">
                  {decodedCity}
                </span>
              </h2>
            )}
          </div>
          <section className="sm:mt-20 mt-10 w-full grid lg:grid-cols-[4fr_4fr_4fr] md:grid-cols-[6fr_6fr] gap-4">
            {searchedHouse.map((e, i) => (
              <HomeCard
                key={i}
                img={JSON.parse(JSON.stringify(e.images[0]) || null)}
                id={JSON.parse(JSON.stringify(e._id))}
                title={JSON.parse(JSON.stringify(e.title))}
                city={JSON.parse(JSON.stringify(e.city))}
                area={JSON.parse(JSON.stringify(e.address))}
                price={JSON.parse(JSON.stringify(e.price))}
                room={JSON.parse(JSON.stringify(e.room))}
                floor={JSON.parse(JSON.stringify(e.floor))}
                meter={JSON.parse(JSON.stringify(e.meter))}
              />
            ))}
            {searchedHouse.length === 0 && (
              <h2 className="text-2xl text-zinc-700">
                هنوز اگهی ای برای این شهر و استان ثبت نشده
              </h2>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
