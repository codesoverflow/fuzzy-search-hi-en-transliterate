





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

function getPostById(postId) {
  const sql = "SELECT * FROM `posts` WHERE `id` = ?";
  return queryWrappedWithPromise(sql, [postId]);
}

async function process() {
  connection.connect();
  const res = await getPostById(1);
  connection.end();

  console.log("res", res);
}

process();
