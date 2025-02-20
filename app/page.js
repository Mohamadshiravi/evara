import Footer from "@/components/module/footer";
import AllHomes from "@/components/template/all-homes";
import EvaraAbout from "@/components/template/evara-about-slider";
import HomeHeader from "@/components/module/home-header";
import { RecentlySLider } from "@/components/template/recently-product";
import { SpecialSLider } from "@/components/template/special-slider";
import houseModel from "@/models/house";
import ConnectTODB from "@/config/connect-to-DB";

export default async function Home() {
  return (
    <>
      <HomeHeader />
      <main className="overflow-hidden sm:p-10 p-4">
        <SpecialSLider />
        <EvaraAbout />
        <RecentlySLider />
        <br />
        <br />
        <AllHomes />
      </main>
      <Footer />
    </>
  );
}
