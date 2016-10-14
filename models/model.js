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
  idAttribute: 'eventName'
});

var adminUsers = DB.Model.extend({
  tableName: 'adminUsers',
  idAttribute: 'Id'
});

module.exports = {
   User: studentUsers,
   Details: studentDetails,
   Admin: adminUsers,
   Event: eventsList
};
