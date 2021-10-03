const request = require('request');
const store = require('../models/stores');

exports.getStoreList = function () {
    return new Promise((res, rej) => {
        store.store_list()
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getStoreDetailsById = function (user_id) {
    return new Promise((res, rej) => {
        store.store_details_by_id(user_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}