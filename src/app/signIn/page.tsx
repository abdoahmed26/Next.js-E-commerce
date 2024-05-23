"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getUser } from "../../../actions/userActions";
import { getUserSlice } from "@/lib/features/UserSlice";
import { useDispatch } from "react-redux";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import LoginWithGithub from "@/components/LoginWithGithub";
import Cookie from "cookie-universal"

const Page = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [load,setLoad] = useState<boolean>(false)
    const {register,formState: { errors },handleSubmit} = useForm()
    const cookie = Cookie()
    const onSubmit = async(data:any) => {
        setLoad(true)
        const users = await getUser();
        const repeatUser = users.find(ele => ele.email===data.email);
        if(repeatUser?.password === data.password){
            localStorage.userToken = repeatUser?.id;
            cookie.set("userToken",repeatUser?.id)
            dispatch(getUserSlice(repeatUser))
            toast.success('You logged in Successfully!',{
                icon:'👏',
            })
            router.push("/")
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Email or Password is wrong",
            });
        }
        setLoad(false)
    }
    return (
        <div className="mt-20">
            <div className="bg-bodyBG min-h-[83vh] py-10 flex items-center justify-center">
                <div className="container">
                    <div className="bg-footerBg p-4 py-5 max-w-[450px] mx-auto rounded-lg">
                        <div>
                            <h1 className="text-white text-2xl text-center">Sign In</h1>
                        </div>
                        <div className="flex justify-center gap-3 my-3">
                            <LoginWithGoogle/>
                            <LoginWithGithub/>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="email" className="text-white">Email address</label>
                                <input type="email" id="email" {...register("email", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.email?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Email Address is required</p>
                                }
                            </div>
                            <div className="flex flex-col gap-1 mb-4">
                                <label htmlFor="pass" className="text-white">Password</label>
                                <input type="password" id="pass" {...register("password", { required: true })} className="w-full h-8 bg-white outline-none rounded px-2"/>
                                {errors.password?.type === "required" && 
                                    <p className="text-red-button text-sm animate-bounce h-3">Password is required</p>
                                }
                            </div>
                            <button className="bg-blue-button text-white p-[6px] px-3 cursor-pointer rounded-md" disabled={load}>
                                {
                                    load ? 
                                    <span>
                                        <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                                        Signing
                                    </span>
                                    : "Sign in"
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
