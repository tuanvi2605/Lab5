const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/* GET home page - Hiển thị danh sách sản phẩm */
router.get('/', async function(req, res, next) {
    try {
        const products = await Product.find().select('id name price description'); // Truy vấn trường `id`
        res.render('listproducts', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});

/* GET product detail - Hiển thị chi tiết sản phẩm theo ID */
router.get('/:id', async function(req, res, next) {
    try {
        const product = await Product.findOne({ id: req.params.id }).select('id name price description'); // Truy vấn bằng `id`
        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại');
        }
        res.render('product', { product }); // Render trang chi tiết sản phẩm
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
});

module.exports = router;
