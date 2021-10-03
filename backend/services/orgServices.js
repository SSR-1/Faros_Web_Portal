const request = require('request');
const org = require('../models/org');

exports.getOrgList = function () {
    return new Promise((res, rej) => {
        org.org_list()
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getOrgDetailsById = function (user_id) {
    return new Promise((res, rej) => {
        org.org_details_by_id(user_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}