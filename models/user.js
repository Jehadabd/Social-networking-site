const { Sequelize ,DataTypes} = require("sequelize")

const db=require('./DB')


const User=db.define('user',{
    name:{
        type:Sequelize.DataTypes.STRING
    },
    eamil:{
        type:Sequelize.DataTypes.STRING,
        unique:true
    },
    password:{
        type:Sequelize.DataTypes.STRING

    },
    img_uri:{
        type:Sequelize.DataTypes.STRING

    }
})
User.associte=models=>{
    User.hasMany(models.Post)
    User.hasMany(models.Comment)
}

module.exports=User;