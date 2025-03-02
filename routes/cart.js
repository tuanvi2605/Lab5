const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Thiếu tên sản phẩm' });

    if (!req.session.cart) {
        req.session.cart = []; // Tạo giỏ hàng nếu chưa có
    }

    req.session.cart.push(name);
    res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart: req.session.cart });
});

router.get('/', (req, res) => {
    res.render('cart', { cart: req.session.cart || [] }); // Render cart.ejs với dữ liệu từ session
});

module.exports = router;
