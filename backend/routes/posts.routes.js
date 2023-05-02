const express=require('express');
const jwt = require('jsonwebtoken');
const PostModel = require('../model/Post.model');


const postRouter=express.Router();

postRouter.post('/create',async(req,res)=>{
    try {
        const post=new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":'new post created'});
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

postRouter.get('/',async(req,res)=>{
    try {
        const posts=await PostModel.find({authorID:req.body.authorID})
        res.status(200).send(posts);
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

postRouter.patch('/update/:postID',async(req,res)=>{
    try {
        await PostModel.findByIdAndUpdate({_id:req.params.postID},req.body);
        res.status(200).send('Updated')
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

postRouter.delete('/delete/:postID',async(req,res)=>{
    try {
        await PostModel.findByIdAndDelete({_id:req.params.postID});
        res.status(200).send('Deleted')
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
});

module.exports=postRouter;