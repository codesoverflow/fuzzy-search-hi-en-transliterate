function queryWrappedWithPromise(sql, values) {
  return new Promise((resolve) => {
    connection.query(
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
