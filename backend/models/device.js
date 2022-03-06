const dbObj = require('../db');
const keys_utils = require('../helpers/keys_utils');

// Add New Device
exports.add_new_device = function (device_details) {
    return new Promise((res, rej) => {
        const device_id = device_details.device_id;
        const secret_key = device_details.secret_key;
        const layout_id = 'lyt00001';
        const key_validation = keys_utils.validate_secret_key(secret_key);
        if (!key_validation) {
            rej("Invalid Secrent Key");
        } else { 
            let query = `INSERT INTO device VALUES('${device_id}', '${secret_key}', '${layout_id}')`;
            dbObj.query(query, function (error, results, fields) {
                if (error) {
                    rej(error);
                }
                query = `SELECT * FROM device WHERE device_id = '${device_id}'`;
                dbObj.query(query, function (error, results, fields) {
                    if (error) {
                        rej(error);
                    }
                    res(results);
                });
            });
        }
    })
}

exports.device_details_by_id = function (device_details) {
    return new Promise((res, rej) => {
        const device_id = device_details.device_id;
        const query = `SELECT * FROM device WHERE device_id = '${device_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}