const express = require("express");
const router = express.Router();
const {MenuItem, Order, Inventory, Reservation} = require("./models");

/////////////////////////////////////////Inventory routes/////////////////////////////////////////

//view all inventory
router.get("/inventory", async (res,req) => {
    try{
        const items = await Inventory.find();
        res.json(items);
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

//add new inventory item
router.post("/inventory", async (req,res) => {
    const {name, quantity} = req.body;
    const inventoryItem = new Inventory({ name, quantity});
    try{
        const newItem = await inventoryItem.save();
        res.status(201).json(newItem);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//update an item 
router.put("/inventory", async (req,res) => {
    try{
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updatedItem) return res.status(404).json({message : "Item not found. "});
        res.json(updatedItem);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//delete an item
router.delete("/inventory", async (req,res) => {
    try{
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({message : "Item not found. "});
    res.json({message : "Item deleted successfully. "});
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

/////////////////////////////////////////Menu Items routes/////////////////////////////////////////

//view all menu items
router.get("/menu", async (req,res) => {
    try{
        const items = await MenuItem.find();
        res.json(items);
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

//add new menu item
router.post("/menu", async (req,res) => {
    const {name, price} = req.body;
    const menuItem = new MenuItem({name, price});
    try{
        const newItem = await menuItem.save();
        res.status(201).json(newItem);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//update a menu item
router.put("/menu/:id", async (req,res) => {
    try{
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if (!updatedItem) return res.status(404).json({message : "Menu item not found. "});
        res.json(updatedItem);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//delete a menu item
router.delete("/menu/:id", async (req,res) => {
    try{
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({message : "Menu item not found. "});
        res.json({message : " Menu item deleted successfully. "});
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

/////////////////////////////////////////Order routes/////////////////////////////////////////

//view all orders
router.get("/orders", async (req,res) => {
    try{
        const orders = await Order.find();
        res.json(orders);
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

//add new order
router.post("/orders", async (req,res) => {
    const {items} = req.body;
    try{
        let tottal = 0;
        for (const item in items){
            const menuItem = await MenuItem.findOne({name : item.name});
            if (menuItem){
                total += menuItem.price * item.quantity;
            }
        }
        const order = new Order({items, totalPrice : total});
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//update an order
router.put("/orders/:id", async (req,res) => {
    const { items, status } = req.body;
    try {
        let total = 0;
        for (const item of items) {
            const menuItem = await MenuItem.findOne({ name: item.name });
            if (menuItem) {
                total += menuItem.price * item.quantity;
            }
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { items, status, totalPrice: total }, { new: true });
        if (!updatedOrder) return res.status(404).json({ message : 'Order not found. ' });
        res.json(updatedOrder);
    } catch(err){
        res.status(400).json({ message : err.message });
    }
});

//delet an order
router.delete("/orders/:id", async (req,res) => {
    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({message : "Order not found. "});
        res.json({message : "Order deleted successfully. "});
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

/////////////////////////////////////////Reservations routes/////////////////////////////////////////

//view all reservations
router.get("/reservations", async (req,res) => {
    try{
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch(err){
        res.status(500).json({message : err.message});
    }
});

//add new reservation
router.post("/reservations", async (req,res) => {
    const {customerName, date, time, tableNumber} = req.body;
    const reservation = new Reservation({customerName, date, time, tableNumber});
    try{
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch(err){
        res.status(400).json({message : err.message});
    }
});

//update a reservation
router.put("/reservations/:id", async (req,res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!updatedReservation) return res.status(404).json({ message : 'Reservation not found. ' });
        res.json(updatedReservation);
    } catch(err){
        res.status(400).json({ message : err.message });
    }
});

//delete a reservation
router.delete("/reservation/:id", async (req,res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) return res.status(404).json({ message : 'Reservation not found. ' });
        res.json({ message : 'Reservation deleted successfully. ' });
    } catch(err){
        res.status(500).json({ message : err.message });
    }
});

module.exports = router;