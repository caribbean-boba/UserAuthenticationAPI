const db = require('../db/db');

const User = db.Model.extend({
  tableName: 'login_user',
  hasSecurePassword: 'password_bash'
});

module.exports = User;