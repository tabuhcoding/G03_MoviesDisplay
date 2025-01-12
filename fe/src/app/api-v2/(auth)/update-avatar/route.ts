import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AxiosError } from "axios";
import { END_POINT_URL_LIST } from "@/src/util/constant";

export async function POST (request: NextRequest) {
  const body = await request.json()
  try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.UPDATE_AVATAR}`, body, {
      withCredentials: true
    });
    if(res.data.data.token){
      const response = NextResponse.json( res.data.data.user, { status: 200 })
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      response.cookies.set(
        "token", res.data.data.token, { 
          path: "/", 
          expires: expires,
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production"  }
      )
      return response
    }

    return new NextResponse(null, {
      status: 400,
      statusText: "Unauthorized",
      headers: { "Content-Type": "text/plain" }
    })
  }
  catch(e){
    const error = {
      message: (e as unknown as AxiosError).response?.statusText as string,
      status:  (e as unknown as AxiosError).response?.status as number,
      data: (e as unknown as AxiosError).response?.data as Record<string, string>
    }

    return NextResponse.json(error.data, {
      status: error.status,
      statusText: error.message,
      headers: { "Content-Type": "text/plain" }
    })
  }
}