const { db } = require("../config");

const getAllExercises = async (req, res) => {
    try {
      const allExercises = []
      const querySnapshot = await db.collection('exercises').get()
      querySnapshot.forEach((doc) => allExercises.push(doc.data()))
      return res.status(200).json(allExercises)
    } catch(error) { return res.status(500).json(error.message) }
  }

  const addExercise = async (req, res) => {
    const { title, text } = req.body
    try {
      const entry = db.collection('exercises').doc()
      const entryObject = {
        id: entry.id,
        title,
        text,
      }
  
      entry.set(entryObject)
  
      res.status(200).send({
        status: 'success',
        message: 'entry added successfully',
        data: entryObject
      })
    } catch(error) {
        res.status(500).json(error.message)
    }
  }

  module.exports = { 
      addExercise,
      getAllExercises
    }