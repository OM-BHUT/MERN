require('dotenv').config({path:'../.env'});
const router = require('express').Router();
const passport = require('passport');


// Google login route
router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"]
}));


router.get('/login/success',(req,res)=>{
    if (!req.user){
        return res.status(400).json({error:true,message:'Not Authorized'});
    }
    return res.status(200).json({
        error:false,
        message:'Successfully logged in',
        user:req.user
    })
})

router.get('/user',(req,res)=>{
    if (!req.user){
        return res.status(401).json({error:'Not authenticated'})
    }
    return res.status(200).send(req.user);
})


router.get('/login/failed',(req,res)=>{
    return res.status(400).json({
        error:true,
        message:'Log in Failure'
    })
})

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL+"user", // Redirect to your frontend after successful login
    failureRedirect: '/api/auth/login/failed' // Handle failed login attempt
}));

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if (err){
            return next(err);
        }
    return res.redirect(process.env.CLIENT_URL);
    });
})


module.exports = router;