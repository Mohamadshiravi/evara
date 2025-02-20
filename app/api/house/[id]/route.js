import ConnectTODB from "@/config/connect-to-DB";
import houseModel from "@/models/house";
import saveModel from "@/models/saved";
import IsUserLogedInServer from "@/utils/user/is-user-logedin-server";
import DeletePhoto from "@/utils/delete-photo";
import RefreshToken from "@/utils/refresh-token/refresh-token";
import { cookies } from "next/headers";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.CLOUD_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET(req, { params }) {
  try {
    await ConnectTODB();

    const userHouse = await houseModel.find({
      user: params.id,
    });

    return Response.json({ data: userHouse }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const theUser = await IsUserLogedInServer();
    if (!theUser) {
      const refreshToken = await RefreshToken();
      if (!refreshToken) {
        return Response.json({ m: "user not found" }, { status: 401 });
      }
      cookies().set({
        name: "token",
        value: refreshToken.token,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24,
      });
    }
    await ConnectTODB();

    const oldImages = await houseModel.findOne(
      { _id: params.id },
      "-_id fileID"
    );
    oldImages.fileID.map(async (e) => {
      imagekit.deleteFile(e);
    });

    await houseModel.findOneAndDelete({
      _id: params.id,
    });
    await saveModel.findOneAndDelete({
      house: params.id,
    });

    return Response.json({ m: "house deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const theUser = await IsUserLogedInServer();
    if (!theUser) {
      const refreshToken = await RefreshToken();
      if (!refreshToken) {
        return Response.json({ m: "user not found" }, { status: 401 });
      }
      cookies().set({
        name: "token",
        value: refreshToken.token,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24,
      });
    }
    await ConnectTODB();

    await houseModel.findOneAndUpdate(
      {
        _id: params.id,
      },
      { queued: false }
    );

    return Response.json({ m: "house deleted" }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
