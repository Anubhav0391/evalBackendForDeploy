const jwt= require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        try {
            const decoded=jwt.verify(token.split(' ')[1],'secretKey');
            if(decoded){
                req.body.author=decoded.author;
                req.body.authorID=decoded.authorID;
                next();
            }else{
                res.send({"msg":"Please login first"});
            }
        } catch (err) {
            res.status(400).send({"err":err.message})
        }
    }else{
        res.send({"msg":"Please login first"})
    }
}

module.exports=auth;