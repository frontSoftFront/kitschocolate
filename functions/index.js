// core imports
const fs = require('fs');
const os = require('os');
const path = require('path');
const Busboy = require('busboy');
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');

// Firebase Configuration
const admin = require('firebase-admin');

const serviceAccount = require('./kitschocolate-bc8f8-firebase-adminsdk-hrvum-cbd63441c4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kitschocolate-bc8f8.firebaseio.com'
});

// File Upload Endpoint
exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed!'
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      const type = req?.query?.type;
      // const filepath =
      //   type !== null && type !== undefined
      //     ? `/images/${type}/${getFileName}`
      //     : getFileName;
      console.log('filepath', filepath);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
      const bucket = admin.storage().bucket('kitschocolate-bc8f8.appspot.com');
      return bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          return res.status(200).json({
            message: 'it worked!'
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});
