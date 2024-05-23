"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
}

const UpdateProd = ({product}:{product:IProp}) => {
    const router = useRouter()
    const [Image,setImage] = useState(product.productImg);
    const [title,setTitle] = useState(product.title);
    const [decsript,setDes] = useState(product.description);
    const [price,setPrice] = useState(product.price);
    const [load,setLoad] = useState<boolean>(false);
    const {register,formState: { errors },handleSubmit} = useForm()
    const onSubmit = async(data:any) => {
        setLoad(true);
        const UpdateProduct = {...data,price:+data.price}
        axios.put(`https://apiforproducts.onrender.com/products/${product.id}`, UpdateProduct)
        .then(res => {
            toast.success('Product updated Successfully!')
            router.push("/")
        }).finally(()=> {
            setLoad(false);
        })
    }
    return (
        <div className="bg-footerBg p-4 py-5 max-w-[500px] mx-auto rounded-md">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="img" className="text-white">Product Img URL</label>
                    <input type="url" defaultValue={Image} onInput={(e:any)=>setImage(e.target.value)} 
                    id="img" {...register("productImg", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                    {errors.productImg?.type === "required" && (
                        <p className="text-red-button text-sm animate-bounce h-3">Product Img URL is required</p>
                    )}
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="title" className="text-white">Product Title</label>
                    <input type="text" defaultValue={title} onInput={(e:any)=>setTitle(e.target.value)} 
                    id="title" {...register("title", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                    {errors.title?.type === "required" && 
                        <p className="text-red-button text-sm animate-bounce h-3">Product Title is required</p>
                    }
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="price" className="text-white">Product Price</label>
                    <input type="number" defaultValue={price} onInput={(e:any)=>setPrice(e.target.value)} 
                    id="price" {...register("price", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                    {errors.price?.type === "required" && 
                        <p className="text-red-button text-sm animate-bounce h-3">Product Price is required</p>
                    }
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="description" className="text-white">Product Description</label>
                    <textarea  defaultValue={decsript} onInput={(e:any)=>setDes(e.target.value)} 
                    id="description" {...register("description", { required: true })} className="w-full h-16 bg-white outline-none rounded px-2 resize-none"/>
                    {errors.description?.type === "required" && 
                        <p className="text-red-button text-sm animate-bounce h-3">Product Description is required</p>
                    }
                </div>
                <button className="bg-blue-button text-white p-[6px] px-3 cursor-pointer rounded" disabled={load}>
                    {
                        load ? 
                            <span>
                                <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                                Updating
                            </span>
                        : "Update Product"
                    }
                </button>
            </form>
        </div>
    );
}

export default UpdateProd;