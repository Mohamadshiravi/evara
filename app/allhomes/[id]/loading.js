import Skeleton from "react-loading-skeleton";

export default function HomeLoading() {
  return (
    <section className="w-full h-screen fixed top-0 left-0 bg-white/50 dark:bg-zinc-900 z-[100] ">
      <Skeleton height={"300px"} />
      <section className="sm:px-10 px-4 sm:mt-8 mt-2">
        <div className="flex flex-col">
          <Skeleton width={"250px"} height={"40px"} />
          <Skeleton width={"150px"} height={"30px"} />
        </div>
        <div className="grid lg:grid-cols-[8fr_4fr] gap-4 mt-1">
          <Skeleton height={"500px"} />
          <div className="grid grid-cols-[6fr_6fr] gap-4">
            <Skeleton height={"250px"} />
            <Skeleton height={"250px"} />
            <Skeleton height={"250px"} />
            <Skeleton height={"250px"} />
          </div>
        </div>
      </section>
    </section>
  );
}
