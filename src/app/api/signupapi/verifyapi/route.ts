import { connectDB } from "@/helper/connectDB";
import { User } from "@/models/UserSignupModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, code } = await request.json();

    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("user not found");
    }

    if (findUser.otp.toString() !== code) {
      throw new Error("OTP does not match");
    } else {
      findUser.otp = "";
      findUser.isVerified = true;

      await findUser.save();
      return NextResponse.json(
        { message: "User is verified" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
