const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
    
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:"AliAlouch"
    },
    coverPicture:{
        type:String,
        default:"AliAlouch"
    },
    followers:{
        type:Array,
        default:[],

    },
Following:{
            type:Array,
        default:[],

    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String ,
        max:50,
    },
    city:{
        type:String,
        max:50,
    },
    from:{
        type:String,
        max:50,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
{timestamps:true}
)
module.exports=mongoose.model("User",userSchema)