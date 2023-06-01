const express=require("express");
const { RestaurantModel } = require("../Model/restaurantModel");

const restRouter=express.Router();

restRouter.post("/",async(req,res)=>{
    let data=req.body
    try{
        const rest=RestaurantModel(data)
        await rest.save()
        console.log(rest)
        res.status(201).send("Restaurant Details added Successfully")
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

restRouter.get("/",async(req,res)=>{
    const q=req.query
    try{
        const rest=await RestaurantModel.find(q)
        res.status(200).send(rest)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

restRouter.get("/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const rest=await RestaurantModel.findOne({_id:id})
        res.status(200).send(rest)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

// ---menu
restRouter.get("/:id/menu",async(req,res)=>{
    const id=req.params.id
    try{
        const rest=await RestaurantModel.findOne({_id:id})
        res.status(200).send(rest.menu)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

restRouter.delete("/:id/menu/:mid",async(req,res)=>{
    const id=req.params.id
    const mid=req.params.mid

    try{
        const rest=await RestaurantModel.findOne({_id:id})
         rest.remove({"menu._id":mid})
        console.log(rest)
        res.status(200).send("Menu del Successfully")
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

restRouter.put("/:id/menu",async(req,res)=>{
    const id=req.params.id
    const newMenu=req.body
    try{
        const rest=await RestaurantModel.findOne({_id:id})

        const update=await RestaurantModel.findByIdAndUpdate({_id:id},{menu:[...rest.menu,newMenu]})
        console.log(update)
        res.status(200).send("Menu updated Successfully")
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

module.exports={
    restRouter
}