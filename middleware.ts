import { NextResponse, type NextRequest } from "next/server";
import { getMiddlewareClient } from "./lib/supabase";

export async function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    let res = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });

    const supabase = getMiddlewareClient(req, res);
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }

    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  // matcher: ["/((?!_next/static|_next/image|login|signup|favicon.ico).*)"],
  matcher: ["/api"],
};
