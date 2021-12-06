const mongoose = require("mongoose");
const { verifyAuthorization } = require("../middleware/auth");
const blogSchema = mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  title:{
      type:String
  },
  description:{
      tpye:String
  },
  image:{
      type:String,
      default:""
  }, 
},
{timestamps:true}
)

module.exports = mongoose.model('Blog' , blogSchema)