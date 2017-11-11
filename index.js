var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var youtubedl = require('youtube-dl');
var fs = require('fs');
var app = express();
let maker = require("./screenshot-maker");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/views')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/downloadVideo', async (req, res) => {
	console.log(req.body);
    console.log(req.body.url);

	let video = youtubedl(req.body.url, ['--format=18']);
	video.on('info', (info) => {
		console.log('Download started');
		console.log('size: ' + info.size);
    });

    video.on('end', () => {
        console.log("Finished download");
        maker(filename, () => fs.unlink(filename));
    });

    let filename = __dirname+"/temp/video.mp4";
    video.pipe(fs.createWriteStream(filename));


	res.status(200).json('okay');
});

app.listen(8000);
