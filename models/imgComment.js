const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')
const imgComment=db.define('imgComment',{
    img_url:{
        type:Sequelize.DataTypes.STRING
    }
})

imgComment.associte=models=>{
    imgComment.belongsTo(models.Comment)
 }
module.exports=imgComment