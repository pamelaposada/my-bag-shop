const mongoose = require('mongoose');

const CartTemplate = new mongoose.Schema
({

    username:{
        type: String,
        required:true
    },
    products:[
        {
            name:String,
            price: Number
        }
    ],
    total:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }

    
})

module.exports = mongoose.model('carts', CartTemplate)