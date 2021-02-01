const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "123456",
  database: "transliterate",
});


exports.queryWrappedWithPromise = queryWrappedWithPromise
