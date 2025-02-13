const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    email: String,
    password:String,
    product: {
        type: Array,
        default: []
    },
    gstin: {
        type: String, // GSTIN should be a string
        default: ""   // Default empty if not provided
    },
    picture: String,
    
});

module.exports = mongoose.model('Owner', ownerSchema);
