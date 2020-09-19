exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('company').notNullable();
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.integer('contact').defaultTo(null);
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
