import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value;

    // Protect all /dashboard routes
    if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
}

// Apply only to specific routes
export const config = {
    matcher: ["/dashboard/:path*"],
};
