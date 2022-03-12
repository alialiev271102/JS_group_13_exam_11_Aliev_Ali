const mongoose = require('mongoose');
const config = require("./config");
const Category = require("./models/Category");
const Item = require("./models/Item");
const User = require("./models/Users");
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const ali = await User.create({
        email: "test@gmail.com",
        password:"12321",
        displayName: "Limon",
        phoneNumber: "+996552271102",
        token: nanoid(),
    })

    const [computers, cars, telephones, others] = await Category.create({
        title: 'Computers'
    }, {
        title: 'Cars'
    }, {
        title: 'Telephones'
    }, {
        title: 'Others'
    });

    await Item.create({
        category: computers,
        title: 'Baracuda',
        price: '1500',
        description: 'Very strong PC',
        user: ali,
        image: "computer.jpeg"
    },{
        category: cars,
        title: 'lexus',
        price: '1000000',
        description: 'Very expensive car',
        user: ali,
        image: "car.jpg"
    },{
        category: telephones,
        title: 'Red Magic 6G Pro',
        price: '750',
        description: 'Phone for gaming',
        user: ali,
        image: "telephone.jpg"
    },{
        category: others,
        title: 'Pencil',
        price: '15',
        description: 'Try new level of drawing',
        user: ali,
        image: "other.jpg"
    })

    await mongoose.connection.close();
}

run().catch(e => console.error(e));