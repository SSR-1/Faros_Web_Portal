const express = require('express');
const router = express.Router();
const deviceServices = require('../services/deviceServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

router.post('/addNewDevice', function (req, res) {
    deviceServices.addNewDevice(req.body)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.post('/getDeviceDetailsById', function (req, res) {
    console.log(`Device Id: ${req.body}`);
    deviceServices.getDeviceDetailsByDeviceId(req.body)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
