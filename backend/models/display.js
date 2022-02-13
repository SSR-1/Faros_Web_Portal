const dbObj = require('../db');
const utils = require('../helpers/db_utils');

// Get List Of Users
exports.display_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM display`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            console.log(results);
            res(results);
        });
    })
}

// Add New Display
exports.add_new_display = function (display_details) {
    return new Promise((res, rej) => {
        let query = `SELECT display_id FROM display ORDER BY display_id DESC LIMIT 1`;
        let last_display_id;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            last_display_id = results[0].display_id;

            const display_id = utils.getNextId(last_display_id);
            const store_id = display_details.store_id;
            const active_layout_id = display_details.layout_id;
            const display_name = display_details.display_name;

            query = `INSERT INTO display VALUES('${display_id}', '${store_id}', '${active_layout_id}', '${display_name}')`;
            dbObj.query(query, function (error, results, fields) {
                if (error) {
                    rej(error);
                }
                res('success');
            });
        });
    })
}


// TODO //
// Get Display Deatils By ID
// Add New Display
// Delete Display By ID

exports.display_details_by_store_id = function (store_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM display WHERE store_id = '${store_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}