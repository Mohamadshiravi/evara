import EvaraSlider from "../module/evara-slider";

export default function EvaraAbout() {
  return (
    <section
      data-aos="fade-up-right"
      className="p-4 sm:rounded-xl bg-gray-200 dark:bg-zinc-800 mt-8"
    >
      <h1 className="py-4 text-center md:text-4xl text-3xl dark:text-white moraba-bold">
        چرا <span className="text-emerald-600 mx-4">اوارا</span> رو انتخاب کنیم
        ؟
      </h1>
      <div data-aos="zoom-in-up" className="mt-4 lg:w-9/12 w-full m-auto mb-10">
        <EvaraSlider />
      </div>
    </section>
  );
}
