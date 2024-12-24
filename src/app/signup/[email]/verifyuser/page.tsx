"use client";
import { addVerificationCodeFn } from "@/service/userService";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [code, setCode] = useState("");

  const params = useParams();

  const router = useRouter();

  const { email } = params;
  const decodedEmail = decodeURIComponent(email as string);
  // console.log(decodedEmail);

  const sendCodeHandle = async (e: any) => {
    e.preventDefault();

    if (code === "") {
      toast.error("Please enter the OTP");
      return;
    }
    console.log(code);
    console.log(typeof code);

    try {
      const response = await addVerificationCodeFn({
        email: decodedEmail,
        code,
      });
      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form
        action=""
        onSubmit={sendCodeHandle}
        className="flex flex-col justify-center items-center h-[70dvh] space-y-5">
        <div>Type Verification Code</div>
        <input
          type="text"
          className=" border-b-1 border-solid border-teal-500 dark:border-teal-200 bg-transparent outline-none"
          onChange={(e: any) => setCode(e.target.value)}
        />
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
