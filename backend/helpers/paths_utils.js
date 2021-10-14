const path = require('path');
const extensions = require('../bin/config');
    
exports.root = function () {
    return path.dirname(require.main.filename);
}

exports.content_type = function (file_name) {
    const ext = path.extname(file_name).toLowerCase().trim();
    const image_extensions = extensions.image_extensions;
    const video_extensions = extensions.video_extensions;
    if (image_extensions.includes(ext)) {
        return 'image';
    } else if (video_extensions.includes(ext)) {
        return 'video';
    }
    return 'error';
}
