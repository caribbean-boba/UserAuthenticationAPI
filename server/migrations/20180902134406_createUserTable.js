exports.up = function (knex, Promise) {
    return knex.schema.createTable('user_information', t => {
      t.increments('id').unsigned().primary();
      t.string('email').notNull();
      t.string('password_hash').notNull();
      t.enum('admin',['web', 'not-web']).notNull();
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user_information');
  };