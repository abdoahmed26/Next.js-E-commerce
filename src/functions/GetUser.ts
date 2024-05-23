import { getUserSlice } from "@/lib/features/UserSlice";
import { getCart, getUser } from "../../actions/userActions";
import { getProducts } from "@/lib/features/CartSlice";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
    quantity?:number;
}

export const getName = async(dispatch:any)=>{
    if(localStorage.userToken){
        const users = await getUser();
        const repeatUser:any = users.find(ele => ele.id===localStorage.userToken);
        // console.log(repeatUser)
        dispatch(getUserSlice(repeatUser))
        const pros:IProp[] = await getCart(localStorage.userToken);
        dispatch(getProducts(pros));
    }
}