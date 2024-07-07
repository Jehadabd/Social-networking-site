const models=require('../models')
exports.like=async(req,res)=>{

    try {
        const userliked= await models.Like.findOne({where:{
            userId:req.currentUser.id,PostId:req.params.id
        }})
       
        if(userliked){
            await models.Like.destroy({where:{
                userId:req.currentUser.id,PostId:req.params.id
            }})
            res.status(200).json({
                msg:"done of delete the like"
            })
        }
        else{
            await models.Like.create({
                userId:req.currentUser.id,PostId:req.params.id
            })
        res.status(500).json({
            error: error.message
        })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.likeCount=async(req,res)=>{
    try {
        const likes=await models.Like.findAll({where:{
            PostId:req.params.id
        }})
        console.log(likes.length)
        res.status(200).json({
            like:likes.length
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}