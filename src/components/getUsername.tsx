"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

const GetUsername = ({color}:{color:string}) => {
    const user:any = useSelector((state:RootState)=>state.user)
    return (
        <Link href={"/"} className="cursor-pointer" style={{color:color}}>
            Hello {user?.username?.split(" ")[0]}
        </Link>
    );
}

export default GetUsername;