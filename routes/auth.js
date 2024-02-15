const router=require("express").Router()
const User=require("../models/user")
const bcrypt=require("bcrypt")

router.post('/register',async (req,res)=>{

    try{
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(req.body.password,salt)
        const usere=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword,
    
    
        })
   await usere.save()
   res.status(200).send("Okay")
    }
    catch(err){
        console.log("{Error occured")
    }

})
//login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
       
        if (!user) 
            return res.status(404).json("User not found");

        const validPassword = (req.body.password==user.password)?1:0
        if (!validPassword) 
            return res.status(400).json("Wrong password");

        res.status(202).json(user);
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
});



module.exports=router