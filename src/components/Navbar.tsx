"use client";

import { darkAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { FaBars, FaBarsProgress, FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const Navbar = () => {
  const [isDark, setDark] = useAtom(darkAtom);

  const darkModeHandler = () => {
    console.log("clicked");

    setDark(!isDark);
  };
  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <>
      <div className="grid grid-cols-6 px-5 py-3">
        <div className="flex items-center gap-5 col-span-4">
          <FaBars size={30} />

          <p className="text-2xl font-bold text-indigo-600">DoneZo</p>
        </div>

        <Link href="/login">
          <div className="flex justify-center items-center">
            <button className=" bg-blue-400 font-semibold dark:bg-teal-500 px-3 py-1.5 rounded-lg">
              Login
            </button>
          </div>
        </Link>

        <div className="flex justify-end col-span-1">
          {isDark ? (
            <FaMoon color="" size={25} onClick={darkModeHandler} />
          ) : (
            <MdSunny color="yellow" size={25} onClick={darkModeHandler} />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
