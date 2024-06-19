const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')

const Post=db.define('Post',{

    title:{
        type:Sequelize.DataTypes.STRING
    },
    content:{
        type:Sequelize.DataTypes.TEXT
    },
    step:{
        type:Sequelize.DataTypes.JSON
    },
    country:{
        type:Sequelize.DataTypes.STRING
    },
    region:{
        type:Sequelize.DataTypes.STRING
    },

})
Post.associte=models=>{
   Post.belongsTo(models.User)
   Post.hasMany(models.PostImage)
   Post.hasMany(models.Comment)

}

module.exports=Post;