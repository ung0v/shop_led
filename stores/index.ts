import { create } from "zustand"

type User = {
  user: any
}

type UserDispatch = {
  setUser: (user: any) => void
}

const inititalState = {
  user: {},
}

export const useUser = create<User & UserDispatch>((set) => ({
  ...inititalState,
  setUser: (user: any) => set({ user }),
}))
