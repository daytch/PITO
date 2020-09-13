module.exports = (sequelize, Sequelize) => {
    const Merchant = sequelize.define("vw_merchant", {
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
        }
    });

    return Merchant;
};