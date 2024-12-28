"use client"

// import { TUser } from "@/types"
import { useRouter } from "next/navigation"
import { createContext, useContext, useState } from "react"
export interface TUser {
  username: string
  email: string
  avatar: string
  createdAt: string
}

// STEP 1: create a useState
const useUserState = () => useState<TUser>({} as TUser)

// STEP 2: createContext that take the value useState of step 1
export const AuthContext = createContext<ReturnType<
  typeof useUserState
> | null>(null)

// STEP 3: create a custom hook for later use
export const useAuth = () => {
  const user = useContext(AuthContext)
  const router = useRouter()

  if (!user) {
    throw new Error("useUser must be used within a AuthProvider")
  }

  const login = (userInfo: TUser) => {
    user[1](userInfo)
  }

  const logout = async () => {
    user[1]({} as TUser)

    // add request to clear cookies here
    await fetch("/api-v2/logout", {
      method: "GET"
    })
    // clearAuthToken()

    router.refresh()
  }

  const updateUserInfo = (newInfo: Partial<TUser>) => {
    user[1]((prev) => ({
      ...prev,
      ...newInfo
    }))
  }

  // return as a object
  return {
    isLogin: !!user[0].username,
    userInfo: user[0],
    login,
    logout,
    updateUserInfo
  }
}

// STEP 4: provider to wrap all components in your app
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // this is the value of the useState in STEP 1
  const [user, setUser] = useUserState()

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
