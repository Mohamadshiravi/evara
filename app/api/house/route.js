import ConnectTODB from "@/config/connect-to-DB";
import evaraHouseModel from "@/models/evara-house";

export async function GET(req) {
  try {
    await ConnectTODB();

    const allHouse = await evaraHouseModel.find({ queued: false });

    return Response.json({ data: allHouse }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
