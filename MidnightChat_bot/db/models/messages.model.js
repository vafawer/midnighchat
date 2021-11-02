var dbConn = require('./../config/server');

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    return Message;
};