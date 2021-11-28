/** @format */

const router = require("express").Router();
const Category = require("../../models/Categories");
const { check, validationResult } = require("express-validator");
const { verifyTokenAndAdmin, verifytoken } = require("../../middleware/auth");
const User = require("../../models/Users");
const Products = require("../../models/Products");
//Router api/categories
router.post(
  "/",
  [
    verifyTokenAndAdmin,
    [
      check("title_en", "This Field Is Reuired").not().isEmpty(),
      check("description", "Please Enter The Description").not().isEmpty(),
      check("price", "Price Is Required").not().isEmpty()
      ,
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }
    const { title_en, description, price, color, size, inStock, categoryId } = req.body;
    try {
      const user = await User.findById(req.user._id);
      const cat = await Category.findById(categoryId)
      const product = new Products({
        title_en,
        description,
        price,
        color,
        size,
        inStock,
        categoryId,
        categoryTitle:cat.title,
        user: user._id,
        name: user.username,
      });
      await product.save();
      res.json(product);
    } catch (error) {
      console.log(error)
      res.status(500).send("Server Error");
    }
  }
);
//Router Put api/categories/id
//Edit Category title
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(500).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//GET Product By ID
router.get("/:id", verifytoken,async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//GET AL Products
router.get("/", async (req, res) => {
  try {
    const product = await Products.find().sort({ createdAt: -1 });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
