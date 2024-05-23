import { deleteUser } from "@/lib/features/UserSlice"
import { signOut } from "next-auth/react"
import Cookie from "cookie-universal"

export const singout = (dispatch:any)=>{
    localStorage.removeItem("userToken")
    const cookie = Cookie();
    cookie.remove("userToken")
    dispatch(deleteUser())
    signOut()
}