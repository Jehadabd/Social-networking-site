const { where } = require('sequelize');
const models = require('../models');
const { post } = require('../routes');
exports.nwePost = async (req, res) => {
    const { title, content, step, country, region } = req.body;
    const url = req.protocol + '://' + req.get('host')
    try {
        const post = await models.Post.create({
            title,
            content,
            country,
            step,
            region,
            userId: req.currentUser.id,
        });
        req.files.map(async (file) => {
            const postImg = await models.PostImage.create({
                img_url: url + '/photo/postPhoto/' + file.filename,
                PostId: post.id
            })
        })
        res.status(200).json({
            message: "The post is inserted",
            post
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.getAllpost = async (req, res) => {
    try {
        const getPosts = await models.Post.findAll({
            include: [
                {
                    model: models.User,
                    attributes: { exclude: ['password', 'email'] }
                }, {
                    model: models.PostImage
                }
            ]
        })
        res.status(200).json(getPosts)
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.getPost = async (req, res) => {
    try {
        const post = await models.Post.findOne({
            where: {
                id: req.params.postId
            },
            include: [
                {
                    model: models.User,
                    attributes: { exclude: ['password', 'email'] }
                },
                { model: models.PostImage }
            ]
        });

        console.log(req.params.postId);  // للتحقق من البيانات المسترجعة

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.getMyPost = async (req, res) => {
    try {
        const post = await models.Post.findAll({
            where: {
                userId: req.currentUser.id
            },
            include: [
                { model: models.PostImage }
            ]
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.updatePost = async (req, res) => {
    const { title, content, country, step, region } = req.body;
    const url = req.protocol + '://' + req.get('host');
    try {
        const post = await models.Post.findOne({
            where: { id: req.params.postId },
            include: [{ model: models.PostImage }]
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (title !== undefined) post.title = title;
        if (content !== undefined) post.content = content;
        if (country !== undefined) post.country = country;
        if (step !== undefined) post.step = step;
        if (region !== undefined) post.region = region;

        if (req.files && req.files.length > 0) {
            // جمع مسارات الصور الجديدة
            const newImagePaths = req.files.map(file => url + '/photo/postPhoto/' + file.filename);
            // تحديث الصور الموجودة أو إضافة الصور الجديدة
           await Promise.all(newImagePaths.map(async (imgPath) => {
                const existingImage = await models.PostImage.findOne({
                    where: {
                        PostId: post.id,
                        img_url: imgPath
                    }
                });
                if (!existingImage) {
                    // إذا لم تكن الصورة موجودة، قم بإنشاء سجل جديد
                    await models.PostImage.create({
                        PostId: post.id,
                        img_url: imgPath
                    });
                }
            }));
            // التحقق من الصور القديمة وحذفها إذا لم تعد موجودة في التحديث
             await Promise.all(post.PostImages.map(async (postImg) => {
                if (!newImagePaths.includes(postImg.img_url)) {
                    // حذف الصورة القديمة
                    await postImg.destroy();
                }
            }));
        }
        await post.save();
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
