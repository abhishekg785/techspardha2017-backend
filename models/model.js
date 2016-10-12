var DB = require('./../database/db').DB;

var studentUsers = DB.Model.extend({
   tableName: 'studentUsers',
   idAttribute: 'Id',
});

var studentDetails = DB.Model.extend({
    tableName: 'studentDetails',
    idAttribute: 'Id',
});

module.exports = {
   User: studentUsers,
   Details: studentDetails
};
