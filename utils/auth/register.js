"use server";

import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";
import * as yup from "yup";
import { HashPass } from "./hash-functions";
import { JenerateAccessToken, JenerateRefreshToken } from "./token-functions";
import { cookies } from "next/headers";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "نام نامعتبر است")
    .required("لطفا نام خود را وارد کنید")
    .matches(/^[A-z]+$/, "لطفا فقط حروف انگلیسی وارد کنید"),
  email: yup
    .string()
    .email("ایمیل نامعتبر است")
    .required("لطفا ایمیل خود را وارد کنید"),
  password: yup
    .string()
    .min(8, "گذرواژه باید حدئقل هشت حرف باشد")
    .required("لطفا گذرواژه خود را وارد کنید"),
});

export default async function RegisterHandler(prevState, formData) {
  const user = {
    name: formData.get("name"),
    email: formData.get("email").toLowerCase(),
    password: formData.get("password"),
  };

  try {
    const response = await schema.validate(user, { abortEarly: false });

    await ConnectTODB();

    const isAnyUserExist = await evaraUserModel.findOne({
      email: response.email,
    });

    if (isAnyUserExist) {
      return {
        status: false,
        error: ["این ایمیل قبلا در سایت ثبتنام شده است"],
        fields: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      };
    }

    const hashedPass = HashPass(response.password);
    const accesstoken = JenerateAccessToken({ email: response.email });
    const refreshToken = JenerateRefreshToken({ email: response.email });

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

    const isAdmin = await evaraUserModel.findOne({ role: "admin" });
    await evaraUserModel.create({
      name: response.name,
      email: response.email,
      password: hashedPass,
      role: isAdmin ? "user" : "admin",
      refreshToken,
    });
    return {
      status: true,
      error: [],
      fields: {
        name: "",
        email: "",
        password: "",
      },
    };
  } catch (e) {
    return {
      status: false,
      error: e.errors || [],
      fields: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    };
  }
}
