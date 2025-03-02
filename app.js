var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/database'); // Import kết nối DB
const session = require('express-session');

// Kết nối MongoDB
connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var listProductsRouter = require('./routes/listproducts');
var cartRouter = require('./routes/cart');
var productRouter = require('./routes/productRouter'); // Import the product routes

var app = express();

app.use(session({
  secret: 'secret-key',  // Thay bằng key bảo mật
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Đặt true nếu dùng HTTPS
}));

// Cấu hình view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Khai báo các route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', listProductsRouter);
app.use('/cart', cartRouter);
app.use('/api/products', productRouter); // Mount the product routes at /api/products

// Xử lý lỗi 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Xử lý lỗi chung
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render trang lỗi
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;