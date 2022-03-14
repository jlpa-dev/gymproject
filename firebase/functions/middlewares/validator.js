const { validationResult, checkSchema } = require('express-validator');

const validate = schema => {
    return async (req, res, next) => {

        const validations = await checkSchema(schema);

        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: errors.array()
        });
    };
};

module.exports = validate