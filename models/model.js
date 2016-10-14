var DB = require('./../database/db').DB;

var studentUsers = DB.Model.extend({
  tableName: 'studentUsers',
  idAttribute: 'Id'
});

var studentDetails = DB.Model.extend({
  tableName: 'studentDetails'
});

var eventsList = DB.Model.extend({
  tableName: 'eventsList',
  idAttribute: 'EventId'
});

var adminUser = DB.Model.extend({
  tableName: 'adminUser',
  idAttribute: 'Id'
});

module.exports = {
   User: studentUsers,
   Details: studentDetails,
   Admin: adminUser,
   Event: eventsList
};
