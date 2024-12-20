import { type NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { AxiosError } from "axios";

export async function POST (request: NextRequest) {
  const body = await request.json()
  try{
    const res = await axios.get(`${process.env.NEXT_PUBlIC_BACKEND_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${body.token}` }
    });
    if(res.status === 200 && res.data.user){
      const response = NextResponse.json( res.data.user, { status: 200 })
      response.cookies.set(
        "token", res.data.token, { path: "/", expires: 7 }
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