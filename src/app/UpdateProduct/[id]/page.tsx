import UpdateProd from "@/components/UpdateProd";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Update Product Page",
};
async function getData(id:string) {
    const res = await fetch(`https://apiforproducts.onrender.com/products/${id}`,{ cache: 'no-store' })
    if (!res.ok) {
        console.log('Failed to fetch data')
    }

    return res.json()
}

interface IProp{
    params : {
        id:string
    }
}

const Page = async({params}:IProp) => {
    const product = await getData(params.id);
    return (
        <div className="mt-24 sm:mt-20">
            <div className="bg-bodyBG min-h-[83vh] py-10 flex justify-center items-center">
                <div className="container">
                    <div>
                        <UpdateProd product={product}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
