import mongoose,{Schema} from "mongoose";

const expensesSchema = new Schema({


user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
},
category:{
    type: String,
    required: true,

},

amount:{
    type: Number,
    required: true,
    
},

date:{
    type: Date,
    default: Date.now,
}



},{timestamps:true})


const Expense = mongoose.model("Expense",expensesSchema)

export default Expense