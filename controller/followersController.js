const models = require('../models');
//followedId هو الشخص الذي تقوم انته بمتابعته
exports.Follow = async (req, res) => {
    const followerId = req.currentUser.id
    try {
        console.log(followerId)
        const follow = await models.Follower.create({ followerId, followedId: req.params.id })
        res.status(201).json(follow);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.getFollowers = async (req, res) => {
    // استرجاع متابعين مستخدم معين
    try {
        const followers = await models.Follower.findAll({
            where: { followedId: req.params.id }
      
        });

        const result = await Promise.all(followers.map(async (f) => {
            const user = await models.User.findOne({ where: { id: f.followerId } });
            return {
             
                name: user.name,
                userName: user.userName
            };
        }));
        
       
       console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.getFollowing = async (req, res) => {
    // استرجاع المستخدمين الذين يتابعهم مستخدم معين
    const { id } = req.params;
    try {
        const following = await models.Follower.findAll({
            where: { followerId: id }, include: [{
                model: models.User, as: 'Followed', attributes: { exclude: ['password', 'email'] }
            }]
        });
        res.status(200).json(following);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
exports.getMyFollowers = async (req, res) => {
   
    try {
        const followers = await models.Follower.findAll({
            where: { followedId: req.currentUser.id }
      
        });

        const result = await Promise.all(followers.map(async (f) => {
            const user = await models.User.findOne({ where: { id: f.followerId } });
            return {
                id: user.id,
                name: user.name,
                userName: user.userName
            };
        }));
        
       
       console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.getMyFollowing = async (req, res) => {
    // استرجاع المستخدمين الذين يتابعهم مستخدم معين

    try {
        const following = await models.Follower.findAll({
            where: { followerId: req.currentUser.id }, include: [{
                model: models.User, as: 'Followed', attributes: { exclude: ['password', 'email'] }
            }]
        });
        res.status(200).json(following);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}