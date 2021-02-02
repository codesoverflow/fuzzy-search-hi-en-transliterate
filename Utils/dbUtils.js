const mysql = require("mysql");
const configs = require("../configs/configs")

const dbConfigs = configs.dbConfigs
const connection = mysql.createConnection(dbConfigs);


function queryWrappedWithPromise(conn, sql, values) {
  return new Promise((resolve) => {
    conn.query(
      {
        sql: sql,
        timeout: 40000, // 40s
        values: values,
      },
      function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)

        if (error) {
          console.log("error", error);
        }
        resolve(results);
      }
    );
  });
}

exports.queryWrappedWithPromise = queryWrappedWithPromise
exports.connection = connection
