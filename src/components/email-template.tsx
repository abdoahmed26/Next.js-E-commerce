import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import { Tailwind } from "@react-email/tailwind";

interface IProp {
    email:string;
    username: string;
    amount:number,
    orders:any[],
}

export const EmailTemplate = ({email,username,amount,orders}:IProp) => {
    return(
        <Html>
            <Head />
            <Preview>
                The Ecommerce Platform For Yout Digital Products search now for your future
            </Preview>
            <Tailwind>
                <Body>
                    <Container>
                        <Text style={paragraph}>Hi {username},</Text>
                        <Text style={paragraph}>Thank you purchasing on Abdo Ecommerce.</Text>
                        <Text style={paragraph}>Your Orders : </Text>
                        <Section>
                            {orders.map((ele:any,index:number)=>
                                <Section key={index}>
                                    <Text style={paragraph}>{index+1}</Text>
                                    <Section>
                                    <Img
                                        src={`${ele.productImg}`}
                                        width="150"
                                        height="150"
                                        alt={ele.title}
                                        />
                                        <Text style={paragraph}>{ele.title}</Text>
                                        <Text style={paragraph}>Quantity : {ele.quantity}</Text>
                                        <Text style={paragraph}>Price : ${ele.price*ele.quantity}</Text>
                                    </Section>
                                </Section>
                            )}
                        </Section>
                        <Text style={paragraph}>Total : ${amount}</Text>
                        <Text style={paragraph}>Best wishes,</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
)}


const paragraph = {
    fontSize: "16px",
    lineHeight: "5px",
};