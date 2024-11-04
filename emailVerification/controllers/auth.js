const User = require('../models/User')
const bcrypt = require('bcryptjs');
const {sendVerificationEmail, sendWelcomeEmail} = require("../middlewares/email");

async function handleRegister(req,res){
    try {
        const {email,password,name} = req.body;
        console.log(req.body)
        if (!email || !password || !name){
            console.log(email,password,name);
            return res.status(400).json({success:false,message:"enter all details"})
        }
        const existUser = await User.findOne({email});
        if (existUser){
            return res.status(400).json({success:false,message:"user already exists"});
        }
        const hashPassword = await bcrypt.hashSync(password,10)
        const verificationToken = Math.floor(1000+Math.random()*9000).toString();
        const user = new User({
            email,
            password:hashPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        });

        await user.save();
        await sendVerificationEmail(email,verificationToken);
        return res.status(200).json({success:true,message:"User Registered succesfully"})

    }catch (e) {
        console.log('error at handleRegister',e);
    }
}

async function verifyEmail(req,res){
        try {
            const {code} = req.body;
            console.log(code);
            const user = await User.findOne({
                verificationToken:code,
                verificationTokenExpiresAt:{$gt:Date.now()}
            })
            

            if (!user){
                return res.status(400).json({ success: false, message: 'User not exist or token expired' });
            }
            user.isVerified = false;
            user.verificationToken = undefined;
            user.verificationTokenExpiresAt = undefined;
            await user.save();
            await sendWelcomeEmail(user.email,user.name);
            return res.status(200).json({success:true,message:"Email Verifed Successfully"})
        }catch (error){
            console.log('verifyEmail error ',error);
        }
}

module.exports ={
    handleRegister,
    verifyEmail
}