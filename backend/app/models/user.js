const bookshelf = require('./base');
const Role = require('./role');

const User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    role: () => {
        return this.belongsToMany(Role, 'users_roles', 'userId', 'roleId')
    }
});

module.exports = bookshelf.model('User', User);