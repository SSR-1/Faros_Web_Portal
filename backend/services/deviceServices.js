const device = require('../models/device');

exports.addNewDevice = function (device_details) {
    return new Promise((res, rej) => {
        device.add_new_device(device_details)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getDeviceDetailsByDeviceId = function (device_details) {
    return new Promise((res, rej) => {
        device.device_details_by_id(device_details)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}