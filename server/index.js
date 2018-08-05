const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const MockDb = require('./mock-db');
const propertyRoutes = require('./routes/properties');

mongoose.connect(config.DB_URI).then(() => {
    const mockDb = new MockDb();
    mockDb.seedDb();
});

const app = express();

app.use('/api/v1/properties', propertyRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('Server is running....');
})