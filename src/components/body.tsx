import React from 'react';

const Body = () => {
    return (
        <div className='bg-cover h-[100vh] flex justify-center' style={{backgroundImage:`url(./bac.jpg)`}}>
            <div className='container'>
                <div className='flex items-center h-full'>
                    <div>
                        <h1 className='text-bodyFont text-2xl'>LIFESTYLE COLLECTION</h1>
                        <div className='text-bodyFont text-3xl font-bold py-2'>
                            <p className='pb-2'>MEN</p>
                            SALE UP TO <span className='text-red-button'>30% OFF</span>
                        </div>
                        <p className='text-bodyFont text-xl mb-3'>
                            Get Free Shipping on orders over $99.00
                        </p>
                        <button className='bg-black text-white p-2 px-4 text-sm rounded'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;