import Link from "next/link";
import Image from "next/image";

const EmptyCart = () => {
    return (
        <div className="bg-bodyBG min-h-[83vh] flex justify-center items-center">
            <div className="container h-full">
                <div>
                    <div className='flex justify-center items-center h-full'>
                            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-2 flex-col items-center rounded-md 
                            shadow-lg">
                                <h2 className='text-black font-titleFont font-bold text-xl'>
                                    YOUR CART FEELS LONELY.
                                </h2>
                                <p className='text-center text-sm font-bodyFont sm:px-10'>
                                    Your Shopping cart lives to serve. Give it purpose - fill it with books, 
                                    electronics, videos, etc. and make it happy.
                                </p>
                                <div className='mt-3'>
                                    <Link href={"/"}
                                    className='px-5 py-2 bg-black opacity-80 text-white font-bodyFont
                                    rounded font-bold hover:opacity-100 duration-300'>
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyCart;
