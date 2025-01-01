import { cookies } from "next/headers";
import { VerifyAccessToken } from "../auth/token-functions";
import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";

export default async function IsUserLogedInServer() {
  try {
    const userToken = cookies().get("token")?.value;

    if (!userToken) {
      return false;
    }

    const isTokenValid = VerifyAccessToken(userToken);

    if (!isTokenValid) {
      return false;
    }

    await ConnectTODB();

    const theUser = await evaraUserModel.findOne(
      { email: isTokenValid.email },
      "-__v -password"
    );

    if (!theUser) {
      return false;
    }

    return theUser;
  } catch (error) {
    return false;
  }
}
