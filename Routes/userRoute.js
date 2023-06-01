const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Model/userModel");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body;
    try{
        const userExits=await UserModel.findOne({email});
        if(userExits){
            return res.status(403).send({message:"User Already Exits"})
        }

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.status(500).send({message:err.message})
            }
            try{
                const user=new UserModel({name,password:hash,email,address});
                await user.save()
                return res.status(201).send({message:"User Successfully Registered"})
            }catch(err){
                return res.status(500).send({message:err.message})
            }
        })
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(403).send({message:"User not registered"})
        }
        const hash=user?.password
        bcrypt.compare(password,hash,async(err,result)=>{
            if(err){
                return res.status(500).send({message:err.message})
            }
            if(!result){
                return res.status(500).send({message:"Wrong Credentials"})
            }
            const token=jwt.sign({name:user.name,id:user._id},"NORMAL");
            return res.status(201).send({message:"Successfully LoggedIN",token,userId:user._id})
        })

    }catch(err){
        return res.status(500).send({message:err.message})
    }
})



userRouter.patch("/:id/reset",async(req,res)=>{
    const id=req.params.id;
    const {password,newPassword}=req.body
    try{
        const user=await UserModel.findOne({_id:id});
        if(!user){
            return res.status(403).send({message:"User Doesn't Exits"})
        }

        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err){
                return res.status(500).send({message:err.message})
            }
            if(!result){
                return res.status(500).send({message:"Wrong Credentials"})
            }
         
            bcrypt.hash(newPassword,5,async(err,hash)=>{
                if(err){
                    return res.status(500).send({message:err.message})
                }
                try{
                    const user=await UserModel.findByIdAndUpdate({_id:id},{password:hash});
                   console.log(user)
                    return res.status(201).send({message:"User Password Updated Successfully"})
                }catch(err){
                    return res.status(500).send({message:err.message})
                }
            })
        })

    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


module.exports={
    userRouter
}