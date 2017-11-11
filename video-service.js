let firebase = new (require("./firebase-service"))();

module.exports = function () {
    this.saveStatsForVideo = function (videoId, stats) {
        let nodeName = "/videodata/"+videoId;
        firebase.set(nodeName,stats);
    };

    this.getBestVideo = function (currentImageStats, callback) {
        firebase.getNode("/videodata/",(data) => {
            var bestMatchId = null;
            var bestMatchScore = 100;
            for(var videoIndex in data){
                var video = data[videoIndex];
                var score = 0;

                for(var prop in currentImageStats){
                    if (!!video[prop]){
                        score += Math.abs(video[prop] - currentImageStats[prop]);
                    }
                }

                if (score < bestMatchScore){
                    bestMatchId = videoIndex;
                    bestMatchScore = score;
                }
            }

            callback({
                id : bestMatchId,
                match : bestMatchScore
            });
        });
    };
};