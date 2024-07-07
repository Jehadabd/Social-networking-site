const model = require('../models')
exports.cerateComment = async (req, res) => {
    const { text } = req.body
    const url = req.protocol + '://' + req.get('host')
    try {
        const comment = await model.Comment.create({
            Text: text, PostId: req.params.postId,
            userId: req.currentUser.id
        })
        console.log(1)
        req.files.map(async (file) => {

            const commetImg = await model.imgComment.create({
                img_url: url + '/photo/postPhoto/' + file.filename,
                CommentId: comment.id
            })
        })

        res.status(200).json({
            msg: "is append the comment"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.deleComment = async (req, res) => {
    try {
        const comment = await model.Comment.findOne({ where: { id: req.params.postId } })
        const commentImg = await model.imgComment.findOne({ where: { CommentId: comment.id } })
        if (req.currentUser.id == comment.userId) {
           
            await comment.destroy()
           if(commentImg!==null){
            await commentImg.destroy()
           }
        }

        else {
            console.log(2)
            res.status(500).json({
                error: 'you are not have the comment'
            });
        }
        res.status(200).json({
            msg: "done"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

exports.getTheComeent = async (req, res) => {

    const id = req.params.postId
    try {
        const getComent = await model.Comment.findAll({
            where: { PostId: id },

            include: [{
                model: model.User,

                attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt', 'id'] }
            }, {
                model: model.imgComment,
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'id','CommentId'] }

            }

            ]

        })

        res.status(200).json({
            getComent: getComent
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}