import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  return new NextResponse(null, { status: 200 })
}
