"use client"
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtoOrder, getCart } from '../../actions/userActions';
import { deleteAll } from '@/lib/features/CartSlice';

const CheckoutForm = ({amount}:{amount:number}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);

    const handleSubmit = async(event:any) => {
        setLoad(true)
        // create order
        createOrder()
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        const handleError = (error:any) => {
            setLoading(false);
            setErrorMessage(error.message);
        }

        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        const res = await fetch("api/create-intent",{
            method:"POST",
            body:JSON.stringify({
                amount:amount
            })
        })
        const clientSecret = await res.json()
        const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
            clientSecret,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-confirm",
            },
        });

        if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    const dispatch = useDispatch()
    const createOrder = async()=>{
        const pros = await getCart(localStorage.userToken);
        await addtoOrder(pros);
        dispatch(deleteAll())
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className='bg-blue-button text-white p-2 rounded mt-4' disabled={load}>
                {
                    load ? 
                        <span>
                            <span className="inline-block w-[14px] h-[14px] rounded-full border border-white border-l-gray-500 animate-spin mr-1"></span>
                            Submiting
                        </span>
                    : <>
                        <span>Submit</span>
                    </>
                }
            </button>
        </form>
    );
};

export default CheckoutForm;