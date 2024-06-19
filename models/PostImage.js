const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')
const PostImage=db.define('postImage',{
    img_url:{
        type:Sequelize.DataTypes.STRING
    }
})
PostImage.associte=models=>{
    PostImage.belongsTo(models.Post)
 }
module.exports=PostImage