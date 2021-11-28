const  {verifytoken , verifyAuthorization, verifyTokenAndAdmin}  = require('../../middleware/auth')
const router = require('express').Router()
const bcrypt =require('bcrypt');
const User = require('../../models/Users');

    
//UPDATE
router.put('/:id' ,verifyAuthorization ,async (req,res)=>{
    if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         }
         try {
             const updateUser = await User.findByIdAndUpdate(req.params.id , {
                 $set : req.body
             }, {new :true})
             res.status(200).json(updateUser)
         } catch (error) {
             res.status(500).send("Server Error")
         }
        
} )

//DELETE USER BY ID
router.delete('/:id' , verifyAuthorization,async (req,res)=>{
  try {
      await User.findByIdAndDelete({_id:req.params.id})
      res.status(401).json("User IS Deleted Successfuly")
  } catch (error) {
      res.status(500).send("Server Error")
  }
})

//GET ALL USERS 
router.get('/' , verifyTokenAndAdmin ,async (req,res)=>{
    try {
      const user = await User.find().sort({createdAt:-1})

      res.status(400).json(user)
    } catch (error) {
      res.status(500).send("Server Error")
    }
})

//GET USER BY ID
router.get('/me' ,verifytoken,async (req,res)=>{
    try {
      res.status(200).json(req.user)
    } catch (error) {
      res.status(500).send("Server Error")
    }
})
module.exports = router
