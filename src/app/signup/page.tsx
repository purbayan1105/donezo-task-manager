"use client";

import Image from "next/image";
import signupSvg from "../../../public/undraw_fill-forms_npwp.svg";
import { Select, SelectItem } from "@nextui-org/react";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { signUpFn } from "@/service/userService";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "others", label: "Others" },
];

const page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const formSubmitHandle = async (e: any) => {
    e.preventDefault();

    if (
      signupData.name === "" ||
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.confirmPassword === ""
    ) {
      toast.error("Please fill all details");
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Confirm password does not match");
    }

    // upload process

    if (!file) {
      toast.error("Please choose an image file");
    }

    const formData = new FormData();
    formData.append("upload_preset", "task_manager_preset");
    formData.append("file", file as File);
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/doe3ftnti/image/upload",
      formData
    );

    const imageUrl = response.data.secure_url;
    console.log(imageUrl);

    const updatedData = { ...signupData, imageUrl };
    console.log(updatedData);

    try {
      const response = await signUpFn(updatedData);
      console.log(response);
      toast.success(response.message);
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message);
    }
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
            onChange={(e: any) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
          />
        </div>
        <div className="">
          <div>Email</div>
          <input
            type="email"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
            onChange={(e: any) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
        </div>
        <div className="">
          <div>Password</div>
          <input
            type="password"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
            onChange={(e: any) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
        </div>

        <div className="">
          <div>Confirm Password</div>
          <input
            type="password"
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
            onChange={(e: any) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
          />
        </div>

        <div>
          <Select
            label="Select Your gender"
            variant="underlined"
            color="success"
            onChange={(e: any) =>
              setSignupData({ ...signupData, gender: e.target.value })
            }
            className="w-[220px] ">
            {gender.map((option: any) => (
              <SelectItem
                value={option.key}
                key={option.key}
                className="text-black dark:text-white">
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="">
          <FileUpload file={file} setFile={setFile} />
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
