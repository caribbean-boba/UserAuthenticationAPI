const db = require('../db/db');

const User = db.Model.extend({
  tableName: 'user_information',
  hasSecurePassword: 'password_hash'
});

module.exports = User;