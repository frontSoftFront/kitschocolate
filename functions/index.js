// core imports
const fs = require('fs');
const os = require('os');
const path = require('path');
const Busboy = require('busboy');
const nodemailer = require('nodemailer');
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

    let uploadData = null;
    const type = req?.query?.type || 'chocolates';
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { filename, file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
      const bucket = admin.storage().bucket('kitschocolate-bc8f8.appspot.com');
      return bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          destination: `images/${type}/${uploadData.filename}`,
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          // eslint-disable-next-line
          const url = `https://firebasestorage.googleapis.com/v0/b/kitschocolate-bc8f8.appspot.com/o/images%2F${type}%2F${uploadData.filename}?alt=media`;
          const imagesRef = admin
            .database()
            .ref(`images/${type}`)
            .push();
          const id = imagesRef.key;
          imagesRef
            .set({ id, url, type, filename: uploadData.filename })
            .then(() => {
              return res.status(200).json({
                message: 'it worked!'
              });
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

exports.contactUs = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { url, name, email, phone, description } = req.body;

    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      host: 'smtp.gmail.com',
      auth: {
        pass: 'bqtcpdmfjvyzbcrc',
        user: 'greedisgood214@gmail.com'
      }
    });

    const html = `
      <h1>Contact Us</h1>
      <div>
        <div><b>Full Name</b>: ${name}</div>
        <div><b>Phone</b>: ${phone}</div>
        <div><b>Email</b>: ${email}</div>
        <div><b>Company Url</b>: ${url}</div>
        <div><b>Description</>: ${description}</div>
      </div>
    `;

    const mailOptions = {
      html,
      subject: 'Partnership',
      from: 'Kits Chocolate Website',
      to: 'greedisgood214@gmail.com'
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('-----transporter-----', error, info);

        return res.send(error.toString());
      }

      return res.send('Sended');
    });
  });
});
