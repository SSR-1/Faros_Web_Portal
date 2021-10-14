const library = require('../models/library');
const formidable = require('formidable');
const fs = require('fs');
const pathHelper = require('../helpers/paths_utils');
const path = require('path');

exports.getAllLibraryList = function () {
    return new Promise((res, rej) => {
        library.all_library_list()
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getImageList = function () {
    return new Promise((res, rej) => {
        library.image_list()
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.getImageDetailsById = function (image_id) {
    return new Promise((res, rej) => {
        library.image_details_by_id(image_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}

exports.uploadFile = function (req) {
    return new Promise((res, rej) => {
        const form = new formidable();
        form.parse(req, (err, fields, files) => {
            if (err) {
                rej(rej);
            }
            const tempPath = files.file.path;
            const fileName = files.file.name;
            const uploadPath = path.normalize(`../frontend/library/images/${fileName}`);
            const content_type = pathHelper.content_type(fileName);
            const content_location = `/library/images/${fileName}`;
            const content_size = files.file.size;
            const last_updated = new Date().toISOString();
            const last_updated_by = '';
            const content_title = fileName;
            const layout_count = '0';

            const file_details = {
                "content_type": content_type,
                "content_location": content_location,
                "content_size": content_size,
                "last_updated": last_updated,
                "last_updated_by": last_updated_by,
                "content_title": content_title,
                "layout_count": layout_count
            }

            fs.rename(tempPath, uploadPath, function (err) {
                if (err) rej(err);

                library.add_new_library_item(file_details)
                    .then(data => res(data))
                    .catch(err => rej(err));
            });
        });
    })
}

exports.deleteContentById = function (library_id) {
    return new Promise((res, rej) => {
        library.delete_content_by_id(library_id)
            .then(data => res(data))
            .catch(err => rej(err));
    })
}
