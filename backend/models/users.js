const dbObj = require('../db');
const utils = require('../helpers/db_utils');

// Get List Of Users
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

// Get User Deatils For Given User ID
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

// Add New User
exports.add_new_user = function (user_details) {
    return new Promise((res, rej) => {
        let query = `SELECT user_id FROM user ORDER BY user_id DESC LIMIT 1`;
        let last_user_id;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            last_user_id = results[0].user_id;
            
            const user_id = utils.getNextId(last_user_id);
            const email = user_details.email;
            const password = user_details.password;
            const name = user_details.name;
            const mobile = user_details.mobile;
            const role = user_details.role;
            const profile_pic = user_details.pic ? user_details.pic : '/images/faces/face28.jpg' ;

            query = `INSERT INTO user VALUES('${user_id}', '${email}', '${password}', '${name}', '${mobile}', '${role}', '${profile_pic}')`;
            dbObj.query(query, function (error, results, fields) {
                if (error) {
                    rej(error);
                }
                res('success');
            });
        });
    })
}

exports.delete_user_by_id = function (user_id) {
    return new Promise((res, rej) => {
        const query = `DELETE FROM user WHERE user_id = '${user_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res('success');
        });
    })
}