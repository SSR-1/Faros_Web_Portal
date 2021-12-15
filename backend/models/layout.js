const dbObj = require('../db');
const utils = require('../helpers/db_utils');
const config = require('../bin/config')

exports.layout_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM layout`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

// Get Layout Details By Id
exports.layout_details_by_id = function (layout_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM layout WHERE layout_id = '${layout_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

// Add New display
exports.add_new_layout = function (layout_details) {
    return new Promise((res, rej) => {
        let query = `SELECT layout_id FROM layout ORDER BY layout_id DESC LIMIT 1`;
        let last_layout_id, layout_id = 'lyt00001';
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            if (results.length) {
                last_layout_id = results[0].layout_id;
                layout_id = utils.getNextId(last_layout_id);
            }

            const layout_content = JSON.stringify(layout_details.layout_content);
            const last_updated = "";
            const last_updated_by = "";
            const store_id = "";
            const layout_name = layout_details.layout_name;

            query = `INSERT INTO layout VALUES('${layout_id}', '${layout_content}', '${last_updated}', '${last_updated_by}', '${store_id}', '${layout_name}')`;
            console.log(query);
            // res(config.success_alerts.LAYOUT_CREATE_SUCCESS);
            dbObj.query(query, function (error, results, fields) {
                if (error) {
                    rej(error);
                }
                res(config.success_alerts.LAYOUT_CREATE_SUCCESS);
            });
        });
    })
}

exports.delete_layout_by_id = function (layout_id) {
    return new Promise((res, rej) => {
        const query = `DELETE FROM layout WHERE layout_id = '${layout_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(config.success_alerts.LAYOUT_DELETE_SUCCESS);
        });
    })
}

exports.delete_display_by_id = function (display_id) {
    return new Promise((res, rej) => {
        const query = `DELETE FROM display WHERE display_id = '${display_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res('success');
        });
    })
}