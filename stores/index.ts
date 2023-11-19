import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type User = {
  isLogin: boolean
  user: any
}

type UserDispatch = {
  setUser: (user: any) => void
  setIsLogin: (isLogin: boolean) => void
}

const inititalState = {
  isLogin: false,
  user: {},
}

export const useUser = create(
  persist<User & UserDispatch>(
    (set) => ({
      ...inititalState,
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      setUser: (user: any) => set({ user }),
    }),
    { name: "user-storage" }
  )
)
