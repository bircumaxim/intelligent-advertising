var admin = require("firebase-admin");

var serviceAccount = require("./intelligent-advertising-firebase-adminsdk-h66qk-cd8e7c9d47.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://intelligent-advertising.firebaseio.com"
});

var defaultDatabase = admin.database();


module.exports = function () {
    this.getNode = function (path, callback) {
        var ref = defaultDatabase.ref(path);
        ref.once("value", function (snapshot) {
            callback(snapshot.val());
        });
    };

    this.subscribeToNode = function (path, callback) {
        var ref = defaultDatabase.ref(path);
        ref.on("value", function (snapshot) {
            callback(snapshot.val());
        });
    };

    this.set = function (path, data) {
        var ref = defaultDatabase.ref(path);
        ref.set(data);
    }
};