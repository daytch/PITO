
exports.up = function(knex) {
    return knex.schema.createTable('users_roles', function(table) {
      table.increments();
      table.integer('userId')
      .unsigned()
      .index()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
      table.integer('roleId')
      .unsigned()
      .index()
      .references('id')
      .inTable('role')
      .onDelete('SET NULL');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_roles');
};
