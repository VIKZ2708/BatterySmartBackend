const sequelize = require("sequelize");
const db = require("../config/database");
var     user = db.define(
    "tasks",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        name: { type: sequelize.STRING },
        emailId: { type: sequelize.STRING },
        dateparam: { type: sequelize.DATE },
        value: { type: sequelize.INTEGER },
        phoneNumber: { type: sequelize.STRING },
        created_at: { type: sequelize.NOW },

    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
user.removeAttribute('id');


module.exports = user;
