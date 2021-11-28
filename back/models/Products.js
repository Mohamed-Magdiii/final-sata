const mongoose = require("mongoose");
const ProductShema = mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    title_en: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    username:{
      type:String,
    },
    categoryId: {
      type: String,
      ref: "Category",
    },
    categoryTitle:{
      type:String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    color: {
      type: Array,
    },
    size: {
      type: Array,
    },

    inStock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Products", ProductShema);
