var camera = require("./camera");
var detection = require("./detection");
var test = new camera();

setInterval(() => {
    test.takePhoto(() => {
        detection("picture.jpg", data => console.log(data))
    });
}, 100);
