const { Sequelize ,DataTypes} = require("sequelize")

const db=require('./DB')


const User=db.define('user',{
    name:{
        type:Sequelize.DataTypes.STRING,
        
    },
    email:{
        type:Sequelize.DataTypes.STRING,
        unique:true,
        
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        

    },
    img_uri:{
        type:Sequelize.DataTypes.STRING

    },
    userName:{
        type:Sequelize.DataTypes.STRING,
        unique:true,
        allowNull:false
    }


})


db.sync({ force: false }) // تأكد من أن هذا لا يقوم بحذف الجدول إذا كان موجودًا
    .then(() => {
        console.log('Database & tables created!');
    });
User.associte=models=>{
    User.hasMany(models.Post)
    User.hasMany(models.Comment)
    User.hasMany(models.Friend)
}

module.exports=User;
