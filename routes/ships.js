var express = require('express');
var router = express.Router();
var databaseFunctions = require('../model/database')
var mySql = require('mysql2')


router.get('/', function(req, res, next) {
    res.render('ships', { title: 'ships' });
  });

  router.post('/create', function(req, res, next) {
      //databaseFunctions.databaseFunctions();
      databaseFunctions.databaseFunctionsPromises();

      console.log("Database oprettet")
    res.render('ships', { title: 'ships' });
  });

  router.post('/append', async function(req, res, next) {
    //databaseFunctions.databaseFunctions();
    let result = await databaseFunctions.appendTable();
    console.log(result);

    console.log("Database oprettet")
  res.render('ships', { data: result[0] });
});



module.exports = router;