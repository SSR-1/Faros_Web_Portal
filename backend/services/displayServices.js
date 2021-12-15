const request = require('request');
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