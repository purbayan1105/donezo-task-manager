"use client";

import { darkAtom } from "@/utils/atoms/atoms";
import { useAtom } from "jotai";
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
      <div className="grid grid-cols-4 px-5 py-3">
        <div className="flex items-center gap-5 col-span-3">
          <FaBars size={30} />

          <p className="text-2xl font-bold text-indigo-600">DoneZo</p>
        </div>

        <div className="flex justify-end ">
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
