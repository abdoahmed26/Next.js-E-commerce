"use client"
import CartProduct from "@/components/cartProduct";
import EmptyCart from "@/components/emptyCart";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const Page = () => {
    const products:any = useSelector((state:RootState)=>state.cart);
    return (
        <div className="mt-24 sm:mt-20">
            {
                products.length > 0 ? <CartProduct /> : <EmptyCart />
            }
        </div>
    );
}

export default Page;
