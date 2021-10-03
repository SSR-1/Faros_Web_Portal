const dbObj = require('../db');

exports.store_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM store`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

exports.store_details_by_id = function (store_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM store WHERE store_id = '${store_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}