import "server-only"

import { cookies } from "next/headers"

export const verifyToken = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value || "";
  return { token };
}