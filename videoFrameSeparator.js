var ffmpeg = require('fluent-ffmpeg');

module.exports = function () {
    var proc = new ffmpeg('./videos/video1.mp3')
        .screenshots({
            count: 1,
            timemarks: [ '600' ] // number of seconds
        }, './videos/', function(err) {
            console.log('screenshots were saved')
        });
};