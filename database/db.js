var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techspardha2017',
    charset  : 'utf8'
    }
});

var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;
