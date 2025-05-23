import categoryModel from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name, image } = req.body;
        
        if (!name) {
            return res.json({error: "Name Field is Empty"})
        }
        if (!image) {
            return res.json({error: "Image Field is Empty"})
        }

        const existingCategory = await categoryModel.findOne({ name })

        if (existingCategory) {
            return res.json({error: "Category Already Exists"})
        }

        const category = await new categoryModel({name, image}).save();
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name, image } = req.body;
        const { categoryId } = req.params;

        const category = await categoryModel.findOne({_id: categoryId})

        if (!category) {
            return res.status(404).json({error: "Category Not Found"})
        }

        category.name = name;
        category.image = image;

        const updatedCategory = await category.save()
        res.json(updatedCategory)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await categoryModel.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
})

const allCategory = asyncHandler(async (req, res) => {
    try {
        const all = await categoryModel.find({});
        res.json(all);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await categoryModel.findOne({ _id: req.params.id})
        res.json(category);
    }
    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export { createCategory, updateCategory, removeCategory, allCategory, readCategory };