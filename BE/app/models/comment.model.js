module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        videoId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING
        },
        isactive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Comment;
};