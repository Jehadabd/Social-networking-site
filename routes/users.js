const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const jwt=require('../middlewares/authentication')
const validator = require('../middlewares/validtor');
const upload=require('../middlewares/apload')

router.post('/account', validator.userValidationRules(), validator.validate, userController.register);



router.post("/login",  userController.login)
router.get('/accountProfile',jwt,userController.getProfile)
router.put('/account/profile/updata/photo',upload.single('avatar'),jwt,userController.uploadUserPhoto)
router.put('/account/profile/updata',jwt,validator.updateUserValidationRules(),validator.validate,userController.updataProfile)

module.exports = router;
