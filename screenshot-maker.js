var ffmpeg = require('fluent-ffmpeg');

module.exports = function (path,callback) {
    ffmpeg(path)
        .screenshots({
            count: 10,
            folder: __dirname+"/temp/screenshots"
        })
        .on('end', () => callback());
};