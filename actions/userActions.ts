"use server";

import { PrismaClient } from '@prisma/client';

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity:number;
}

const prisma = new PrismaClient()

export const getUser = async()=>{
    return await prisma.user.findMany()
}

export const createUser = async(data:{username:string,email:string,password:string})=>{
    return await prisma.user.create({
        data,
    })
}
export const findUserAuth = async()=>{
    return await prisma.userAuth.findMany()
}

export const createUserAuth = async(data:{username:string,email:string,image:string})=>{
    return await prisma.userAuth.create({
        data,
    })
}

export const getCart:any = async(userId:string)=>{
    return await prisma.cart.findMany({
        where :{
            userId : userId
        }
    })
}

export const addToCart = async(product:IProp,userId:string)=>{
    return await prisma.cart.create({
        data : {...product, userId:userId},
    })
}

export const updateCart = async(quantity:number,userId:string,ID:string)=>{
    return await prisma.cart.update({
        data : {
            quantity,
        },
        where : {
            ID,
            userId,
        }
    }
    )
}

export const deleteCart = async(ID:string,userId:string,)=>{
    return await prisma.cart.delete({
        where: {
            ID,
            userId,
        },
    }
    )
}

export const deleteAllCart = async(userId:string)=>{
    return await prisma.cart.deleteMany({
        where:{
            userId,
        }
    })
}

export const addtoOrder = async(orders:any[])=>{
    return await prisma.order.createMany({
        data:orders,
    })
}

export const getOrder = async(userId:string)=>{
    return await prisma.order.findMany({
        where : {
            userId,
        }
    })
}