const { Sequelize, DataTypes } = require('sequelize');
const db = require('./DB'); // استيراد الاتصال بقاعدة البيانات الخاصة بك
const massage=db.define('massage',{
 
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        timestamp: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      });

massage.associte=models=>{
    massage.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    massage.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });


}

module.exports=massage
