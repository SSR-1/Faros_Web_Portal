const express = require('express');
const router = express.Router();
const layoutServices = require('../services/layoutServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

router.get('/getLayoutList', function (req, res) {
    layoutServices.getLayoutList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getLayoutDetailsById/:id', function (req, res) {
    layoutServices.getLayoutDetailsById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/deleteLayoutById/:id', function (req, res) {
    layoutServices.deleteLayoutById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.post('/addNewLayout/', function (req, res) {
    layoutServices.addNewLayout(req.body)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
