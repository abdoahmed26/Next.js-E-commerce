"use client"
import Image from "next/image";
import { signIn } from "next-auth/react"
const LoginWithGoogle = () => {
    return (
        <button onClick={()=>signIn("google",{ redirect:true,callbackUrl:"/"})}
        className="p-1 px-4 bg-white border border-red-500 rounded flex items-center gap-2">
            <Image src='/google-icon.png'
                alt='icon'
                width={20}
                height={20}
                className="rounded-full"
            />
            <span>Google</span>
        </button>
    );
}

export default LoginWithGoogle;
