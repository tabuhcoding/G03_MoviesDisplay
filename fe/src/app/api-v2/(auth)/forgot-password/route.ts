/* Package System */
import { type NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { END_POINT_URL_LIST } from "@/src/util/constant";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.FORGOT_PASSWORD}`, body);
    return NextResponse.json(
      {
        message: response.data.data.message || 'OTP đã được gửi',
        expiresAt: response.data.data.expiresAt,
        remainingAttempts: response.data.data.remainingAttempts
      },
      {
        status: response.data.status,
        statusText: response.data.statusText || "OK",
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (e) {
    const error = e as AxiosError;

    // Trả về lỗi chi tiết từ BE nếu có
    const errorResponse = {
      message: (error.response?.data as { message?: string })?.message || "Đã xảy ra lỗi",
      status: error.response?.status || 500,
      data: error.response?.data || {}
    };

    return NextResponse.json(errorResponse, {
      status: errorResponse.status,
      statusText: errorResponse.message,
      headers: { "Content-Type": "application/json" }
    });
  }
}