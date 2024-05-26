/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect } from "react";
import ShowProduct from "./showProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { getProducts } from "@/lib/features/ProductSlice";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
}

const LocalProduct = () => {
    const user:any = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch<AppDispatch>()
    const products:any = useSelector((state:RootState)=>state.products)
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])
    return (
        <div>
            {
                user.email ?
                <>
                    {
                        products.length > 0 ? 
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-10 sm:px-20">
                        {
                            products?.map((ele:IProp)=> <ShowProduct product={ele} key={ele.id}/>)
                        }
                        </div>
                        :<div className="flex justify-center">
                            <span className="inline-block w-7 h-7 rounded-full border-2 border-black border-l-gray-500 animate-spin"></span>
                        </div>
                    }
                </>
                :<div className="text-bodyFont text-center font-semibold">You must be signed in to view the protected content on this page.</div>
            }
        </div>
    );
}

export default LocalProduct;
