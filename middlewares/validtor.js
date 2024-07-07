const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Invalid email address'),
        body('name').notEmpty().withMessage('Name is required'),
        body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('userName').notEmpty().withMessage('userName is required'),
    ];
};

const updateUserValidationRules = () => {
    return [
        body('name').notEmpty().isLength({ min: 1 }).withMessage('Name is required'),
        body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ];
};

const postValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
        body('step').notEmpty().withMessage('Step is required')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    userValidationRules,
    validate,
    updateUserValidationRules,
    postValidationRules
};


