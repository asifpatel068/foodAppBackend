const express=require("express");
const { OrderModel } = require("../Model/orderModel");

const orderRouter=express.Router();

orderRouter.post("/",async(req,res)=>{
    let data=req.body
    try{
        const rest=OrderModel(data)
        await rest.save()
        console.log(rest)
        res.status(201).send("Successfully placed order")
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

orderRouter.get("/",async(req,res)=>{
    const q=req.query
    try{
        const rest=await OrderModel.find(q)
        res.status(200).send(rest)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

orderRouter.patch("/:id",async(req,res)=>{
    const id=req.params.id
    const data=req.body
    try{
        const rest=await OrderModel.findByIdAndUpdate({_id:id},data)
        res.status(200).send("Order updated Successfully")
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})


orderRouter.get("/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const rest=await OrderModel.findOne({_id:id})
        res.status(200).send(rest)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})



module.exports={
    orderRouter
}