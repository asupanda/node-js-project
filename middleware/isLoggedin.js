const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
module.exports = async function (req, res, next) {
    let token = req.cookies.token;
    if (!token) {
    req.flash("error", "you need to login first");
    return res.redirect('/');
}
try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel
    .findOne({email: decoded.email})
    .select("-password");
    if (!user) return res.status(401).send('Access Denied');
    req.user = user;
    next();
} catch (err) {
    req.flash("error", "Something went wrong.")
    res.redirect("/");
}
};