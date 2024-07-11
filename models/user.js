const { DataTypes } = require('sequelize');
const db = require('./DB'); // استيراد الاتصال بقاعدة البيانات الخاصة بك

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    img_uri: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

User.associate = models => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
    User.hasMany(models.Massage, { as: 'SentMessages', foreignKey: 'senderId' });
    User.hasMany(models.Massage, { as: 'ReceivedMessages', foreignKey: 'receiverId' });

    User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Followers',
        foreignKey: 'followedId'
    });

    User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Following',
        foreignKey: 'followerId'
    });
};

module.exports = User;
