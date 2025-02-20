import ConnectTODB from "@/config/connect-to-DB";
import userModel from "@/models/user";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.CLOUD_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(req, { params }) {
  const formdata = await req.formData();
  const img = formdata.get("img");

  if (!img) {
    return Response.json({ error: "no file send" }, { status: 400 });
  }

  try {
    await ConnectTODB();

    const oldUserData = await userModel.findOne(
      { _id: params.id },
      "avatar fileID"
    );
    if (!oldUserData) {
      return Response.json({ m: "user notFound" }, { status: 404 });
    }

    console.log(oldUserData);
    if (oldUserData.avatar !== "/images/guest.jpg") {
      await imagekit.deleteFile(oldUserData.fileID);
    }

    const bufferedPhoto = Buffer.from(await img.arrayBuffer());
    const response = await imagekit.upload({
      file: bufferedPhoto,
      fileName: `avatar-${Date.now()}`,
      folder: "/evara/avatar",
    });

    const user = await userModel.findOneAndUpdate(
      { _id: oldUserData._id },
      { avatar: response.url, fileID: response.fileId },
      { new: true }
    );

    return Response.json({
      message: "user avatar updated",
      url: response.url,
    });
  } catch (error) {
    console.log(error);

    return Response.json({ m: "avatar not changed" }, { status: 500 });
  }
}
