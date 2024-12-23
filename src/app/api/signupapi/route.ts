import { User } from "@/models/UserSignupModel";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { connectDB } from "@/helper/connectDB";

export async function POST(request: NextRequest) {
  await connectDB();
  const { name, email, password, gender, imageUrl } = await request.json();

  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User Already Exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    user = await new User({
      name: name,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      gender: gender,
      imageUrl: imageUrl,
    });

    await user.save();

    return NextResponse.json(
      { message: "User is registered" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
