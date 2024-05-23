import { ReactNode } from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Confirm Page",
};

const Page = ({children}:{children:ReactNode}) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default Page;
