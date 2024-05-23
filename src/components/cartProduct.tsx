"use client"

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { decrement, deleteAll, increment } from "@/lib/features/CartSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePro } from "@/functions/DeleteFromCart";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity?:number;
}

const CartProduct = () => {
    const router = useRouter();
    const products:any = useSelector((state:RootState)=>state.cart);
    const dispatch = useDispatch()
    let sum= 0;
    products.map((ele:IProp)=>sum += ele.price*ele.quantity!)
    const [deleteLoad,setLoad] = useState<boolean>(false)

    return (
        <div className="bg-bodyBG min-h-[83vh] py-10 flex justify-center">
            <div className="container">
                <div className="overflow-y-auto">
                    <table className="w-[590px] sm:w-full card mb-5">
                        <thead>
                            <tr className="bg-white">
                                <th className='border'>#</th>
                                <th className='border'>Img</th>
                                <th className='border'>Name</th>
                                <th className='border'>Price</th>
                                <th className='border'>Quantity</th>
                                <th className='border'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((ele:IProp,index:number)=>{
                                    return(
                                        <tr className="w-full text-center bg-white border-t-2 rounded border-t-blue-button" key={ele.id}>
                                            <td className="px-1">{index+1}</td>
                                            <td className="border">
                                                <Image src={`${ele.productImg}`} alt={ele.title} width={130} height={130} className="mx-auto"/>
                                            </td>
                                            <td  className="border">
                                                <p className="font-semibold text-bodyFont">{ele.title}</p>
                                            </td>
                                            <td className="border">
                                                <p className="font-semibold">${ele.price*ele.quantity!}</p>
                                            </td>
                                            <td className="border">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="text-lg font-bold text-blue-button" onClick={()=>dispatch(increment(ele))}>+</button>
                                                    <p className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-blue-button">{ele.quantity}</p>
                                                    <button className="text-lg font-bold text-blue-button" onClick={()=>dispatch(decrement(ele))}>-</button>
                                                </div>
                                            </td>
                                            <td className="border">
                                                <button className="p-1 px-2 text-white rounded bg-red-button" onClick={()=>deletePro(ele,dispatch,setLoad)}>
                                                    {
                                                        deleteLoad ? <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin"></span>
                                                        :<FontAwesomeIcon icon={faTrashCan} className="w-[13px] h-[13px]"/>
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                            )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <button className="flex items-center gap-2 p-2 text-sm text-white rounded bg-red-button" onClick={()=>dispatch(deleteAll())}>
                        <FontAwesomeIcon icon={faTrashCan} className="w-[12px] h-[12px]"/>
                        <span>Clear Cart</span>
                    </button>
                </div>
                <div className="mt-10">
                    <div className="card bg-white rounded w-[200px] mx-auto">
                        <p className="py-2 text-lg font-semibold text-center text-bodyFont">Cart Summary</p>
                        <div className="flex items-center justify-between p-2 border-t-2">
                            <p>Subtotal</p>
                            <p>${sum>0 ? sum : "0.00"}</p>
                        </div>
                        <button onClick={()=> router.push(`/checkout?amount=${sum}`)} className="inline-block w-full py-2 text-center text-white bg-blue-button">
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
