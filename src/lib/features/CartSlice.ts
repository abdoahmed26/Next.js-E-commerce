import { createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteAllCart, deleteCart, getCart, updateCart } from "../../../actions/userActions";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity:number;
}


const CartSlice:any = createSlice({
    name:"CartSlice",
    initialState:[],
    reducers:{
        addProduct : (state:IProp[],action)=>{
            const userId = localStorage.userToken;
            const pro = state.find((ele:IProp)=> ele.id===action.payload.id);
            if(pro){
                pro.quantity+=1;
                const update = async()=> {
                    const getPros = await getCart(userId);
                    const produc:any = getPros.find((ele:any)=>ele.id===action.payload.id);
                    const quant = produc.quantity + 1;
                    await updateCart(quant,userId,produc.ID)
                }
                update();
            }
            else {
                const product:IProp = {...action.payload,quantity:1}
                const add = async()=> await addToCart(product,userId)
                add();
                state.push(product)
            }
        },
        deleteProduct : (state:any,action:{payload:any,type:string})=>{
            const userId = localStorage.userToken;
            const deletePro = async()=> {
                const getPros = await getCart(userId);
                const produc:any = getPros.find((ele:any)=>ele.id===action.payload.id);
                console.log(produc)
                await deleteCart(produc.ID,userId)
            }
            deletePro();
            state = state.filter((ele:IProp)=> ele.id!==action.payload.id);
            return state;
        },
        deleteAll :(state)=>{
            const userId = localStorage.userToken;
            const deletAll = async()=> await deleteAllCart(userId)
            deletAll();
            return [];
        },
        increment : (state:IProp[],action)=>{
            const userId = localStorage.userToken;
            const pro = state.find((ele:IProp)=> ele.id===action.payload.id);
            if(pro){
                pro.quantity+=1;
                const update = async()=> {
                    const getPros = await getCart(userId);
                    const produc:any = getPros.find((ele:any)=>ele.id===action.payload.id);
                    const quant = produc.quantity + 1;
                    await updateCart(quant,userId,produc.ID)
                }
                update();
            }
        },
        decrement : (state:IProp[],action)=>{
            const userId = localStorage.userToken;
            const pro = state.find((ele:IProp)=> ele.id===action.payload.id);
            if(pro){
                pro.quantity >0 ?  pro.quantity -=1 : pro.quantity =0;
                const update = async()=> {
                    const getPros = await getCart(userId);
                    const produc:any = getPros.find((ele:any)=>ele.id===action.payload.id);
                    const quant = produc.quantity > 0 ?  produc.quantity - 1 : 0;
                    await updateCart(quant,userId,produc.ID)
                }
                update();
            }
        },
        getProducts : (state:IProp[],action)=>{
            if(state.length < action.payload.length){
                state.push(...action.payload);
            }
        }
    }
})

export const { addProduct, deleteProduct, deleteAll, increment, decrement , getProducts} = CartSlice.actions

export default CartSlice.reducer