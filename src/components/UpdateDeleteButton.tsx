"use client"
import { getProducts } from "@/lib/features/ProductSlice";
import { AppDispatch } from "@/lib/store";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const UpdateDeleteButton = ({id}:{id:string}) => {
    const router = useRouter()
    const [load,setLoad] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>()
    const deletePro = (id:string)=>{
        setLoad(true)
        axios.delete(`https://apiforproducts.onrender.com/products/${id}`).then(res =>{
            toast.success('Product deleted Successfully!')
            dispatch(getProducts())
            router.push("/")
        }).finally(()=> {
            setLoad(false)
        })
    }
    return (
        <div className="flex justify-center flex-col sm:flex-row gap-8 mt-10">
            <Link href={`/UpdateProduct/${id}`} className="flex items-center gap-2 bg-blue-button text-white p-1 px-2 rounded w-fit mx-auto sm:mx-0">
                <FontAwesomeIcon icon={faPen} className="w-[15px] h-[15px]"/>
                <span>Update Product</span>
            </Link>
            <button onClick={()=>deletePro(id)} disabled={load} className="flex items-center gap-2 bg-red-button text-white p-1 px-2 rounded w-fit mx-auto sm:mx-0">
                {
                    load ? 
                        <span>
                            <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                            Deleting
                        </span>
                    : <>
                        <FontAwesomeIcon icon={faTrashCan} className="w-[15px] h-[15px]"/>
                        <span>Delete Product</span>
                    </>
                }
            </button>
        </div>
    );
}

export default UpdateDeleteButton;
