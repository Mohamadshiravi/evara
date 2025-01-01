import Footer from "@/components/module/footer";
import AllHomes from "@/components/template/all-homes";
import evaraHouseModel from "@/models/evara-house";
import ConnectTODB from "@/config/connect-to-DB";
import BreadCrumb from "@/components/module/bread-crumb";

export default async function AllHomePage() {
  await ConnectTODB();
  const allHouseSorted = await evaraHouseModel.find({ queued: false }, null, {
    sort: "-_id",
  });
  return (
    <>
      <BreadCrumb route={"همه املاک"} />
      <main className="sm:p-10 p-4">
        <AllHomes allHouse={JSON.parse(JSON.stringify(allHouseSorted))} />
      </main>
      <Footer />
    </>
  );
}
