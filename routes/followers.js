const express = require('express');
const router = express.Router();
const jwt=require('../middlewares/authentication')
const Follow=require('../controller/followersController')
router.post('/:id',jwt,Follow.Follow)
router.get('/followers/:id',jwt,Follow.getFollowers)
router.get('/following/:id',jwt,Follow.getFollowing)
router.get('/followers',jwt,Follow.getMyFollowers)
router.get('/following',jwt,Follow.getMyFollowing)



module.exports=router