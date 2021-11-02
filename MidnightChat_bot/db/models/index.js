const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.creators = require("./creators.model.js")(sequelize, Sequelize);
/* db.role = require("../models/roles.model.js")(sequelize, Sequelize);
db.company = require("../models/companies.model.js")(sequelize, Sequelize);
db.ad = require("../models/ads.model.js")(sequelize, Sequelize);
db.application = require("../models/applications.model.js")(sequelize, Sequelize); */

//Create foreign key id_company linking a company to its users (user employers)
/* db.user.belongsTo(db.company, { foreignKey: 'id_company' });
db.company.hasMany(db.user, { foreignKey: 'id_company' }); */

//Create foreign key id_employer linking an ad to its poster (user employers)
/* db.ad.belongsTo(db.user, { foreignKey: 'id_employer' });
db.user.hasMany(db.ad, { foreignKey: 'id_employer' }); */

//Create foreign key id_user linking an application to its poster (user)
/* db.application.belongsTo(db.user, { foreignKey: 'id_user' });
db.user.hasMany(db.application, { foreignKey: 'id_user' }); */

/* db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});


db.ROLES = ["user", "employer", "admin"]; */

module.exports = db;