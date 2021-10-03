const dbObj = require('../db');

exports.org_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM organization`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

exports.org_details_by_id = function (org_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM organization WHERE org_id = '${org_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}