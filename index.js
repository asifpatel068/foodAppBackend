const express=require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Routes/userRoute")
const { restRouter } = require("./Routes/restaurantRouter")
const { orderRouter } = require("./Routes/orderRouter")

const app=express()
const port=3500

app.use(express.json())

app.post("/",(req,res)=>{
    res.send("Welcome to Home page")
})

app.use("/user",userRouter)
app.use("/restaurants",restRouter)
app.use("/orders",orderRouter)

app.listen(port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
        console.log("Not Connected to DB")
    }
    console.log(`Server is running at port ${port}`)
})