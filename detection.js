var visionlib = require('@google-cloud/vision');
const vision = new visionlib({
    projectId: 'intelligent-advertising',
    keyFilename: 'key.json'
});



module.exports = function (imageSrc,callback) {

    var image = {
        source: {
            filename : imageSrc
        }
    };

    vision.labelDetection(image).then(response => {
        var result = {};
        response[0].labelAnnotations.forEach(val => {
            result[val.description] = val.score;
        });

        callback(result);
    }).catch(err => {
            console.error(err);
    });
};
