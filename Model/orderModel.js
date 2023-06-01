const {Schema,default:mongoose}=require("mongoose");

const orderSchema=new Schema({

    user : { 
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    },
    restaurant : { 
        type: Schema.Types.ObjectId, 
        ref: 'restaurant'
     },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {
        type:String,
        default:"placed",
        enum:["placed", "preparing", "on the way", "delivered"]
    } 
      
},{
    versionKey:false
})

const OrderModel=mongoose.model("order",orderSchema)

module.exports={
    OrderModel
}