import { db } from "@/lib/db";
import userExist from "@/lib/userExists";
import { NextResponse } from "next/server";

interface IRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: IRequestBody = await request.json();

    // Check if the email is already registered
    const existingUser: boolean = await userExist(body.email);

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already registered." },
        { status: 400 },
      );
    }

    // Create a new user
    const newUser = await db.user.create({
      data: {
        email: body.email,
        password: body.password, // In a production environment, you should hash the password
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error registering user." },
      { status: 500 },
    );
  } finally {
    await db.$disconnect();
  }
}
