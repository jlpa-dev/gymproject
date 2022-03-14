const functions = require("firebase-functions");
const { db } = require("./config");
const express = require("express");
const { checkSchema } = require("express-validator");
const {filesUpload} = require("./middlewares/filesUpload");
const validator = require("./middlewares/validator");
const cors = require('cors')({origin: true});
const {updateTotalDocs} = require("./helper/meta")

const {
    addExercise,
    filterExercises,
    getExercise,
    delExercise,
    updateExercise
} = require("./controllers/exerciseController");

const {
    exercisesSchema,
} = require("./schemas/exercisesSchema");

const app = express();
app.use(cors)
app.get("/", (req, res) => res.status(200).send("API"));

app.post("/exercises", filesUpload, validator(exercisesSchema.ADD), addExercise);
app.get("/exercises/:id", validator(exercisesSchema.GET), getExercise);
app.patch("/exercises/:id",filesUpload, updateExercise);
app.delete("/exercises/:id", delExercise);
app.get("/exercises", filterExercises);

// TRIGGERS
exports.triggerExerciseCreate = functions.firestore
  .document('exercises/{id}')
  .onCreate(async (event, context) => {
        await updateTotalDocs('exercises', 1)
  })

exports.triggerExerciseDelete = functions.firestore
.document('exercises/{id}')
.onDelete(async (event, context) => {
      await updateTotalDocs('exercises', -1)
})

// APP
exports.app = functions.runWith({
    timeoutSeconds: 540
}).https.onRequest(app);

