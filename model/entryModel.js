const sequelize = require("sequelize");
const db = require("../config/database");
var  entry = db.define(
    "entries",
    {
        id: { type: sequelize.INTEGER, primaryKey: true },
        name: { type: sequelize.STRING },
        emailId: { type: sequelize.STRING },
        activedays: { type: sequelize.STRING },
        value: { type: sequelize.INTEGER },
        criteria: { type: sequelize.BOOLEAN},
        phoneNumber: { type: sequelize.STRING },
        pricesig: {type:sequelize.STRING},
        created_at: { type: sequelize.NOW },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: false,
    }
);
entry.removeAttribute('id');
module.exports = entry;
