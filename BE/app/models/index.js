const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,

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

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.video = require("../models/videos.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
// db.userroles = require('../models/userRoles.model.js')(sequelize, Sequelize, db.user, db.role);
db.merchant = db.sequelize.query();//("SELECT * FROM `vw_merchant`", { type: sequelize.QueryTypes.SELECT });

db.role.belongsToMany(db.user, {
    through: 'user_roles', foreignKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_roles', foreignKey: 'roleId'
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;