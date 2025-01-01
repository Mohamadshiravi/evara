import "@/style/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Providers } from "./provider";
import { Header } from "@/components/module/header";
import AOSInit from "@/components/template/AOS-init";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "املاکی Evara (fake)",
  description: "خرید و فروش ملک و خانه",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className="dark:bg-zinc-900 bg-gray-100">
        <Header />
        <Providers>{children}</Providers>
        <AOSInit />
        <ToastContainer stacked />
      </body>
    </html>
  );
}
