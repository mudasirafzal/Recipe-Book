const functions = require('firebase-functions');
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  projectId: "fir-cookbook-49f2a",
  keyFilename: "fir-cookbook-49f2a-firebase-adminsdk-kp4x5-48404b49d1.json"
});

exports.onFileChange = functions.storage.object().onFinalize(event => {
  const object = event.data;
  const bucket = object.bucket;
  const contentType = object.contentType;
  const filePath = object.name;
  console.log("File change detected, function execution started");

  if (object.resourceState === "not_exists") {
    console.log("We deleted a file, exit...");
    return;
  }

  if (path.basename(filePath).startsWith("resized-")) {
    console.log("We already renamed that file!");
    return;
  }

  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };
  return destBucket
    .file(filePath)
    .download({
      destination: tmpFilePath
    })
    .then(() => {
      return spawn("convert", [tmpFilePath, "-resize", "500x500", tmpFilePath]);
    })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: "resized-" + path.basename(filePath),
        metadata: metadata
      });
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
cors(req, res, () => {
  if (req.method !== 'POST'){
      return res.status(500).sjson({
        message: 'Not Allowed'
      })
  }
  const busboy = new Busboy({ headers: req.headers });  
  let uploadData = null;
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const filepath = path.join(os.tmpdir(), filename);
    uploadData = { file: filepath, type: mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    const bucket = storage.bucket("fir-cookbook-49f2a.appspot.com");
    bucket
      .upload(uploadData.file, {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: uploadData.type
          }
        }
      })
      .then(() => {
        res.status(200).json({
          message: "It worked!"
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  });
});
