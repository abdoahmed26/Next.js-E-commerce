import { addition } from "@/functions/AddToCartFn";
import { RootState } from "@/lib/store";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

interface IProp {
    id : string;
    productImg : string;
    title:string;
    description:string;
    price:number;
}

const AddToCartButton = ({product}:{product:IProp}) => {
    const user:any = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    
    return (
        <button onClick={()=>addition(dispatch,product)} disabled={user.role==="admin" ? true : false}
            className="bg-blue-button text-white p-2 rounded flex items-center gap-1">
            <FontAwesomeIcon icon={faCartShopping} className="w-[18px] h-[18px]"/>
            <span className="text-[13px]">Add To Cart</span>
        </button>
    );
}

export default AddToCartButton;
