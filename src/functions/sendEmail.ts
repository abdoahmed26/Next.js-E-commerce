import emailjs from '@emailjs/browser';

export const sendEmail = async(user:any)=>{
    const data = {
        name : user.username,
        team : "Abdo E-Commerce",
        email : user.email,
    }
    const serviceId = "service_8c8ja39";
    const templateId = "template_9ao5ect";
    const publicKey = "oo_nwc5PfiwLC9n_5";
    emailjs.send(serviceId, templateId, data, publicKey)
    .then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error);
    });
}