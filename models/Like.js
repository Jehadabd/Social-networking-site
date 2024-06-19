const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')
const Like=db.define('Like',{})
Like.associte=models=>{
    models.User.belongsToMany(models.Post,{through:"Like"})
    models.Post.belongsToMany(models.User,{through:"Like"})

}
module.exports=Like