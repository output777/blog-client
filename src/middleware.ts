import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth();
    const {url} = req;

    if(session && (url?.includes('/signin') || url?.includes('/signup'))){ 
        return NextResponse.redirect(new URL(('/'), url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/signin', '/signup'],
  }