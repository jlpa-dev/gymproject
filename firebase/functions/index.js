const functions = require("firebase-functions");
const {updateTotalDocs} = require("./helper/meta")


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

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

    if (authUser.email) {
      const customClaims = {
        user: true,
      };
      try {
        var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
  
        return db.collection("roles").doc(authUser.uid).set({
          email: authUser.id,
          role: customClaims
        })
  
      } catch (error) {
        console.log(error)
      }
  
    }
  
  });

