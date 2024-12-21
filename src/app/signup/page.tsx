"use client";

import Image from "next/image";
import signupSvg from "../../../public/undraw_fill-forms_npwp.svg";
import { Select, SelectItem } from "@nextui-org/react";
import FileUpload from "@/components/FileUpload";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "others", label: "Others" },
];

const page = () => {
  const formSubmitHandle = () => {
    console.log("sibmitted");
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center space-y-5  py-5"
        onSubmit={formSubmitHandle}>
        <div className="text-teal-600 text-3xl font-semibold">
          Please Fill The Form
        </div>
        <Image src={signupSvg} alt="login svg" height={150} width={150} />
        <div className="">
          <div>Name</div>
          <input
            type="text"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
        </div>
        <div className="">
          <div>Email</div>
          <input
            type="email"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
        </div>
        <div className="">
          <div>Password</div>
          <input
            type="password"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
        </div>

        <div className="">
          <div>Confirm Password</div>
          <input
            type="password"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          />
        </div>

        <div>
          <Select
            label="Select Your gender"
            variant="underlined"
            color="success"
            className="w-[220px] ">
            {gender.map((option: any) => (
              <SelectItem
                key={option.key}
                className="text-black dark:text-white">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="">
          <FileUpload />
        </div>

        <button
          className="bg-teal-600 dark:bg-teal-400 text-xl px-3 py-2 rounded-lg  mt-5 font-semibold w-[220px]"
          type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default page;
