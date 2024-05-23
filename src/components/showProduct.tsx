"use client"

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity?:number;
}

const ShowProduct = ({product}:{product:IProp}) => {
    return (
        <div className="bg-white rounded-md card">
            <Link href={`/details/${product.id}`}>
                <Image src={`${product.productImg}`} alt={product.title} width={500} height={200} className="inline-block rounded-t-md"/>
            </Link>
            <div className="p-2 pt-4">
                <h1 className="text-lg font-bold text-bodyFont">{product.title}</h1>
                <p className="text-sm">{product.description.slice(0,105)}.</p>
                <div className="flex items-center justify-between px-2 pt-2">
                    <p className="text-sm font-bold text-red-button">${product.price}</p>
                    <AddToCartButton product={product}/>
                </div>
            </div>
        </div>
    );
}

export default ShowProduct;
