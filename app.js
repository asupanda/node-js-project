const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const db = require('./config/mongoose-connection');
const expressSession=require("express-session");
const flash=require("connect-flash")
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({extended:true}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});