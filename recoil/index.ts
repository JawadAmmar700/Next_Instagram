import { atom } from "recoil"

const isOpenState = atom({
  key: "isOpen",
  default: false,
})

const UserState = atom({
  key: "user",
  default: null,
})

export { isOpenState, UserState }
