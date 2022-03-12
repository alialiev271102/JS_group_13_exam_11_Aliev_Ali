const path = require('path');
const multer = require('multer');
const express = require('express');
const fs = require('fs').promises;
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');
const Items = require('../models/Item');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        const query = {};
        const sort = {};

        if (req.query.filter === 'image') {
            query.image = {$ne: null};
        }

        if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
            sort._id = -1;
        }

        const items = await Items.find(query).sort(sort);

        return res.send(items);
    }catch (e){
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const items = await Items.findById(req.params.id);

        if (!items) {
            return res.status(404).send({message: 'Not found'});
        }

        return res.send(items);
    } catch (e) {
        next(e);
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
      if(!req.body.title || !req.body.price || !req.body.user || !req.body.description || !req.body.category) {
          return res.status(400).send({message: "Something is not filled"});
      }
      const itemData = {
          category: req.body.category,
          title: req.body.title,
          price: parseFloat(req.body.price),
          description: req.body.description,
          user: req.body.user,
          image: null
      };

      if(req.file) {
          itemData.image = req.file.filename;
      }

      const item = new Items(itemData);

      await item.save();

      return res.send(item);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            if (req.file) {
                await fs.unlink(req.file.path);
            }

            return res.status(400).send(e);
        }
        next(e);
    }
})

module.exports = router;