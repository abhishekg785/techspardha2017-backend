var DB = require('./../database/db').DB;

var studentUsers = DB.Model.extend({
   tableName: 'studentUsers',
   idAttribute: 'Id',
});

module.exports = {
   User: studentUsers
};
