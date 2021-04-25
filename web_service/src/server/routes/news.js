const express = require('express');
const multer = require('multer');
const path = require('path');
const Media = require('../database/media');
const dbWrapper = require('../database/dbWrapper');
const { Sequelize } = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
const upload = multer({ storage: storage });

const newsRouter = express.Router();

newsRouter.get("/all", async (req, res, next) => {
    const userId = req.query.userId;
    // const searchString = req.body.searchString;

    try {
        const mediaPosts = await dbWrapper.query(`
            SELECT media.id,
                media.user_id,
                media.type_id,
                media.url,
                media.title,
                media.description,
                media.creation_date,
                CONCAT(users.first_name, " ", users.last_name) as \`authorFullName\`
            FROM m_project.media
            INNER JOIN m_project.users ON users.id = media.user_id
            WHERE media.user_id = ?
            `,
            {
              replacements: [userId],
              type: Sequelize.QueryTypes.SELECT
            }
          );
    
        res.status(200).json(mediaPosts);
    } catch(e) {
        next(e);
    }
});

newsRouter.post("/create", upload.single('mediaFile'), async (req, res, next) => {
    const user = req.currentUser;
    const title = req.body.title;
    const description = req.body.description;

    try {
        const media = Media.build({
            user_id: user.id,
            type_id: 1,
            url: req.file.path,
            title,
            description
        });
    
        await media.save();
    
        res.status(200).json(media);
    } catch(e) {
        next(e);
    }
});

module.exports = newsRouter;