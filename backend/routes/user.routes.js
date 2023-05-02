const express=require('express');
const UserModel = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRouter=express.Router();

userRouter.post('/register',async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            const user =new UserModel({name,email,gender,password:hash});
            await user.save();
            res.status(200).send({"msg":"registered successfully"});
        });
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password , async function(err, result) {
                if(result){
                    const token=jwt.sign({authorID:user._id,author:user.name},'secretKey');
                    res.status(200).send({"msg":'login successfull',"token":token});
                }else{
                    res.status(200).send({"msg":'wrong password'});
                }
            });
        }else{
            res.status(200).send({"msg":'wrong email'});
        }
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

module.exports=userRouter;