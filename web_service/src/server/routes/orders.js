const express = require('express');
const Order = require('../database/order');

const ordersRouter = express.Router();

ordersRouter.get("/allOrders", async (req, res, next) => {
    const user = req.currentUser;
    // TODO: complex filter
    const searchString = req.body.searchString;
});

ordersRouter.get("/myOrders", async (req, res, next) => {
    const user = req.currentUser;
    try {
        const orders = await Order.findAll({
            where: { designer_id: user.id }
        });
        res.status(200).json(orders);
    } catch(e) {
        next(e);
    }
});

ordersRouter.get("/allDesigners", async (req, res, next) => {
    const user = req.currentUser;
    // TODO: complex filter
    const searchString = req.body.searchString;
});

ordersRouter.post("/newOrder", async (req, res, next) => {
    const user = req.currentUser;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    try {
        const order = Order.build({
            designer_id: user.id,
            user_id: user.id,
            status_id: 1,
            device_type_id: 1,
            contact_info: '',
            style: '',
            description,
            from_date: startDate,
            due_date: endDate,
            price_low: 0,
            price_high: 100
        });

        await order.save()

        res.status(200).end();
    } catch(e) {
        next(e);
    }
});

module.exports = ordersRouter;