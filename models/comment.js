const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')
const Comment=db.define('Comment',{
    Text:{
        type:Sequelize.DataTypes.TEXT
    }
})
Comment.associte=models=>{
    Comment.belongsTo(models.User)
    Comment.belongsTo(models.Post)

 
 }

module.exports=Comment