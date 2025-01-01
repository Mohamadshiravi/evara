import IsUserLogedInServer from "@/utils/user/is-user-logedin-server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PAdminLayout({ children }) {
  const theUser = await IsUserLogedInServer();
  if (!theUser) {
    redirect("/");
  }
  if (theUser.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <header className="flex items-center justify-between gap-6 h-[80px] bg-white dark:bg-zinc-800 shadow-lg px-4">
        <div className="flex gap-3">
          <Link
            href="/p-admin/user"
            className="dark:bg-zinc-700 bg-zinc-300 px-6 py-2 rounded-lg text-xl moraba-bold fonr-mono font-bold"
          >
            کاربران
          </Link>
          <Link
            href="/p-admin/house"
            className="dark:bg-zinc-700 bg-zinc-300 px-6 py-2 rounded-lg text-xl moraba-bold fonr-mono font-bold"
          >
            خانه ها
          </Link>
        </div>
        <img
          src={theUser.avatar}
          className="w-[50px] aspect-square rounded-full border-2 dark:border-zinc-900 border-zinc-300"
        />
      </header>
      <main>{children}</main>
    </>
  );
}
