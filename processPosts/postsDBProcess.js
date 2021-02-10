const dbUtils = require("../Utils/dbUtils");
const transliterateUtils = require("../Utils/transliterationUtils");
const connection = dbUtils.connection;

function getPostById(postId) {
  const sql = "SELECT * FROM `posts` WHERE `postId` = ?";
  return dbUtils.queryWrappedWithPromise(connection, sql, [postId]);
}

function insertPost(post) {
  const title = post.title.rendered;
  const slug = post.slug;
  const postId = post.id;
  const content = post.content.rendered;
  const postJson = JSON.stringify(post);
  const transliteratedTitle = transliterateUtils.transliterate(title);
  const transliteratedSlug = transliterateUtils.replace(slug, ['lyrics', '-'], ['', ' ']);
  const sql = `INSERT INTO posts (title, slug, postId) 
    VALUES (?, ?, ?)`;

  return dbUtils.queryWrappedWithPromise(connection, sql, [
    transliteratedTitle,
    transliteratedSlug,
    postId,
    // content,
    // postJson,
  ]);
}

async function processPostDB(post) {
  const postId = post.postId;
  try {
    const res = await getPostById(postId);

    if (res && res.postId) {
      return;
    }

    await insertPost(post);
  } catch (error) {
    console.log("error", error);
  }
}

function connect() {
  connection.connect();
}

function disconnect() {
  connection.end();
}

exports.processPostDB = processPostDB;
exports.connect = connect;
exports.disconnect = disconnect;
