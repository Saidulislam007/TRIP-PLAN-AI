import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  
  // Use environment variables for the API URL, default to localhost for dev
  const configuredAuthUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.replace(/\/+$/, "") 
    || process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "")
    || "http://localhost:5000";
    
  const authUrl = configuredAuthUrl.endsWith("/api/auth") 
    ? configuredAuthUrl 
    : `${configuredAuthUrl}/api/auth`;

  try {
    const res = await fetch(`${authUrl}/get-session`, {
      headers: {
        cookie: cookieHeader,
      },
    });
    
    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    const session = await res.json();
    if (!session || !session.session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
  } catch (err) {
    // If the server is down or we can't connect, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
