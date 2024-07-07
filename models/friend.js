const {Sequelize,DataTypes}=require('sequelize')
const db=require('./DB')
const Friend=db.define('Friend',{})
Friend.associte=models=>{
   Friend.belongsTo(models.User)


}
module.exports=Friend