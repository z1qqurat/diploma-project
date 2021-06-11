const express = require('express');

const chatRouter = express.Router();

chatRouter.get("/messages", async (req, res, next) => {
    const user = req.currentUser;
    const recipientId = req.body.recipientId;
    // const afterDatetime = req.body.afterDatetime;
});

chatRouter.get("/chats", async (req, res, next) => {
    const user = req.currentUser;
});

chatRouter.post("/message", async (req, res, next) => {
    const user = req.currentUser;
    const recipientId = req.body.recipientId;
    const text = req.body.text;
});

module.exports = chatRouter;