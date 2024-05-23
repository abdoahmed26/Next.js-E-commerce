import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:any) {
    let body = await req.json();
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: `${body.email}`,
            subject: 'Orders From Abdo Ecommerce',
            react: EmailTemplate({...body}),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}