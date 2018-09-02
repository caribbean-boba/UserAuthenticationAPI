const knex = require('knex');
const knexDb = knex({ client: 'pg', connection: 'postgres://localhost/walkthru' });
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;