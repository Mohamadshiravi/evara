"use server";

import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";
import { VerifyPass } from "./hash-functions";
import { JenerateAccessToken, JenerateRefreshToken } from "./token-functions";
import { cookies } from "next/headers";

export default async function LogInHandler(prevState, formData) {
  const user = {
    email: formData.get("email").toLowerCase(),
    password: formData.get("password"),
  };

  try {
    await ConnectTODB();

    const isAnyUserExist = await evaraUserModel.findOne({
      email: user.email,
    });

    if (!isAnyUserExist) {
      return {
        status: false,
        error: ["اکانت شما پیدا نشد"],
        fields: {
          email: user.email,
          password: user.password,
        },
      };
    }

    const checkPass = VerifyPass(user.password, isAnyUserExist.password);

    if (!checkPass) {
      return {
        status: false,
        error: ["رمز شما اشتباه است"],
        fields: {
          email: user.email,
          password: user.password,
        },
      };
    }

    const accesstoken = JenerateAccessToken({
      email: isAnyUserExist.email,
    });
    const refreshToken = JenerateRefreshToken({
      email: isAnyUserExist.email,
    });

    await evaraUserModel.findOneAndUpdate(
      { _id: isAnyUserExist._id },
      { refreshToken }
    );
    //set Token & refresh-token
    cookies().set({
      name: "token",
      value: accesstoken,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24,
    });
    cookies().set({
      name: "refresh-token",
      value: refreshToken,
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 15, // 15 day
    });
    return {
      status: true,
      error: [],
      fields: {
        email: "",
        password: "",
      },
    };
  } catch (e) {
    return {
      status: false,
      error: e.errors || ["error"],
      fields: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    };
  }
}
