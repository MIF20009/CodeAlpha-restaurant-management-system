const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    price : {type : Number, required : true},
}, {timestamps : true});

const orderSchema = new mongoose.Schema({
    item : [{
        name : {type : String, required : true},
        quantity : {type : Number, required : true, default : 1},
    }],
    status : {
        type : String,
        enum : ["Pending", "In Progress", "Completed", "Cancelled"],
        default : "Pending",
    },
    totalPrice : {
        type : Number,
        required : true,
    },
},{timestamps : true});

const inventorySchema = new mongoose.Schema({
    name : {type : String, required : true},
    quantity : {type : Number, required : true, default : 0},
}, {timestamps : true});

const reservationSchema = new mongoose.Schema({
    customerName : {type : String, required : true},
    date : {type : Date, required : true},
    time : {type : String, required : true},
    tableNumber : {type : Number, required : true},
}, {timestamps : true});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
const Order = mongoose.model("Order", orderSchema);
const Inventory = mongoose.model("Inventory",inventorySchema);
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = {MenuItem, Order, Inventory, Reservation};