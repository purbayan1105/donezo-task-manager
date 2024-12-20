"use client";
import Image from "next/image";
import loginSvg from "../../../public/undraw_mobile-login_4ntr.svg";
import Link from "next/link";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { useState } from "react";

const page = () => {
  const [passwordisVisible, setPasswordVisible] = useState(false);

  const formSubmitHandle = (e: any) => {
    e.preventDefault();
    console.log("formSubmitted");
  };

  const passworVisHandler = () => {
    setPasswordVisible(!passwordisVisible);
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center space-y-5 h-[90dvh]"
        onSubmit={formSubmitHandle}>
        <div className="text-teal-600 text-3xl font-semibold">
          Please Login Here
        </div>
        <Image src={loginSvg} alt="login svg" height={100} width={100} />
        <div className="">
          <div>Email</div>
          <input
            type="email"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
        </div>

        <div className="relative">
          <div>Password</div>
          <input
            type={passwordisVisible ? "text" : "password"}
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
          {passwordisVisible ? (
            <FaEyeSlash
              className="absolute right-0 top-3"
              onClick={passworVisHandler}
              size={20}
            />
          ) : (
            <FaRegEye
              className="absolute right-0 top-3"
              onClick={passworVisHandler}
              size={20}
            />
          )}
        </div>
        <button
          className="bg-teal-600 dark:bg-teal-400 text-xl px-3 py-2 rounded-lg  w-44 mt-5 font-semibold"
          type="submit">
          Login
        </button>

        <div className=" text-lg">
          <p>Dont have an account?</p>
          <Link href="signup">
            {" "}
            <p className="text-center text-blue-600 dark:text-blue-300 font-semibold">
              Sign up
            </p>
          </Link>
        </div>
      </form>
    </>
  );
};

export default page;
