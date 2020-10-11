module.exports = (sequelize, Sequelize) => {
    const Videos = sequelize.define("videos", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.STRING
        },
        like: {
            type: Sequelize.INTEGER
        },
        share: {
            type: Sequelize.INTEGER
        },
        startDate: {
            type: Sequelize.DATE
        },
        rating: {
            type: Sequelize.INTEGER
        },
        isactive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Videos;
};