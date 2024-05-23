import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalProduct from "./localProduct";

const Products = () => {
    return (
        <div className="py-10 bg-bodyBG flex justify-center">
            <div className="container">
                <h1 className="text-bodyFont font-bold text-3xl flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheck} />
                    <p>Recommended for you</p>
                </h1>
                <div className="pt-5">
                    <LocalProduct/>
                </div>
            </div>
        </div>
    );
}

export default Products;