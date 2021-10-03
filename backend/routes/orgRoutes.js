const express = require('express');
const router = express.Router();
const orgServices = require('../services/orgServices');

const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err) => res.status(500).send(err);

/* GET users listing. */
router.get('/getOrgList', function (req, res) {
    orgServices.getOrgList()
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

router.get('/getOrgDetailsById/:id', function (req, res) {
    orgServices.getOrgDetailsById(req.params.id)
        .then(data => handleResponse(res, data))
        .catch(err => handleError(res, err));
});

module.exports = router;
