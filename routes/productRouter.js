const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE a new product
router.post('/', async (req, res) => {
    try {
        const { id, name, price } = req.body;
        if (!id || !name || !price) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm (id, name, price)' });
        }
        const newProduct = new Product({ id, name, price });
        await newProduct.save();
        res.status(201).json({ message: 'Sản phẩm đã được tạo', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// READ all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// READ a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await Product.findOneAndUpdate(
            { id: req.params.id },
            { name, price },
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được cập nhật', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được xóa', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;