const express = require('express');
const router = express.Router();
const displayServices = require('../services/displayServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

/* GET display listing. */
router.get('/getDisplayList', function (req, res) {
    displayServices.getDisplayList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.post('/addNewDisplay', function (req, res) {
    displayServices.addNewDisplay(req.body)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getDisplayListByStoreId/:id', function (req, res) {
    console.log(req.params.id);
    displayServices.getDisplayListByStoreId(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
