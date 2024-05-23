/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { RootState } from "@/lib/store";
import { faBagShopping, faCartShopping, faPlus, faRightFromBracket, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetUsername from "./getUsername";
import { deleteUser, getUserSlice } from "@/lib/features/UserSlice";
import { getName } from "@/functions/GetUser";
import { signOut, useSession } from "next-auth/react";
import { getUserAuth } from "@/functions/GetUserAuth";
import { getToken } from "next-auth/jwt";
import { Cookie } from "next/font/google";
import { cookies } from "next/headers";
import { singout } from "@/functions/SignOut";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity?:number;
}

const Header = () => {
    const [headerBg,setBg] = useState("")
    const user:any = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    const [color,setColor] = useState("#2b3445");
    useEffect(()=>{
        if (typeof window !== "undefined") {
            // browser code
            window.onscroll = ()=> {
                if(window.scrollY >= 20 ){
                    setBg("#212529");
                    setColor("#fff");
                }
                else {
                    setBg("");
                    setColor("#2b3445");
                }
            }
        }
    },[])

    const products:any = useSelector((state:RootState)=>state.cart);
    let sum= 0;
    products?.map((ele:IProp)=>sum += ele.price*ele.quantity!)
    
    useEffect(()=>{
        getName(dispatch);
    },[])

    const {data,status}:{data:any,status:any} = useSession();
    // console.log(data,status)

    const [checkStat,setChSt] = useState(true)
    if(status === "authenticated" && checkStat){
        getUserAuth(dispatch,data?.user)
        setChSt(false)
    }
    return (
        <div className="pt-4 pb-2 flex justify-center fixed top-0 w-full" style={{backgroundColor:headerBg}}>
            <div className="container">
                <div className="sm:flex gap-2 justify-between items-center">
                    <div className="hidden sm:inline-block">
                        <p className="flex items-end gap-1" style={{color:color}}>
                            <FontAwesomeIcon icon={faBagShopping} size="2x"/>
                            <span className="font-bold">AWU</span>
                        </p>
                        <p style={{color:color}}>Shopping</p>
                    </div>
                    {
                        user.role === "user" ? 
                        <div className="flex justify-center flex-wrap items-center gap-3">
                            <Link href={"/cart"} className="bg-bodyFont text-blue flex items-center gap-2 p-[6px] px-3 rounded-full relative">
                                <FontAwesomeIcon icon={faCartShopping} className="w-[15px] h-[15px]"/>
                                <span className="text-sm">${sum>0 ? sum : "0.00"}</span>
                                <span className="absolute -top-2 right-1 bg-red-button text-white rounded-full text-xs p-[2px] px-[6px]">{products.length}</span>
                            </Link>
                            <Link href={""} onClick={()=>singout(dispatch)} style={{color:color}} className="hover:bg-bodyFont hover:!text-blue duration-300 flex items-center gap-2 border border-bodyFont p-[6px] px-3 rounded-full relative">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="text-sm">Sign out</span>
                            </Link>
                            <GetUsername color={color}/>
                        </div>
                        :user.role === "admin" ?
                        <div className="flex justify-center flex-wrap items-center gap-3">
                            <Link href={"/AddProduct"} className="bg-bodyFont text-blue flex items-center gap-2 p-[6px] px-3 rounded-full relative">
                                <FontAwesomeIcon icon={faPlus} className="w-[15px] h-[15px]"/>
                                <span className="text-sm">Add Product</span>
                            </Link>
                            <Link href={""} onClick={()=>singout(dispatch)} style={{color:color}} className="hover:bg-bodyFont hover:!text-blue duration-300 flex items-center gap-2 border border-bodyFont p-[6px] px-3 rounded-full relative">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="text-sm">Sign out</span>
                            </Link>
                            <GetUsername color={color}/>
                        </div>
                        :<div className="flex justify-end flex-wrap items-center gap-4">
                            <Link href={"/signIn"} style={{color:color}} className="hover:bg-bodyFont hover:!text-blue duration-300 flex items-center gap-2 border border-bodyFont p-[6px] px-3 rounded-full relative">
                                <FontAwesomeIcon icon={faRightToBracket} className="w-[15px] h-[15px]"/>
                                <span className="text-sm">Sign in</span>
                            </Link>
                            <Link href={"/register"} className="hover:bg-bodyFont hover:!text-blue duration-300 flex items-center gap-2 border border-bodyFont p-[6px] px-3 rounded-full relative" style={{color:color}}>
                                <FontAwesomeIcon icon={faUserPlus} className="w-[15px] h-[15px]"/>
                                <span className="text-sm">Register</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
