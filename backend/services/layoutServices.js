const request = require('request');
const layout = require('../models/layout');

exports.getLayoutList = function () {
    return new Promise((res, rej) => {
        layout.layout_list()
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getLayoutDetailsById = function (image_id) {
    return new Promise((res, rej) => {
        layout.layout_details_by_id(image_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.addNewLayout = function (layout_details) {
    return new Promise((res, rej) => {
        layout.add_new_layout(layout_details)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.deleteLayoutById = function (layout_id) {
    return new Promise((res, rej) => {
        layout.delete_layout_by_id(layout_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}
