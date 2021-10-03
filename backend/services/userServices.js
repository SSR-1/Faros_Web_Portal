const request = require('request');
const user = require('../models/users');

exports.getUserList = function () {
    return new Promise((res, rej) => {
        user.user_list()
            .then(data =>  res(data))
            .catch(err => rej(err));
    })
}

exports.getUserDetailsById = function (user_id) {
    return new Promise((res, rej) => {
        user.user_details_by_id(user_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}