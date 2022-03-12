const mongoose = require('mongoose');
const config = require("./config");
const Category = require("./models/Category");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [computers, cars, telephones, others] = await Category.create({
        title: 'Computers'
    }, {
        title: 'Cars'
    }, {
        title: 'Telephones'
    }, {
        title: 'Others'
    });

    await mongoose.connection.close();
}

run().catch(e => console.error(e));