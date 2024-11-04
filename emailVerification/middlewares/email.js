require('dotenv').config({path:'../.env'});
const {transporter} = require('./email.config.js');


async function sendVerificationEmail(email,verificationcode) {
    // send mail with defined transport object
    try {
    const info = await transporter.sendMail({
        from: '"OmPatel" <process.env.EMAILFV>', // sender address
        to: email, // list of receivers
        subject: "Verify Your Email", // Subject line
        text: "Verify Your Email", // plain text body
        html: "<h1>"+verificationcode+"</h1>", // html body
    });

    console.log("Message sent: ");

    }catch (error){
        console.log('email error '+error);
    }
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

async function sendWelcomeEmail(email,name){
    try{
        const response = await transporter.sendMail({
            from: '"OmPatel" <process.env.EMAILFV>', // sender address
            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: "<h1>Welcome Email</h1>", // html body
        });
        console.log("Message sent: ");

    }catch (e) {
        console.log('error at welcome = '+e)
    }
}

module.exports = {
    sendVerificationEmail,
    sendWelcomeEmail
}