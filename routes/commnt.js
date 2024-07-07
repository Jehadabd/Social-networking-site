const express = require('express');
const router = express.Router();
const jwt=require('../middlewares/authentication')


const upload=require('../middlewares/apload')
const comment=require('../controller/commentController')
router.post('/post/addComment/:postId',jwt,upload.array('commentImg',12),comment.cerateComment)
router.delete('/post/deleteComment/:postId',jwt,comment.deleComment)
router.get('/post/getComment/:postId',jwt,comment.getTheComeent)
module.exports=router