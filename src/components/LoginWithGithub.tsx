"use client"
import Image from "next/image";
import { signIn } from "next-auth/react"
const LoginWithGithub = () => {
    return (
        <button onClick={()=>signIn("github",{ redirect:true,callbackUrl:"/"})}
        className="p-1 px-4 bg-white border border-red-500 rounded flex items-center gap-2">
            <Image src='/github-icon.png'
                alt='icon'
                width={20}
                height={20}
                className="rounded-full"
            />
            <span>GitHub</span>
        </button>
    );
}

export default LoginWithGithub;
