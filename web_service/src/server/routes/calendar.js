const express = require('express');

const calendarRouter = express.Router();

calendarRouter.get("/events", async (req, res, next) => {
    const user = req.currentUser;
    // const email = req.body.email;
});

calendarRouter.post("/event", async (req, res, next) => {
    const user = req.currentUser;
    // const email = req.body.email;
});

module.exports = calendarRouter;