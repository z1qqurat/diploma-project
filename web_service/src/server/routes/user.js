const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
const upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.get("/currentUser", async (req, res, next) => {
    const user = req.currentUser;
    res.status(200).json(user);
});

userRouter.get("/profile", async (req, res, next) => {
    const userId = req.body.userId;
});

userRouter.post("/avatar", upload.single('avatar'), async (req, res, next) => {
    const user = req.currentUser;
    try{
        user.avatar_url = req.file.path;
        user.save();
        res.status(200).end();
    } catch(e) {
        next(e);
    }
});

module.exports = userRouter;