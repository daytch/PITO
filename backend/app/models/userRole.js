const bookshelf = require('./base');
const Role = require('./role');
const User = require('./user');

const UserRole = bookshelf.Model.extend({
    tableName: 'users_roles',
    hasTimestamps: true,
    roles: function () {
        return this.hasMany(Role);
    },
    users: function () {
        return this.hasMany(User);
    }
});

module.exports = bookshelf.model('UserRole', UserRole);