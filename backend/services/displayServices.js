const display = require('../models/display');

exports.getDisplayList = function () {
    return new Promise((res, rej) => {
        display.display_list()
            .then(data =>  res(data))
            .catch(err => rej(err));
    })
}

exports.addNewDisplay = function (display_details) {
    return new Promise((res, rej) => {
        display.add_new_display(display_details)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getDisplayListByStoreId = function (store_id) {
    return new Promise((res, rej) => {
        display.display_details_by_store_id(store_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}