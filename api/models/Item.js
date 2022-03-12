const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mime = require('mime-types');
const config = require('../config');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const ItemsSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: {
        type: String,
        validate: {
            validator: function(value) {
                const filePath = path.join(config.uploadPath, value);

                const mimeType = mime.lookup(filePath);

                return imageMimeTypes.includes(mimeType);
            },
            message: 'Image file format is incorrect'
        }
    }
});

const Item = mongoose.model('Items', ItemsSchema);

module.exports = Item;