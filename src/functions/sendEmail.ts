import axios from "axios";
import { getOrder, getUser } from "../../actions/userActions";

let amount=0;
export const sendEmail = async()=>{
    const orders = await getOrder(localStorage.userToken);
    orders.map((ele:any)=>amount +=ele.price*ele.quantity);
    const users = await getUser();
    const repeatUser:any = users.find((ele:any)=>ele.id===localStorage.userToken);
    const data = {
        email:repeatUser?.email,
        username:repeatUser?.username,
        amount:amount,
        orders:orders,
    }
    axios.post("api/send-email",data).then(res=>res)
}