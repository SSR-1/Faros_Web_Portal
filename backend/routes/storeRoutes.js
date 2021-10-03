const express = require('express');
const router = express.Router();
const storeServices = require('../services/storeServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

/* GET users listing. */
router.get('/getStoreList', function (req, res) {
    storeServices.getStoreList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getStoreDetailsById/:id', function (req, res) {
    storeServices.getStoreDetailsById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
