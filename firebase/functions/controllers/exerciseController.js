const { db, storage } = require("../config");
const randomstring = require("randomstring");
const { firestore } = require("firebase-admin")

const filterExercises = async (req, res) => {
    try {
        const { page, per_page } = req.query;
        const allExercises = []
        const query = await db.collection('exercises')
        .orderBy("created","desc")
        .where('estado','==', 1)
        // .startAt(page==1?0:page*per_page)
        .limit(parseInt(per_page))
        .get()

        const meta = await db.collection('exercises').doc('meta').get()
        .then((docRef) => { return docRef.data() });
        
        query.forEach((doc) => {
                allExercises.push(doc.data())
        })
        
        const response = {
            success: true,
            data: allExercises,
            total: meta.numberOf
        }
        
        return res.status(200).json(response)
    } catch (error) { 
        console.log(res.status(500).json(error.message))
        const response = {
            success: true,
            data: [],
            total: 0
        }
        
        return res.status(200).json(response)
    }
}

const getExercise = async (req, res) => {
    try {
        const { id } = req.params
        const exercise = await db.collection('exercises').doc(id).get()
        .then((docRef) => { return docRef.data() });
        const response = {
            success: true,
            data: exercise
        }
        return res.status(200).json(response)
    } catch (error) { return res.status(500).json(error.message) }
}

const updateExercise = async (req, res) => {
    const { nombre, descripcion, tipo, sugerencias, peso_sugerido, series_sugeridas } = req.body
    const { portada = [] } = req.files
    const { id } = req.params
    try {
        const exercise = db.collection('exercises').doc(id)
        let uploads = []
        console.log(portada)
        if(portada.length>0){
            for (let index = 0; index < portada.length; index++) {
                const file = portada[index];
                const ext = file.originalname.split('.').pop()
                const fileName = randomstring.generate({
                    length: 24,
                    charset: 'alphanumeric'
                })
                
                const filePath = `gym/exercises/${fileName}.${ext}`
                const ufile = storage.file(filePath, {
                    uploadType: {resumable: false}
                });
            
                await ufile.save(file.buffer,{
                    metadata: {
                        contentType: file.mimeType,
                    },
                    predefinedAcl: 'publicRead'
                });
                const metaData = await ufile.getMetadata()
                const url = metaData[0].mediaLink

                uploads.push({
                    id: fileName,
                    name: fileName,
                    original_name: file.originalname,
                    path: filePath,
                    mimetype: file.mimeType,
                    mediaLink: url,
                    ext
                })

            }
        }

        const exerciseObject = {
            nombre,
            descripcion,
            peso_sugerido,
            series_sugeridas,
            tipo,
            sugerencias,
            estado: 1
        }

        if(uploads.length>0){
            exerciseObject.portada = uploads
        }

        console.log(exerciseObject)
        
        exercise.update(exerciseObject)
        
        res.status(200).send({
            status: 'success',
            message: 'Se agregó el registro correctamente',
            data: exerciseObject
        })
       
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const addExercise = async (req, res) => {
    const { nombre, descripcion, tipo, sugerencias, peso_sugerido, series_sugeridas } = req.body
    const { portada } = req.files
    try {
        const exercise = db.collection('exercises').doc()
        let uploads = []

        for (let index = 0; index < portada.length; index++) {
            const file = portada[index];
            const ext = file.originalname.split('.').pop()
            const fileName = randomstring.generate({
                length: 24,
                charset: 'alphanumeric'
            })
            
            const filePath = `gym/exercises/${fileName}.${ext}`
            const ufile = storage.file(filePath, {
                uploadType: {resumable: false}
            });
        
            await ufile.save(file.buffer,{
                metadata: {
                    contentType: file.mimeType,
                  },
                  predefinedAcl: 'publicRead'
            });
            const metaData = await ufile.getMetadata()
            const url = metaData[0].mediaLink

            uploads.push({
                id: fileName,
                name: fileName,
                original_name: file.originalname,
                path: filePath,
                mimetype: file.mimeType,
                mediaLink: url,
                ext
            })

        }


        const exerciseObject = {
            id: exercise.id,
            nombre,
            descripcion,
            portada: uploads,
            peso_sugerido,
            series_sugeridas,
            tipo,
            sugerencias,
            estado: 1,
            created: firestore.FieldValue.serverTimestamp()
        }
        
        exercise.set(exerciseObject)
        
        res.status(200).send({
            status: 'success',
            message: 'Se agregó el registro correctamente',
            data: exerciseObject
        })
       
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const delExercise = async (req, res) => {
    const { id } = req.params

    try {
        const exercise = await db.collection('exercises').doc(id)
        await exercise.delete()

        res.status(200).send({
            status: 'success',
            message: 'Se eliminó'
        })
       
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    addExercise,
    filterExercises,
    delExercise,
    getExercise,
    updateExercise
}