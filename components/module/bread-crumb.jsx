import Link from "next/link";

export default function BreadCrumb({ route }) {
  return (
    <section
      id="breadCrumb-cover"
      className="h-[300px] w-full relative bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute flex items-center flex-col justify-center gap-4 top-0 left-0 w-full h-full dark:bg-zinc-800/70 bg-green-900/40 backdrop-blur-[15px]">
        <h3 className="moraba-bold sm:ext-6xl text-5xl text-white mt-10 text-center">
          {route}
        </h3>
        <div className="flex items-center gap-4 text-white">
          <Link href={"/"} className="hover:text-zinc-400">
            خانه
          </Link>
          <h4 className="text-2xl">/</h4>
          <h4>{route}</h4>
        </div>
      </div>
    </section>
  );
}
