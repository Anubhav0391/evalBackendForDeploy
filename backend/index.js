const express=require('express');
const connection = require('./db');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/posts.routes');
const auth = require('./middleware/authMW');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use('/users',userRouter);
app.use(auth);
app.use('/posts',postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log('connected to db')
    } catch (error) {
        console.log(error);
    }
})