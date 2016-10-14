var DB = require('./../database/db').DB;

var studentUsers = DB.Model.extend({
  tableName: 'studentUsers',
  idAttribute: 'Id'
});

var studentDetails = DB.Model.extend({
  tableName: 'studentDetails',
  idAttribute: 'Id'
});

var eventsList = DB.Model.extend({
  tableName: 'eventsList',
  idAttribute: 'EventId'
});

var adminUser = DB.Model.extend({
  tableName: 'adminUser',
  idAttribute: 'Id'
});
var userEvents = DB.Model.extend({
  tableName: 'userEvents',
});

module.exports = {
   User: studentUsers,
   Details: studentDetails,
   Admin: adminUser,
   Event: eventsList,
   UserEvents:userEvents,
};
