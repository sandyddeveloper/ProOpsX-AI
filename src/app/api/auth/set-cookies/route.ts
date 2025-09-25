import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "Cookie set successfully" });

    // Set the cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // important so cookie is available everywhere
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error setting cookie" }, { status: 500 });
  }
}
