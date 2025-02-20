import ConnectTODB from "@/config/connect-to-DB";
import houseModel from "@/models/house";

export const revalidate = 0;

export async function GET(req) {
  try {
    await ConnectTODB();

    const allHouse = await houseModel
      .find({ queued: false })
      .sort({ createdAt: -1 });

    return Response.json({ data: allHouse }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
