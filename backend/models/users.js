const dbObj = require('../db');

exports.user_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM user`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

exports.user_details_by_id = function (user_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM user WHERE user_id = '${user_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}