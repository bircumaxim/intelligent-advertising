let firebase = new (require("./firebase-service"))();

module.exports = function () {
    this.saveStatsForVideo = function (videoId, stats) {
        let nodeName = "/videodata/" + videoId;
        firebase.set(nodeName, stats);
    };

    this.getBestVideo = function (currentImageStats, callback) {
        firebase.getNode("/videodata/", (data) => {
            var bestMatchId = null;
            var bestMatchScore = 0;
            var properties = [];
            for (var videoIndex in data) {
                var video = data[videoIndex];
                var score = 0;
                var itProp = [];

                for (var prop in currentImageStats) {
                    if (!!video[prop]) {
                        score += Math.min(video[prop], currentImageStats[prop])
                        itProp.push(prop);
                    }
                }

                if (score > bestMatchScore) {
                    bestMatchId = videoIndex;
                    bestMatchScore = score;
                    properties = itProp;
                }
            }

            console.log(properties);


            callback({
                id: bestMatchId,
                match: bestMatchScore,
                matchedProperties: properties,
                currentImageStats: currentImageStats,
            });
        });
    };
};