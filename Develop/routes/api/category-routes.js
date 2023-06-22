const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get all categories with associated products
router.get("/", async (req, res) => {
  try {
    // be sure to include its associated Products
    const categories = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId, {
      include: { model: Product }, // be sure to include its associated Products
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (updatedRows > 0) {
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;