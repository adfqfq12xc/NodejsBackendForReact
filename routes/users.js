const router=require("express").Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")



//update 
router.put("/:id",async(req,res)=>{
    if(req.body.userid==req.params.id ){
if(req.body.password){
    try{
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt)
    }catch(err){
        return res.send("ewew")

    }
}
    try{
        const user=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        })
       return res.send("aCCOUNT HAS BEEN UPDATED")
    }catch(err){
      return  console.log(err)
    }
}

    else{
        return res.status(403).json("you can update your account")
    }
})
//delete user
router.delete("/:id",async(req,res)=>{
    if(req.body.userid==req.params.id ){

    try{
        const user=await User.findByIdAndDelete(req.params.id)
       return res.send("aCCOUNT HAS BEEN deleted")
    }catch(err){
      return  console.log(err)
    }
}

    else{
        return res.status(403).json("you can delete your account")
    }
})

//get a user
router.get("/",async(req,res)=>{
    const userid=req.query.userid
    const username=req.query.username
    try{
        const user=userid?await User.findById(userid):
        await User.findOne({username:username})
        const { password, ...other } = user._doc;
        res.status(200).json(other)
    }catch(err){
        console.log(err) 
    }

})
//get all user 
//follow
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userid!==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentuser=await User.findById(req.body.userid)
            if(!user.followers.includes(req.body.userid)){
                await user.updateOne({$push:{followers:req.body.userid}})
                await currentuser.updateOne({$push:{Following:req.params.id}})
               return res.send("user have been followed")

            }else{
                res.send("already followed")
            }

        }catch(err){
console.log("dsdsdsds")
        }

    }else {
        res.send("you cant follow yourself")
    }
})
//unfollow
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userid!==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentuser=await User.findById(req.body.userid)
            if(user.followers.includes(req.body.userid)){
                await user.updateOne({$pull:{followers:req.body.userid}})
                await currentuser.updateOne({$pull:{Following:req.params.id}})
               return res.send("user have been unfollowed")

            }else{
                res.send("already unfollowed")
            }

        }catch(err){
console.log("dsdsdsds")
        }

    }else {
        res.send("you cant unfollow yourself")
    }
})

module.exports=router
