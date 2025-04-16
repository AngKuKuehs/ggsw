import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price, category, quantity, brand, image} = req.fields;

        switch (true) {
            case !name:
                return res.json({error: "Name field is empty"});
            case !description:
                return res.json({error: "Description field is empty"});
            case !price:
                return res.json({error: "Price field is empty"});
            case !category:
                return res.json({error: "Category field is empty"});
            case !quantity:
                return res.json({error: "Quantity field is empty"});
            case !brand:
                return res.json({error: "Brand field is empty"});
            case !image:
                return res.json({error: "Image field is empty"});
        }

        const product = new Product({...req.fields});
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price, category, quantity, brand, image} = req.fields;

        switch (true) {
            case !name:
                return res.json({error: "Name field is empty"});
            case !description:
                return res.json({error: "Description field is empty"});
            case !price:
                return res.json({error: "Price field is empty"});
            case !category:
                return res.json({error: "Category field is empty"});
            case !quantity:
                return res.json({error: "Quantity field is empty"});
            case !brand:
                return res.json({error: "Brand field is empty"});
            case !image:
                return res.json({error: "Image field is empty"});
        }

        const product = await Product.findByIdAndUpdate(req.params.id, {...req.fields}, {new: true});
        await product.save();
        res.json(product);
        
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const removeProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const getProducts = asyncHandler(async (req, res) => {
    try { 
        const pageSize = 10;
        const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}} : {};
        const count = await Product.countDocuments({...keyword});
        const products = await Product.find({...keyword})

        res.json({products, page: 1, pages: Math.ceil(count / pageSize), hasMore: count > pageSize});
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.json(product);
        }
        else {
            return res.status(404).json({error: "Product not found"});
        }
    }
    catch (error) {
        console.error(error);
        res.status(404).json({error: "Product not found"});
    }
})

const addProductReview = asyncHandler(async (req, res) => {
    try {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }

        //We don't let the user review the product more than once, should we let them do more than once?
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            return res.status(400).json({error: "Product already reviewed"});
        }
        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({message: "Review added"});
    }
    catch {
        console.error(error);
        res.status(400).json(error.message);
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(5);
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
})

export {addProduct, updateProduct, removeProduct, getProducts, getProductById, addProductReview, getTopProducts};