
require('dotenv').config()

const fs = require("fs");

const express = require('express');
const multer = require('multer')
const cors = require('cors');

const ffmpeglib = require('fluent-ffmpeg');
const uuidlib = require('uuid');

const app = express();
app.use(cors());

//CONSTANTS
const port = process.env.BACKEND_PORT;
const imageTypes = ['png', 'jpeg'];
const videoType = ['mp4'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, 'server/storage') },
    filename: function (req, file, cb) {
        file.uuid = uuidlib.v4();
        let extension = file.mimetype.split("/")[1];
        let filename = file.uuid + "." + extension;
        console.log("New File: " + filename);
        cb(null, filename);
    }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) { return res.status(500).json(err); }
        return res.status(200).send(req.file.uuid);
    })
});

const createThumbnail = (filename, res) => {
    let filePath = "";
    let fileDuration = "";
    ffmpeglib.ffprobe(filename, function (err, metadata) {
        fileDuration = metadata.format.duration;
    });
    ffmpeglib(filename).on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames);
        filePath = __dirname + "\/storage\/" + filenames[0];
    }).on('end', function () {
        console.log('Thumbnail created: ' + filePath);
        res.sendFile(filePath);
    }).on('error', function (err) {
        console.error(err);
    }).screenshots({
        count: 1,
        folder: 'server/storage',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
}

app.get('/download', function (req, res) {
    const uuidFile = req.query.id;
    const mimeTypes = imageTypes.concat(videoType);
    for (extension of mimeTypes) {
        const filename = __dirname + "\/storage\/" + uuidFile + "." + extension;
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
    const uuidFile = req.query.id;
    const mimeTypes = imageTypes.concat(videoType);
    for (extension of mimeTypes) {
        let filename = __dirname + "\/storage\/" + uuidFile + "." + extension;
        if (fs.existsSync(filename)) {
            console.log("Request for full download file: " + filename);
            res.sendFile(filename);
        }
    }
});

app.listen(port, function () { console.log('Backend server running on port:', port); });