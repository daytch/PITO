module.exports = (sequelize, Sequelize, user, role) => {
    const UserRoles = sequelize.define("user_roles", {
        roleId: {
            type: Sequelize.INTEGER,
            references: {
                model: role,
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: user,
                key: 'id'
            }
        },
    });
    return UserRoles;
};