var vision = require('@google-cloud/vision')({
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
        var data = response[0].labelAnnotations.map(val => {
            var obj = {
                description : val.description,
                score : val.score
            };

            return obj;
        });

        callback(data);
    }).catch(err => {
            console.error(err);
    });
};
