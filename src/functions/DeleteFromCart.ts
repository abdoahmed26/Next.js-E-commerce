import { deleteProduct } from "@/lib/features/CartSlice";
import Swal from "sweetalert2";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity?:number;
}

export const deletePro = (ele:IProp,dispatch:any,setLoad:any)=>{
    setLoad(true)
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteProduct(ele))
            Swal.fire({
                title: "Deleted!",
                text: "Your Product has been deleted.",
                icon: "success"
            });
        }
    });
    setLoad(false)
}