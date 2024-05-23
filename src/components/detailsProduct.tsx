"use client"

import { RootState } from "@/lib/store";
import Image from "next/image";
import UpdateDeleteButton from "./UpdateDeleteButton";
import AddToCartButton from "./AddToCartButton";
import { useSelector } from "react-redux";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
}

const DetailsProduct = ({product}:{product:IProp}) => {
    const user:any = useSelector((state:RootState)=>state.user);
    return (
        <div>
            <div className="card bg-white rounded p-2 pr-4 max-w-[700px] mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                    <Image src={`${product.productImg}`} alt={product.title} width={250} height={250}/>
                    <div className="px-2 pb-2 sm:p-0">
                        <div className="flex justify-between">
                            <h1 className="text-bodyFont font-bold text-lg">{product.title}</h1>
                            <p className="text-red-button font-bold">${product.price}</p>
                        </div>
                        <p className="my-3 mb-5">{product.description}</p>
                        <AddToCartButton product={product}/>
                    </div>
                </div>
            </div>
            {
                user.role==="admin" && <UpdateDeleteButton id={product.id}/>
            }
        </div>
    );
}

export default DetailsProduct;
