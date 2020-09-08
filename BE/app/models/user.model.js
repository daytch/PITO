module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdby: {
            type: Sequelize.STRING,
            allowNull: false
        },
        modified: {
            type: Sequelize.DATE
        },
        modifiedby: {
            type: Sequelize.STRING
        },
        isactive: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};