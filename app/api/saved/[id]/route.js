import ConnectTODB from "@/config/connect-to-DB";
import evaraSaveModel from "@/models/evara-saved";
import RefreshToken from "@/utils/refresh-token/refresh-token";
import IsUserLogedInServer from "@/utils/user/is-user-logedin-server";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
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

    const userSaved = await evaraSaveModel
      .find({
        user: params.id,
      })
      .populate("house");

    return Response.json({ data: userSaved }, { status: 200 });
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

    await evaraSaveModel.findOneAndDelete({
      house: params.id,
    });

    return Response.json({ m: "house delete from saved" }, { status: 200 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
