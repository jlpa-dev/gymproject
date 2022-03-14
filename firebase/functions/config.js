const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
        projectId: functions.config().project.id,
        clientEmail: functions.config().client.email,
    }),
    databaseURL: "https://[your_project_id].firebaseio.com",
});

const db = admin.firestore();
const firestore = admin.firestore;
const storage = admin.storage().bucket(`gs://gymapp-40596.appspot.com`);

module.exports = { admin, db, storage, firestore };