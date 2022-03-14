const { db, storage } = require("../config");

const exercisesSchema = {
    ADD: {
        nombre: {
            notEmpty: true,
            in: ['body'],
            custom: {
                options: async (value) => {
                  const exercise = await db.collection("exercises").doc(value);
                  if(exercise.empty){
                      return Promise.reject("Nombre ya está en uso");
                  }

                  return Promise.resolve()
                },
              }
        },
        descripcion: {
            notEmpty: true,
            in: ['body'],
        },
        sugerencias: {
            notEmpty: true,
            in: ['body'],
            //   errorMessage: "Número de teléfono ",
        },
        tipo: {
            notEmpty: true,
            in: ['body'],
            //   errorMessage: "Número de teléfono ",
        },
        files: {
            custom: {
                options: (value, { req, path }) => {
                    return !!req.files.portada
                },
                errorMessage: 'Se requiere la imagen de portada',
            }
        },
    },
    UPDATE: {
        nombre: {
            notEmpty: true,
            in: ['body'],
            // custom: {
            //     options: async (value) => {
            //       const exercise = await db.collection("exercises").doc(value);
            //       if(exercise.empty){
            //           return Promise.reject("Nombre ya está en uso");
            //       }

            //       return Promise.resolve()
            //     },
            //   }
        },
        descripcion: {
            notEmpty: true,
            in: ['body'],
        },
        sugerencias: {
            notEmpty: true,
            in: ['body'],
            //   errorMessage: "Número de teléfono ",
        },
        tipo: {
            notEmpty: true,
            in: ['body'],
            //   errorMessage: "Número de teléfono ",
        },
    },
    GET: {
        id: {
            notEmpty: true,
            in: ['params']
        },
    },
    DELETE: {
        id: {
            notEmpty: true,
            in: ['params']
        },
    }

};

module.exports = {
    exercisesSchema,
};
