const express = require('express');
const router = express.Router();
const jwt=require('../middlewares/authentication')
const validator = require('../middlewares/validtor');

const post=require('../controller/postController')
const upload=require('../middlewares/apload')
router.post('/post',upload.array('postImg',12),jwt,validator.postValidationRules(),validator.validate,post.nwePost)
router.get('/getAllPosts',jwt,post.getAllpost)
router.get('/getPost/:postId',jwt,post.getPost)
router.get('/getMyPost',jwt,post.getMyPost)
router.put('/updatePost/:postId',upload.array('postImg',12),jwt,validator.postValidationRules(),validator.validate,post.updatePost)

module.exports=router