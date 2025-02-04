import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Ambil nilai token
  const role = req.cookies.get("role")?.value; // Ambil nilai role

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Tentukan hanya route tertentu yang menggunakan middleware ini
export const config = {
  matcher: ["/dashboard/:path*"], // Middleware hanya berjalan di dashboard
};
