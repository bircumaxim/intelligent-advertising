var nodeWebCam = require("node-webcam");
var defaultSettings = require("./camera-settings");

let camera = nodeWebCam.create(defaultSettings);

module.exports = function () {
    this.takePhoto = (pictureReadyCallBack) => {
        camera.capture("picture", pictureReadyCallBack);
    }
};