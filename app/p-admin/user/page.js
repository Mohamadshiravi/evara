import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";
import { FiUser } from "react-icons/fi";

export default async function UsersPage() {
  await ConnectTODB();
  const allUser = await evaraUserModel.find({});

  return (
    <div className="px-6">
      <div className="bg-white dark:bg-zinc-800 dark:text-white px-6 py-10 w-full m-auto mt-6 rounded-lg flex sm:flex-row flex-col-reverse sm:gap-20 gap-10 items-center justify-center moraba-regular text-zinc-700">
        <div className="flex flex-col items-center gap-4 text-2xl">
          <span>مجموع کاربر های سایت</span>
          <span className="font-mono font-bold text-5xl text-blue-500">
            {allUser.length}
          </span>
        </div>
        <FiUser className="text-8xl" />
      </div>
      <div className="flex flex-col gap-10 w-full py-40">
        {allUser.map((e, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-800 gap-4 rounded-lg p-4 flex xl:flex-row flex-col items-center justify-between"
          >
            <img
              src={e.avatar}
              className="lg:w-[100px] w-[500px] aspect-square rounded-lg"
            />
            <div className="flex lg:flex-row flex-col items-center gap-6">
              <div className="flex dark:border-zinc-700 dark:text-white flex-col lg:items-start items-center gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-700">
                <span className="text-lg">{e.email}</span>
              </div>
              <div className="flex dark:border-zinc-700 dark:text-white flex-col lg:items-start items-center moraba-bold gap-2 lg:border-l-2 lg:border-b-0 border-b-2 lg:pl-8 pb-4 text-zinc-600">
                <span className="text-lg">{e.name}</span>
                <h3>{e.role === "ADMIN" ? "ادمین" : "کاربر عادی"}</h3>
              </div>
              <div className="dark:text-white text-zinc-800">
                <span className="text-sm font-mono font-black">{e.id}</span>
              </div>
            </div>

            <button className="moraba-regular md:w-auto w-full bg-red-500 hover:bg-red-600 transition rounded-lg px-8 py-3 text-white text-lg">
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  async function DeleteUserHandler() {}
}
