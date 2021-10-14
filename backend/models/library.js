const dbObj = require('../db');
const utils = require('../helpers/db_utils');
const config = require('../bin/config')

exports.all_library_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM library`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

// Get Image List
exports.image_list = function () {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM library WHERE content_type='image'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

// Get Image Details By Id
exports.image_details_by_id = function (image_id) {
    return new Promise((res, rej) => {
        const query = `SELECT * FROM library WHERE library_id = '${image_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(results);
        });
    })
}

// Add New User
exports.add_new_library_item = function (file_details) {
    return new Promise((res, rej) => {
        let query = `SELECT library_id FROM library ORDER BY library_id DESC LIMIT 1`;
        let last_item_id;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            last_item_id = results[0].library_id;
            console.log(file_details);
            const library_id = utils.getNextId(last_item_id);
            const content_type = file_details.content_type;
            const content_location = file_details.content_location;
            const content_size = file_details.content_size;
            const last_updated = file_details.last_updated;
            const last_updated_by = file_details.last_updated_by;
            const content_title = file_details.content_title;
            const layout_count = file_details.layout_count;

            query = `INSERT INTO library VALUES('${library_id}', '${content_type}', '${content_location}', '${content_size}', '${last_updated}', '${last_updated_by}', '${content_title}', '${layout_count}')`;
            console.log(`Query: ${query}`);
            dbObj.query(query, function (error, results, fields) {
                if (error) {
                    rej(error);
                }
                res(config.success_alerts.NEW_FILE_UPLOAD_SUCCESS);
            });
        });
    })
}

exports.delete_content_by_id = function (library_id) {
    return new Promise((res, rej) => {
        const query = `DELETE FROM library WHERE library_id = '${library_id}'`;
        dbObj.query(query, function (error, results, fields) {
            if (error) {
                rej(error);
            }
            res(config.success_alerts.FILE_DELETE_SUCCESS);
        });
    })
}