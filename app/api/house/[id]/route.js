import ConnectTODB from "@/config/connect-to-DB";
import evaraHouseModel from "@/models/evara-house";
import evaraSaveModel from "@/models/evara-saved";
import IsUserLogedInServer from "@/utils/user/is-user-logedin-server";
import DeletePhoto from "@/utils/delete-photo";
import RefreshToken from "@/utils/refresh-token/refresh-token";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  try {
    await ConnectTODB();

    const userHouse = await evaraHouseModel.find({
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

    const oldImages = await evaraHouseModel.findOne(
      { _id: params.id },
      "images -_id"
    );
    oldImages.images.map(async (e) => {
      await DeletePhoto(e);
    });

    await evaraHouseModel.findOneAndDelete({
      _id: params.id,
    });
    await evaraSaveModel.findOneAndDelete({
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

    await evaraHouseModel.findOneAndUpdate(
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
