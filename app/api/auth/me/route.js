import ConnectTODB from "@/config/connect-to-DB";
import userModel from "@/models/user";
import { VerifyAccessToken } from "@/utils/auth/token-functions";
import RefreshToken from "@/utils/refresh-token/refresh-token";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const userToken = cookies().get("token")?.value;

    if (!userToken) {
      return Response.json({ m: "user token invalid" }, { status: 401 });
    }

    const isTokenValid = VerifyAccessToken(userToken);

    //refresh token here
    if (!isTokenValid) {
      const refreshToken = await RefreshToken();
      if (!refreshToken) {
        return Response.json({ m: "user token invalid" }, { status: 401 });
      } else {
        cookies().set({
          name: "token",
          value: refreshToken.token,
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60 * 1000 * 24,
        });
        return Response.json({ data: refreshToken.user });
      }
    }

    await ConnectTODB();

    const theUser = await userModel.findOne(
      { email: isTokenValid.email },
      "-__v -password"
    );

    if (!theUser) {
      return Response.json({ m: "user not found" }, { status: 404 });
    }

    return Response.json({ data: theUser });
  } catch (e) {
    return Response.json({ m: "error" }, { status: 500 });
  }
}
