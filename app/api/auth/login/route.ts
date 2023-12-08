import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IRequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  const body: IRequestBody = await request.json();

  const user = await db.user.findFirst({
    where: {
      email: body.email,
    },
  });

  return NextResponse.json({ data: user }, { status: 200 });
}
