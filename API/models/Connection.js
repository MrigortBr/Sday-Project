//Conexão com banco de dados
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'apiSday'
    }
  });

module.exports = knex