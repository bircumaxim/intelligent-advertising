let firebase = new (require("./firebase-service"))();

module.exports = function () {
    this.saveStatsForVideo = function (videoId, stats) {
        let nodeName = "/videodata/"+videoId;
        firebase.set(nodeName,stats);
    };

    this.getBestVideo = function (currentImageStats, callback) {
        firebase.getNode("/videodata/",(data) => {
            var bestMatchId = null;
            var bestMatchScore = 0;
            var property = [];
            for(var videoIndex in data){
                var video = data[videoIndex];
                var score = 0;
                var cproperty = [];

                for(var prop in currentImageStats){
                    if (!!video[prop]){
                        score += Math.min(video[prop], currentImageStats[prop])
                        cproperty.push(prop);
                    }
                }

                if (score > bestMatchScore){
                    bestMatchId = videoIndex;
                    bestMatchScore = score;
                    property = cproperty;
                }
            }

            console.log(currentImageStats);
            console.log(property);


            callback({
                id : bestMatchId,
                match : bestMatchScore
            });
        });
    };
};