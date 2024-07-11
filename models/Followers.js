const { Sequelize, DataTypes } = require('sequelize');
const db = require('./DB');

const Follower = db.define('Follower', {
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // يجب أن يكون مطابقًا لاسم الجدول المستخدم
      key: 'id'
    }
  },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
});

// تأكد من تعريف العلاقة بين النموذجين
Follower.associate = function(models) {
    //fo
  Follower.belongsTo(models.User, { as: 'Follower', foreignKey: 'followerId' });
  Follower.belongsTo(models.User, { as: 'Followed', foreignKey: 'followedId' });
};

module.exports = Follower;
