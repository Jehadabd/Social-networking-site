const{Sequelize}=require('sequelize')
require('dotenv').config()
const DB= new Sequelize(process.env.NAME,process.env.NAME_DB,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT
   
})
DB.authenticate().then(()=>{
    console.log(' connection')
}).catch(err=>{
    console.log('no connection')
})
module.exports=DB