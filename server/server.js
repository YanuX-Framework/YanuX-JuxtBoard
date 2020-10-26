
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

app.get('/download', function (req, res) {
    let uuidFile = req.query.id;
    console.log("UUID: " + uuidFile);
    for (extension of imageTypes) {
        let filename = 'server/storage/' + uuidFile + "." + extension
        console.log("Request for download file: " + filename);
        if (fs.existsSync(filename)) {
            res.sendFile(__dirname+"\/storage\/"+ uuidFile + "." + extension);
            break;
        } else {
        }
    }
    console.log("Done with download");
});

app.listen(3096, function () {

    console.log('App running on port 3096');

});