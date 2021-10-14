const express = require('express');
const { connect } = require('../db');
const router = express.Router();
const libraryServices = require('../services/libraryServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

router.get('/getAllLibraryList', function (req, res) {
    libraryServices.getAllLibraryList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getImageList', function (req, res) {
    libraryServices.getImageList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getImageDetailsById/:id', function (req, res) {
    libraryServices.getImageDetailsById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.post('/uploadFile/', function (req, res) {
    libraryServices.uploadFile(req, res)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/deleteContentById/:id', function (req, res) {
    libraryServices.deleteContentById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
