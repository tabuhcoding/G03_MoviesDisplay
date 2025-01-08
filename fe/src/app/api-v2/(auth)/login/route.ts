import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AxiosError } from "axios";

export async function POST (request: NextRequest) {
  const body = await request.json()
  try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, body, {
      withCredentials: true
    });
    if(res.data.token){
      const response = NextResponse.json( res.data.user, { status: 200 })
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      response.cookies.set(
        "token", res.data.token, { 
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

    // return new NextResponse({
    //   status: response.status,
    //   body: response.data
    // });
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