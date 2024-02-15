const router=require("express").Router()
const Post=require("../models/post")
const User=require("../models/user")
router.get("/",(req,res)=>{
    res.send("its posts page")
})
//create a poste
router.post("/",async(req,res)=>{
    const newpost=new Post(req.body)
        try{
const savedpost=await newpost.save()
res.send(savedpost)

        }catch(err){
            res.send(err)
        }
    
})

router.get("/i/:id",async(req,res)=>{
    const user=await User.findById(req.params.id) 
        try{
            res.send(user)


        }catch(err){
            res.send(err)
        }
    
})
router.put("/:id",async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
    if(post.userid===req.body.userid){
       await post.updateOne({$set:req.body}) 
       res.send("the post has been updatetd")

    }else{
        res.send("you can update only your posts")
    }
}catch(err){
    res.send(err)
}
})
//update a poste
//delete a poste
router.delete("/:id",async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
    if(post.userid===req.body.userid){
       await post.deleteOne() 
       res.send("the post has been deleted")

    }else{
        res.send("you can delete only your posts")
    }
}catch(err){
    res.send(err)
}
})
//like a poste
router.put("/:id/like",async (req,res)=>{
    try{
    const post=await Post.findById(req.params.id)
    if(!post.likes.includes(req.body.userid)){
       await post.updateOne({$push:{likes:req.body.userid}}) 
       res.send("the post has been liked")

    }else{
        await post.updateOne({$pull:{likes:req.body.userid}}) 
        res.send("the post has been disleked")
    }
}catch(err){
    res.send(err)
}
})
//get a poste
router.get("/:_id",async (req,res)=>{
    try{
    const post=await Post.findById(req.params._id) 
       res.json(post)     
       }catch(err){
          res.send()
 }
})
//get timeline posts
router.get("/timeline/:id",async (req,res)=>{

     try{
        const curr=await User.findById(req.params.id)
        const userposts=await Post.find({userid:curr._id})
        const freindpost=await Promise.all(
            curr.Following.map(friendid=>{
              return  Post.find({userid:friendid})
            })
        )
        res.send(userposts.concat(...freindpost))
       }catch(err){
          res.send(err)
 }
})
router.get('/profile/:username',async (req,res)=>{
   try{
    const user=await User.findOne({username:req.params.username})
    const post=await Post.find({userid:user._id})
    res.send(post)
   }catch(erR){
    console.log(erR)

   }

})
module.exports=router