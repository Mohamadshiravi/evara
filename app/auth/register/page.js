"use client";

import RegisterHandler from "@/utils/auth/register";
import Link from "next/link";
import { RiErrorWarningLine } from "react-icons/ri";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { ShowSwal } from "@/utils/helper-function";
import FormBtn from "@/components/module/form-btn";

export default function Register() {
  const [state, formAction] = useFormState(RegisterHandler, {
    status: false,
    error: [],
    fields: {
      name: "",
      email: "",
      password: "",
    },
  });

  const myForm = useRef();

  useEffect(() => {
    async function UserLogedIn() {
      const isOk = await ShowSwal(
        "success",
        "اکانت شما با موفقیت ساخته شد",
        "ممنون"
      );
      if (isOk) {
        myForm.current.reset();
        location.href = "/";
      } else {
        myForm.current.reset();
        location.href = "/";
      }
    }
    if (state.status) {
      UserLogedIn();
    } else {
      myForm.current.reset();
    }
  }, [state]);
  return (
    <section className="flex py-32 bg-gray-100 dark:bg-zinc-900 items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 dark:text-white shadow-lg p-8 rounded-lg lg:w-4/12 md:w-6/12 sm:w-10/12 w-11/12">
        <h1 className="text-center text-emerald-600 font-black text-4xl">
          EVARA
        </h1>
        <h2 className="text-xl font-bold mt-4">ثبتنام</h2>
        <h3 className="text-sm text-zinc-600 dark:text-zinc-400 my-6">
          سلام !<br />
          لطفا ایمیل و نام خود را وارد کنید
        </h3>
        <form ref={myForm} action={formAction} className="flex flex-col gap-4">
          <input
            className="dark:bg-zinc-700 dark:border-none border outline-none focus:border-2 transition border-emerald-600 px-4 w-full rounded-lg py-3"
            type="text"
            placeholder="نام"
            name="name"
            defaultValue={state.fields.name}
          ></input>
          <input
            className="dark:bg-zinc-700 dark:border-none border outline-none focus:border-2 transition border-emerald-600 px-4 w-full rounded-lg py-3"
            type="email"
            placeholder="ایمیل"
            name="email"
            defaultValue={state.fields.email}
          ></input>
          <input
            className="dark:bg-zinc-700 dark:border-none border outline-none focus:border-2 transition border-emerald-600 px-4 w-full rounded-lg py-3"
            type="password"
            placeholder="گذرواژه"
            name="password"
            defaultValue={state.fields.password}
          ></input>
          <ul className="bg-red-100 rounded-lg px-2 flex flex-col">
            {state.error.map((e, i) => (
              <li key={i} className="my-1 text-red-700 flex items-center gap-2">
                <RiErrorWarningLine />
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="mt-20 flex flex-col items-center gap-2">
            <FormBtn>ثبتنام</FormBtn>
            <p className="text-base">
              قبلا اکانت ساخته اید ؟؟؟
              <Link
                className="text-emerald-600 underline mx-2"
                href={"/auth/login"}
              >
                ورود
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
