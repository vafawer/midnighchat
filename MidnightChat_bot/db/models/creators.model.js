module.exports = (sequelize, Sequelize) => {
    const bcrypt = require("bcryptjs");
    const Creators = sequelize.define("creators", {
        tg_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tg_userName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        /*  password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "You must chose a password"
                },
                notEmpty: {
                    msg: "You must chose a password"
                },
                len: {
                    arg: [1 - 20],
                    msg: "Your password should be at least 1 character long."
                }
            }
        },
        confirmationPassword: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
        }, */
        verif_code: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        moderated: {
            type: Sequelize.BOOLEAN, 
            allowNull: false,
            defaultValue: false,
        },
        balance: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        /*gender: {
            type: Sequelize.STRING,
            allowNull: false,
        }, */
    });

    return Creators;
};