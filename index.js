var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var youtubedl = require('youtube-dl');
var fs = require('fs');
var app = express();
let detection = require("./detection");
let maker = require("./screenshot-maker");
let videoService = new (require("./video-service"))();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/downloadVideo', async (req, res) => {
    let video = youtubedl(req.body.url, ['--format=18']);
    video.on('info', (info) => {
        console.log('Download started');
        console.log('size: ' + info.size);
    });

    video.on('end', () => {
        console.log("Finished download");
        maker(filename, () => {
            fs.unlink(filename);
            var video_id = req.body.url.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if (ampersandPosition != -1) {
                video_id = video_id.substring(0, ampersandPosition);
            }
            analizeScreenshots(video_id);
        });
    });

    let filename = __dirname + "/temp/video.mp4";
    video.pipe(fs.createWriteStream(filename));


    res.status(200).json('okay');
});

function analizeScreenshots(videoId) {
    let sPath = __dirname + "/temp/screenshots";

    let files = fs.readdirSync(sPath);
    let length = files.length;
    let coll = {};
    let count = 0;

    files.forEach(file => {
            detection(sPath + "/" + file, result => {
                aggregate(coll,result);
                count++;

                if(count >= length){
                    for(var prop in coll){
                        coll[prop] = coll[prop] / length; //average
                    }
                    videoService.saveStatsForVideo(videoId, coll);
                }
            });
        });


}

function aggregate(coll, data) {
    if (!coll)
        coll = data;
    else {
        for (var prop in data) {
            if (!!coll[prop]) {
                coll[prop] += data[prop];
            } else {
                coll[prop] = data[prop];
            }
        }
    }
}

app.listen(8000);
