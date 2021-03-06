const express = require('express');
const Property = require('../models/property');

const UserCtrl = require('../controllers/user');


const router = express.Router();

router.get('/secret', UserCtrl.authMiddleware, function (req, res) {
    res.json({ 'secret': true });
});

router.get('', function (req, res) {
    Property.find({}, function (error, foundProperties) {
        res.json(foundProperties);
    });
});

router.get('/:id', function (req, res) {
    const propertyId = req.params.id;
    Property.findById(propertyId, function (error, foundProperty) {
        if (error) {
            res.status(422).send({ errors: [{ title: 'Property Error.', message: 'Could not find Property.' }] })
        }
        res.json(foundProperty);
    });
});

module.exports = router;