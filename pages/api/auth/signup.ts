import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export default async function handler(req: NextRequest) {
  const res = NextResponse; // Use NextResponse for response methods
  
  try {
    await connectDB();

    const { first_name, last_name, email, password, phone } = await req.json();

    if (!first_name || !last_name || !email || !password || !phone) {
      return res.json({ message: "please fill all fields" }, { status: 400 });
    }

    const isExitUser = await User.findOne({ email });
    if (isExitUser) {
      return res.json({ message: "Email is found please sign in" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name: `${first_name} ${last_name}`,
      email,
      password: hashedPassword,
      phone,
    });

    return res.json({
      data: {
        newUser,
      },
      message: "user created successfully",
    }, { status: 200 });
  } catch (err) {
    return res.json({
      message: (err as Error).message,
    }, { status: 500 });
  }
}