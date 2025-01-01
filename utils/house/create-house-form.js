"use server";

import ConnectTODB from "@/config/connect-to-DB";
import evaraUserModel from "@/models/evara-user";
import * as yup from "yup";
import { VerifyAccessToken } from "../auth/token-functions";
import { cookies } from "next/headers";
import evaraHouseModel from "@/models/evara-house";
import RefreshToken from "../refresh-token/refresh-token";

const schema = yup.object().shape({
  title: yup.string().required("لطفا یک عنوان برای اگهی خود انتخاب کنید"),
  province: yup.string().required("لطفا استان خود را انتخاب کنید"),
  city: yup.string().required("لطفا شهر خود را انتخاب کنید"),
  address: yup.string().required("لطفا ادرس خود را بنویسید"),
  description: yup.string().required("لطفا توضیحات خود را بنویسید"),
  room: yup
    .number()
    .required("لطفا ویژگی های خانه را وارد کنید")
    .min(1, "ویژگی های خانه نمیتوانند منفی باشند"),
  bathroom: yup
    .number()
    .required("لطفا ویژگی های خانه را وارد کنید")
    .min(1, "ویژگی های خانه نمیتوانند منفی باشند"),
  toilet: yup
    .number()
    .required("لطفا ویژگی های خانه را وارد کنید")
    .min(1, "ویژگی های خانه نمیتوانند منفی باشند"),
  floor: yup
    .number()
    .required("لطفا ویژگی های خانه را وارد کنید")
    .min(1, "ویژگی های خانه نمیتوانند منفی باشند"),
  meter: yup
    .number()
    .required("لطفا ویژگی های خانه را وارد کنید")
    .min(1, "ویژگی های خانه نمیتوانند منفی باشند"),
  price: yup
    .number("errr")
    .required("لطفا قیمت خانه را وارد کنید")
    .min(1, "قیمت خانه نامعتبر است"),
});

export default async function AddNewHouseHandler(prevState, formData) {
  let theUser = null;

  //Auth check
  const userToken = cookies().get("token")?.value;

  if (!userToken) {
    return {
      status: false,
      error: ["لطفا ابتدا یک اکانت بسازید"],
    };
  }

  const isTokenValid = VerifyAccessToken(userToken);

  if (!isTokenValid) {
    const refreshToken = await RefreshToken();
    if (!refreshToken) {
      return {
        status: false,
        error: ["لطفا ابتدا یک اکانت بسازید"],
      };
    } else {
      cookies().set({
        name: "token",
        value: refreshToken.token,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 1000 * 24,
      });
      theUser = refreshToken.user;
    }
  } else {
    theUser = await evaraUserModel.findOne(
      { email: isTokenValid.email },
      "-__v -password"
    );
  }

  //end auth

  try {
    const title = formData.get("title");
    const province = formData.get("province");
    const city = formData.get("city");
    const address = formData.get("address");
    const description = formData.get("description");
    const room = formData.get("room");
    const bathroom = formData.get("bathroom");
    const toilet = formData.get("toilet");
    const floor = formData.get("floor");
    const meter = formData.get("meter");
    const price = formData.get("price");

    //const imagesLength = formData.get("imagesLength");

    await ConnectTODB();
    let imagesPathArray = [];

    //upload house images

    // const startNameImages = Date.now();
    // if (imagesLength >= 1) {
    //   Array.from({ length: imagesLength }).map(async (e, i) => {
    //     const img = formData.get(`img${i}`);

    //     const bufferedImg = Buffer.from(await img.arrayBuffer());
    //     const imgName = `${startNameImages}-${i}-${img.name}`;
    //     const imgPath = path.join(
    //       process.cwd(),
    //       `/public/uploads/home/${imgName}`
    //     );

    //     writeFileSync(imgPath, bufferedImg);
    //   });
    //   //create path again without async
    //   Array.from({ length: imagesLength }).map((e, i) => {
    //     const img = formData.get(`img${i}`);
    //     const imgName = `${startNameImages}-${i}-${img.name}`;

    //     const imgPath = `/uploads/home/${imgName}`;
    //     imagesPathArray.push(imgPath);
    //   });
    // }

    //data validation
    await schema.validate(
      {
        title,
        province,
        city,
        address,
        description,
        room: Number(room),
        bathroom: Number(bathroom),
        toilet: Number(toilet),
        floor: Number(floor),
        meter: Number(meter),
        price: Number(price),
      },
      { abortEarly: false }
    );

    await evaraHouseModel.create({
      title,
      province,
      city,
      address,
      description,
      room,
      bathroom,
      toilet,
      floor,
      meter,
      price,
      user: theUser._id,
      images: imagesPathArray,
    });

    return {
      status: true,
      error: [],
    };
  } catch (error) {
    return {
      status: false,
      error: error.errors || [],
    };
  }
}
