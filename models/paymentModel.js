const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
  orderId:{
    type:mongoose.Schema.Types.ObjectId,
        ref: 'checkouts',
        required: true
  },
  pay_type:{
    type:String,
    enum:["COD","Card","Jazzcash"],
    required:true
  },
  paid_at:{
    type:Date
  },
  pay_status:{
    type:String,
    enum:["Paid","Unpaid"]
  }
})
module.exports=mongoose.model("payment",paymentSchema);