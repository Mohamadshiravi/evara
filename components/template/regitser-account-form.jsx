import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { CgMail } from "react-icons/cg";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PiPassword, PiUser } from "react-icons/pi";
import RegisterHandler from "@/utils/auth/register";
import FormBtn from "@/components/module/form-btn";
import { RiErrorWarningLine } from "react-icons/ri";
import { ShowSwal } from "@/utils/helper-function";

export default function RegisterNewAccount() {
  const [state, formAction] = useFormState(RegisterHandler, {
    status: false,
    error: [],
    fields: {
      name: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    async function UserLogedIn() {
      const isOk = await ShowSwal(
        "success",
        "اکانت شما با موفقیت ساخته شد",
        "ممنون"
      );
      if (isOk) {
        location.reload();
      } else {
        location.reload();
      }
    }
    if (state.status) {
      UserLogedIn();
    }
  }, [state]);
  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-6 border border-zinc-200 dark:border-zinc-700 p-6 rounded-lg"
    >
      <h2 className="text-emerald-600 text-2xl w-full">
        ابتدا باید برای خود اکانت بسازید
      </h2>
      <Input
        type="text"
        radius="sm"
        variant="underlined"
        size="lg"
        color="primary"
        label="نام"
        placeholder="نام شما"
        startContent={<PiUser className="text-2xl text-emerald-600" />}
        name="name"
        defaultValue={state.fields.name}
      />
      <Input
        type="text"
        radius="sm"
        variant="underlined"
        size="lg"
        color="primary"
        label="ایمیل"
        placeholder="ایمیل شما"
        startContent={<CgMail className="text-2xl text-emerald-600" />}
        name="email"
        defaultValue={state.fields.email}
      />
      <Input
        type="password"
        radius="sm"
        variant="underlined"
        size="lg"
        color="primary"
        label="گذرواژه"
        placeholder="یک گذرواژه برای خود بنویسید"
        startContent={<PiPassword className="text-2xl text-emerald-600" />}
        name="password"
        defaultValue={state.fields.password}
      />
      <ul className="bg-red-100 rounded-lg px-2 flex flex-col w-full">
        {state.error.map((e, i) => (
          <li key={i} className="my-1 text-red-700 flex items-center gap-2">
            <RiErrorWarningLine />
            <span>{e}</span>
          </li>
        ))}
      </ul>
      <FormBtn className={"py-6"}>ساخت اکانت</FormBtn>
      <Link
        href={"/auth/login"}
        className="underline sm:text-xl text-base hover:text-emerald-600 flex items-center gap-3"
      >
        <FaExternalLinkAlt className="text-emerald-600" />
        اگر قبلا اکانت ساختی بزن روی من
      </Link>
    </form>
  );
}
