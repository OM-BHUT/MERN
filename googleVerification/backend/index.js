require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('./passport');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const auth = require('./routes/auth.js')
const Users = require('./models/Users');

mongoose.connect(process.env.DBURI)
    .then(()=>{
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 } // Configured session expiration
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:"GET,POST,PUT,DELETE",
        credentials:true
    })
)


app.use('/api/auth',auth)

app.listen(8080,()=>{
    console.log(`server is listening at 8080`);
})

    })
    .catch((error)=>{
        console.log(`error `,error);
    })

