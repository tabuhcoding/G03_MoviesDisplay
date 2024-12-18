import axios, {AxiosError} from "axios"

const baseUrl = "http://localhost:3000"

const isServer = typeof window === "undefined"

const logInterceptor = async (req: any) => {
  if (isServer) {
    console.log("[AXIOS] [SERVER] ", req.url)
  } else {
    console.log("[AXIOS] [CLIENT] ", req.url)
  }
  return req
}

const cookiesInterceptor = async (req: any) => {
  if (isServer) {
    const { cookies } = (await import("next/headers"))
    const cookiesData = await cookies();
    const cookiesString = cookiesData.getAll()
      .map((item) => `${item.name}=${item.value}`)
      .join("; ")
    req.headers.cookie = cookiesString
  } 
  return req
}

export const AxiosService = axios.create({
  baseURL: baseUrl
})

AxiosService.interceptors.request.use(logInterceptor)
AxiosService.interceptors.request.use(cookiesInterceptor)

AxiosService.interceptors.response.use(
  (res) => {
    return res
  }
)

type TError = {
  message: string
  status: number
  data: Record<string, string>
}

export const useFetchServer = async <T,>(url:string): Promise<{ data: T | null; error: TError | null }> => {
  let data: T | null = null
  let error: TError | null = null 
  try {
    const response = await AxiosService.get<T>(url)
    if (!response.data) {
      throw new Error("Network response was not ok!")
    }
    data = response.data
  } catch (e) {
    error = {
      message: (e as unknown as AxiosError).response?.statusText as string,
      status:  (e as unknown as AxiosError).response?.status as number,
      data: (e as unknown as AxiosError).response?.data as Record<string, string>
    }
  }

  return {data, error}
}