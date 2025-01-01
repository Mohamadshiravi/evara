"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DarkModeBtn() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDark(true);
    }
  }, []);
  return (
    <div className="">
      <Button onPress={ChangeTheme} isIconOnly color="primary" radius="full">
        {!dark ? (
          <FiMoon className="text-2xl" />
        ) : (
          <FiSun className="text-2xl" />
        )}
      </Button>
    </div>
  );
  function ChangeTheme() {
    if (dark) {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
    setDark(!dark);
  }
}
