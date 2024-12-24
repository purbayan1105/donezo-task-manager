"use client";

import Image from "next/image";
import signupSvg from "../../../public/undraw_fill-forms_npwp.svg";
import { Select, SelectItem } from "@nextui-org/react";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { signUpFn } from "@/service/userService";
import { useRouter } from "next/navigation";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "others", label: "Others" },
];

const page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [passwordisVisible, setPasswordVisible] = useState(false);

  const [btnActive, setBtnActive] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const router = useRouter();
  const formSubmitHandle = async (e: any) => {
    e.preventDefault();

    if (
      signupData.name === "" ||
      signupData.email === "" ||
      signupData.password === "" ||
      signupData.confirmPassword === ""
    ) {
      toast.error("Please fill all details");
      return;
    }

    const passwordRegex: any =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (
      signupData.password.length < 8 ||
      !passwordRegex.test(signupData.password)
    ) {
      toast.error(
        "Password length must be at least 8 and should contain numbers and special characters"
      );
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }

    if (!file) {
      toast.error("Please choose an image file");
      return;
    } else {
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

      setBtnActive(true);
      try {
        const response = await signUpFn(updatedData);
        console.log(response);
        toast.success(response.message);
        router.push(`/signup/${signupData.email}/verifyuser`);
      } catch (error: any) {
        console.log(error);

        toast.error(error.response.data.message);
      }
    }
  };

  const passworVisHandler = () => {
    setPasswordVisible(!passwordisVisible);
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
        <div className="relative">
          <div>Password</div>
          <input
            type={passwordisVisible ? "text" : "password"}
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
            onChange={(e: any) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
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

        <div className="relative">
          <div>Confirm Password</div>
          <input
            type={passwordisVisible ? "text" : "password"}
            className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
            onChange={(e: any) =>
              setSignupData({ ...signupData, confirmPassword: e.target.value })
            }
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
          className={` ${"dark:bg-teal-400 bg-teal-600"} text-xl px-3 py-2 rounded-lg  mt-5 font-semibold w-[220px] `}
          type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default page;
