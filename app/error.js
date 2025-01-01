"use client";

export default function AddHouseError(e) {
  return (
    <section className="flex items-center justify-center w-full h-screen">
      <div>{e}</div>
    </section>
  );
}
