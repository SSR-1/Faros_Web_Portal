const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

/* GET users listing. */
router.get('/getUserList', function (req, res) {
    userServices.getUserList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getUserDetailsById/:id', function (req, res) {
    userServices.getUserDetailsById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.post('/addNewUser', function (req, res) {
    userServices.addNewUser(req.body)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/deleteUserById/:id', function (req, res) {
    userServices.deleteUserById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
