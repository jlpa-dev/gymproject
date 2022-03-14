const { firestore } = require('firebase-admin')
const { db } = require('../config')

const updateTotalDocs =  async (collection, increment) => {
    const docsmeta = db.collection(collection).doc('meta')
    const docdata = await docsmeta.get();
    const numberOf = firestore.FieldValue.increment(increment);
    if (!docdata.exists) {
        docsmeta.set({
            numberOf
        })
    } else {
        docsmeta.update({
            numberOf
        })
    }
}


module.exports = {
    updateTotalDocs
}