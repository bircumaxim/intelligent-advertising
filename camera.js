var nodeWebCam = require("node-webcam");
var defaultSettings = require("./src/camera/camera-settings");

module.exports = function (pictureReadyCallBack) {
    this.camera = nodeWebCam.create(defaultSettings);
    this.takePhoto = () => {
        this.camera.capture("picture", pictureReadyCallBack);
    }
};