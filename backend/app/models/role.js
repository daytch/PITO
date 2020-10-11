const bookshelf = require('./base');
const User = require('./user');

const Role = bookshelf.Model.extend({
    tableName: 'roles',
    hasTimestamps: true,
    // user: () => {
    //     return this.belongsToMany(User, 'users_roles', 'userId', 'roleId')
    // },
    users_roles:function(){
        return this.belongsTo('users_roles');
    }
});

module.exports = bookshelf.model('Role', Role);