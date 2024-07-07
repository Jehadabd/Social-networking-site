const { Sequelize } = require("sequelize")

const db=require('./DB')
const User=require('./user')
const Post=require('./Post')
const PostImage = require("./PostImage")
const Comment=require('./comment')
const Like=require('./Like')
const Friend=require('./friend')
const imgComment=require('./imgComment')
const models={
    User:User,
    Post:Post,
    PostImage:PostImage,
    Comment:Comment,
    Like:Like,
    Friend:Friend,
    imgComment:imgComment
}
Object.keys(models).forEach(key=>{
    if('associte'in models[key]){
        models[key].associte(models)
    }
})
module.exports=models;