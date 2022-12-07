import { NextResponse } from "next/server";
import { verify } from "./auth/token/tokens";
const SECRET = "hola";

export async function middleware(request) {
  const jwt = request.cookies.get("getViral");
  if (!jwt) {
    return NextResponse.redirect(new URL("/index", request.url));
  }
  try {
    const payload = await verify(jwt.value);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/index", request.url));
  }
}

export const config = {
  matcher: ["/logged"],
};
