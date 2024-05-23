import { addProduct } from "@/lib/features/CartSlice";
import Swal from "sweetalert2";

export const addition = async(dispatch:any,product:any)=>{
    dispatch(addProduct(product))
    Swal.fire({
        title: "Successfully!",
        text: "The product add to cart!",
        icon: "success"
    });
}