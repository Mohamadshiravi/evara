import Footer from "@/components/module/footer";
import AllHomes from "@/components/template/all-homes";
import BreadCrumb from "@/components/module/bread-crumb";
import HomesSection from "@/components/template/homes-section";

export default async function AllHomePage() {
  return (
    <>
      <BreadCrumb route={"همه املاک"} />
      <main className="sm:p-10 p-4">
        <HomesSection />
      </main>
      <Footer />
    </>
  );
}
