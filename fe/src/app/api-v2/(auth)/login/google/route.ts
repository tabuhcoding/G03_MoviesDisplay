import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AxiosError } from "axios";

export async function POST (request: NextRequest) {
  const body = await request.json()
  try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google`, 
      {}, {
        headers: { Authorization: `Bearer ${body.token}` }
      });
    if(res.status === 201 && res.data.user){
      const response = NextResponse.json( res.data.user, { status: 200 })
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      response.cookies.set(
        "token", body.token, { 
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