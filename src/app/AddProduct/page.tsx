"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/features/ProductSlice";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [load,setLoad] = useState<boolean>(false);
    const {register,formState: { errors },handleSubmit} = useForm()
    const router = useRouter()
    const onSubmit = async(data:any) => {
        setLoad(true);
        const id = []
        for(let i=0;i<5;i++){
            id.push(Math.round(Math.random()))
        }
        const product = { id: id.join(""),...data,price:+data.price}
        axios.post(`https://apiforproducts.onrender.com/products`, product)
        .then(res =>{
            toast.success('Product added Successfully!')
            dispatch(getProducts())
            router.push("/")
        }).finally(()=> {
            setLoad(false);
        })
    }
    return (
        <div className="mt-24 sm:mt-20">
            <div className="bg-bodyBG min-h-[83vh] py-10 flex items-center justify-center">
                <div className="container">
                    <div className="bg-footerBg p-4 py-5 max-w-[500px] mx-auto rounded-md">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="img" className="text-white">Product Img URL</label>
                                <input type="url" id="img" {...register("productImg", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.productImg?.type === "required" && (
                                    <p className="text-red-button text-sm animate-bounce h-3">Product Img URL is required</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="title" className="text-white">Product Title</label>
                                <input type="text" id="title" {...register("title", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.title?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Product Title is required</p>
                                }
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="price" className="text-white">Product Price</label>
                                <input type="number" id="price" {...register("price", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.price?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Product Price is required</p>
                                }
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="description" className="text-white">Product Description</label>
                                <textarea id="description" {...register("description", { required: true })} className="w-full h-16 bg-white outline-none rounded px-2 resize-none"/>
                                {errors.description?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Product Description is required</p>
                                }
                            </div>
                            <button className="bg-blue-button text-white p-[6px] px-3 cursor-pointer rounded" disabled={load}>
                                {
                                    load ? 
                                    <span>
                                        <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                                        Adding
                                    </span>
                                    : "Add Product"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;