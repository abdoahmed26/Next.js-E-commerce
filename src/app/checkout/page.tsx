"use client"
import CheckoutForm from '@/components/CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE!);

const Search = () => {
    const search = useSearchParams();
    const options:any = {
        mode : "payment",
        currency : "usd",
        amount : Number(search.get("amount")),
    }
    return (
        <div className='mt-24 md:mt-20 bg-bodyBG min-h-[83vh] py-10 flex justify-center items-center'>
            <div className='container'>
                <div className=''>
                    <div className='max-w-[500px] mx-auto'>
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm amount={Number(search.get("amount"))}/>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Checkout = ()=>{
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Search />
        </Suspense>
    )
}

export default Checkout;