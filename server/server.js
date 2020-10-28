
const ffmpeglib = require('fluent-ffmpeg');
var uuidlib = require('uuid');
var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require("fs");
app.use(cors());

var uuid;

//CONSTANTS
const imageTypes = ['png', 'jpeg'];
const videoType = ['mp4'];


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/storage')
    },
    filename: function (req, file, cb) {
        uuid = uuidlib.v4();
        let extension = file.mimetype.split("/")[1];
        let filename = uuid + "." + extension;
        console.log("New File: " + filename);
        cb(null, filename);
    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(uuid);

    })

});

const createThumbnail = (filename, res) => {
    let filePath = ""
    let fileDuration = ""

    ffmpeglib.ffprobe(filename, function (err, metadata) {
        fileDuration = metadata.format.duration
    });

    ffmpeglib(filename)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = __dirname + "\/storage\/" + filenames[0];
        })
        .on('end', function () {
            console.log('Thumbnail created: ' + filePath);
            res.sendFile(filePath);
        })
        .on('error', function (err) {
            console.error(err);
        })
        .screenshots({
            count: 1,
            folder: 'server/storage',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })
}

app.get('/download', function (req, res) {
    let uuidFile = req.query.id;
    var mimeTypes = imageTypes.concat(videoType);
    for (extension of mimeTypes) {
        let filename = __dirname + "\/storage\/" + uuidFile + "." + extension;
        if (fs.existsSync(filename)) {

            if (videoType.includes(extension)) {

                console.log("Request for download file: " + filename);
                createThumbnail(filename, res);
            }
            else {
                console.log("Request for download file: " + filename);
                res.sendFile(filename);
            }
        }

    }
});

app.get('/fulldownload', function (req, res) {
    let uuidFile = req.query.id;
    var mimeTypes = imageTypes.concat(videoType);
    for (extension of mimeTypes) {
        let filename = __dirname + "\/storage\/" + uuidFile + "." + extension;
        if (fs.existsSync(filename)) {
                console.log("Request for full download file: " + filename);
                res.sendFile(filename);
            }
        
    }
});

app.listen(3096, function () {

    console.log('App running on port 3096');

});