const db = require('./DB');
const User = require('./user');
const Post = require('./Post');
const Comment = require('./comment');
const Massage = require('./massage');
const Follower = require('./Followers'); 
const like=require('./Like')
const imgComment=require('./imgComment')
const PostImage = require("./PostImage")

const models = {
    User: User,
    Post: Post,
    Comment: Comment,
    Massage: Massage,
    Follower: Follower,
    Like:like,
    imgComment:imgComment,
    PostImage:PostImage,

};

Object.keys(models).forEach(key => {
    if (models[key].associate) {
        models[key].associate(models);
    }
});

db.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log('Error creating database & tables: ', err));

module.exports = models;
