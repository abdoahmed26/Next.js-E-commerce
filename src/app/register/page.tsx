"use client"
import { useForm } from "react-hook-form";
import { createUser, getUser } from "../../../actions/userActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import LoginWithGithub from "@/components/LoginWithGithub";

const Page = () => {
    const router = useRouter()
    const [load,setLoad] = useState<boolean>(false);
    const {register,formState: { errors },handleSubmit} = useForm()
    const onSubmit = async(data:any) => {
        setLoad(true);
        const users = await getUser();
        const repeatUser = users.find(ele => ele.email===data.email);
        if(repeatUser){
            Swal.fire({
                icon: "error",
                title: "This Email is already used",
            });
        }
        else{
            await createUser(data);
            toast.success('Your email created Successfully!')
            router.push("/signIn");
        }
        setLoad(false);
    }
    return (
        <div className="mt-20">
            <div className="bg-bodyBG min-h-[83vh] py-10 flex items-center justify-center">
                <div className="container">
                    <div className="bg-footerBg p-4 py-5 max-w-[450px] mx-auto rounded">
                        <div>
                            <h1 className="text-white text-2xl text-center">Sign Up</h1>
                        </div>
                        <div className="flex justify-center gap-3 my-3">
                            <LoginWithGoogle/>
                            <LoginWithGithub/>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="user" className="text-white">Username</label>
                                <input type="text" id="user" {...register("username", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.username?.type === "required" && (
                                    <p className="text-red-button text-sm animate-bounce h-3">Username is required</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="email" className="text-white">Email address</label>
                                <input type="email" id="email" {...register("email", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.email?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Email Address is required</p>
                                }
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="pass" className="text-white">Password</label>
                                <input type="password" id="pass" {...register("password", { required: true, minLength:10, maxLength:20 })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.password?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Password is required</p>
                                }
                                {errors.password?.type === "minLength" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Password must be more than 10 characters</p>
                                }
                                {errors.password?.type === "maxLength" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Password must be less than 20 characters</p>
                                }
                            </div>
                            <button className="bg-blue-button text-white p-[6px] px-3 cursor-pointer rounded" disabled={load}>
                                {
                                    load ? 
                                    <span>
                                        <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                                        Creating
                                    </span>
                                    : "Create"
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