const tr = require("transliteration").transliterate;

const result = tr("उमा लहरी भजन आरती संग्रह", {
  replace: { from: "hi", to: "en" },
});

console.log("resutl", result);

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "123456",
  database: "transliterate",
});

/**
 * SELECT ID FROM posts where post_status = 'publish' 
    AND post_type = 'post'
 */

// con.connect(function (err) {
//   if (err) throw err;
//   const sql =
//     "INSERT INTO posts (title, description) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });

function getPostById() {
  return new Promise((resolve) => {
    connection.query(
        {
          sql: "SELECT * FROM `posts` WHERE `title` = ?",
          timeout: 40000, // 40s
          values: ["Company Inc"],
        },
        function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)
          
          console.log("results", results)
          resolve(results)
          
        }
      );
  });
}

connection.connect();
getPostById();
connection.end();
