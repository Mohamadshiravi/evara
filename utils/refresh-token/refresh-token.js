import { cookies } from "next/headers";
import {
  JenerateAccessToken,
  VerifyRefreshToken,
} from "../auth/token-functions";
import evaraUserModel from "@/models/evara-user";
import ConnectTODB from "@/config/connect-to-DB";

export default async function RefreshToken() {
  const refToken = cookies().get("refresh-token")?.value;

  if (!refToken) {
    return false;
  }

  await ConnectTODB();

  const isRefreshForUs = await evaraUserModel.findOne(
    {
      refreshToken: refToken,
    },
    "-__v -password"
  );
  if (!isRefreshForUs) {
    return false;
  }

  const verifyRefToken = VerifyRefreshToken(refToken);
  if (!verifyRefToken) {
    return false;
  }

  const token = JenerateAccessToken({ email: isRefreshForUs.email });

  return { user: isRefreshForUs, token };
}
