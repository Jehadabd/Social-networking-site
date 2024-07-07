const express = require('express');
const router = express.Router();
const jwt=require('../middlewares/authentication')
const like=require('../controller/likecontroller')
router.put('/:id',jwt,like.like)
router.get('/:id',jwt,like.likeCount)

module.exports=router