const dbUtils = require("../Utils/dbUtils");
const transliterateUtils = require("../Utils/transliterationUtils");

function getPostById(postId) {
  const sql = "SELECT * FROM `posts` WHERE `postId` = ?";
  return dbUtils.queryWrappedWithPromise(sql, [postId]);
}

function insertPost(post) {
  const title = post.title.rendered;
  const slug = post.slug;
  const postId = post.id;
  const content = post.content.rendered;
  const postJson = JSON.stringify(post);
  const transliteratedTitle = transliterateUtils.transliterate(title);
  const transliteratedSlug = transliterateUtils.transliterate(slug);
  const sql = `INSERT INTO posts (title, slug, postId, content, postJson) 
    VALUES ('?', '?', '?', '?', '?')`;

  return dbUtils.queryWrappedWithPromise(sql, [
    transliteratedTitle,
    transliteratedSlug,
    postId,
    content,
    postJson,
  ]);
}

async function processPostDB(post) {
  const postId = post.postId;
  const res = await getPostById(postId);

  if (res.postId) {
    return;
  }

  await insertPost(post);
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
