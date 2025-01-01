import ConnectTODB from "@/config/connect-to-DB";
import evaraSaveModel from "@/models/evara-saved";
import evaraUserModel from "@/models/evara-user";
import { VerifyAccessToken } from "@/utils/auth/token-functions";
import RefreshToken from "@/utils/refresh-token/refresh-token";
import { cookies } from "next/headers";

export async function POST(req) {
  const { houseID } = await req.json();

  try {
    const userToken = cookies().get("token")?.value;

    if (!userToken) {
      return Response.json({ m: "user token invalid" }, { status: 401 });
    }

    let isTokenValid = await VerifyAccessToken(userToken);

    if (!isTokenValid) {
      const refreshToken = await RefreshToken();
      if (!refreshToken) {
        return Response.json({ m: "token not valid" }, { status: 401 });
      }
      cookies().set({
        name: "token",
        value: refreshToken.token,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24,
      });
      isTokenValid = refreshToken.user;
    }

    await ConnectTODB();

    const theUser = await evaraUserModel.findOne(
      { email: isTokenValid.email },
      "-__v -password"
    );

    if (!theUser) {
      return Response.json({ m: "user not found" }, { status: 404 });
    }

    const isSavedExist = await evaraSaveModel.findOne({
      house: houseID,
      user: theUser._id,
    });
    if (isSavedExist) {
      return Response.json({ m: "alerdy saved" }, { status: 200 });
    }
    await evaraSaveModel.create({
      user: theUser._id,
      house: houseID,
    });
    return Response.json({ m: "house saved" }, { status: 201 });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
