import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("getViral");

  if (!jwt) {
    console.log("entro");
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log(JSON.parse(jwt.value));
  try {
    const { payload } = await jwtVerify(
      JSON.parse(jwt.value),
      new TextEncoder().encode("secret")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    console.log("que onda", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/home"],
};
