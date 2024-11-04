require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const authRouter = require('./routes/auth.routes');
const port = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODBURL)
    .then(()=>{
        const app = express();
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(express.json());
        app.use('/',authRouter);
        app.listen(port,()=>{
            console.log(`server is running at ${port}`);
        })
    })
    .catch((error)=>{
        console.log(`connection failed `+error)
    })

