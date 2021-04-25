const express = require('express');
const Rating = require('../database/rating');
const { Sequelize } = require('sequelize');
const dbWrapper = require('../database/dbWrapper');

const scoreRouter = express.Router();

scoreRouter.get("/user", async (req, res, next) => {
    const userId = req.query.userId;

    try {
        const result = 
        
            await dbWrapper.query(`
                SELECT COALESCE(AVG(ratings.score), 0) as avgScore
                FROM m_project.ratings
                WHERE m_project.ratings.designer_id = :designerId;
            `, 
            { replacements: { designerId: userId }},
            { type: Sequelize.QueryTypes.SELECT}
            );

        res.status(200).json(result[0][0].avgScore);

    } catch(e) {
        next(e);
    }
});

scoreRouter.put("/user", async (req, res, next) => {
    const user = req.currentUser;
    const designerId = req.body.userId;
    const value = req.body.value;

    const rating = Rating.build({
        designer_id: designerId,
        user_id: user.id,
        score: value
    });

    try {
        await rating.save();
        res.status(200).end();
    } catch(e) {
        next(e);
    }
});

module.exports = scoreRouter;