import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";

export async function POST(req) {
  const { src, userID } = await req.json();
  try {
    await ConnectTODB();
    await evaraUserModel.findOneAndUpdate(
      { _id: userID },
      {
        avatar: src,
      }
    );
    return Response.json({ m: "avatar changed" }, { status: 201 });
  } catch (error) {
    return Response.json({ m: "avatar not changed" }, { status: 500 });
  }
}
