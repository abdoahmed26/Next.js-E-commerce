import { getProducts } from "@/lib/features/CartSlice";
import { createUserAuth, findUserAuth, getCart } from "../../actions/userActions"
import { getUserSlice } from "@/lib/features/UserSlice";
import Cookie from "cookie-universal"

export const getUserAuth = async(dispatch:any,data:{name:string, email:string,image:string})=>{
    const users = await findUserAuth()
    const repeatUser:any = users.find(ele => ele.email===data?.email && ele.username === data?.name && ele.image === data?.image);
    const cookie = Cookie()
    if(repeatUser){
        localStorage.userToken = repeatUser.id;
        cookie.set("userToken",repeatUser.id)
        dispatch(getUserSlice(repeatUser))
        const pros = await getCart(localStorage.userToken);
        dispatch(getProducts(pros));
    }
    else{
        const newUser = await createUserAuth({username:data?.name,email:data?.email,image:data?.image});
        // console.log(newUser)
        localStorage.userToken = newUser.id;
        cookie.set("userToken",newUser.id)
        dispatch(getUserSlice(newUser))
    }
}