/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';
import { sendEmail } from '@/functions/sendEmail';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const Page = () => {
    const user:any = useSelector((state:RootState) => state.user);
    useEffect(()=>{
        sendEmail(user);
    },[user?.email])
    return (
        <div className='mt-24 md:mt-20 bg-bodyBG min-h-[83vh] py-10 flex justify-center items-center'>
            <div className="container">
                <div className='flex flex-col items-center justify-center px-5 mt-4'>
                    <Image src='/verified.gif'
                        alt='check'
                        width={130}
                        height={130}
                        className="rounded-full"
                    />
                    <h2 className='text-[24px] mt-2'>Payment Successful !</h2>
                    <h2 className='text-[17px] text-center mt-6 text-gray-500'>We sent an email with your
                        order confirmation
                        along with Digital Content</h2>
                    <Link
                        href="/"
                        className='p-2 mt-6 text-white rounded bg-blue-button'>
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
