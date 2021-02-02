require("isomorphic-fetch");
const networkUtils = require("../Utils/networkUtils")
const categoriesUrl = networkUtils.getCategoriesUrl()

async function getCategories() {
  const response  = await fetch(categoriesUrl);
  if (response.status !== 200) {
    return [];
  }
  const categories = await response.json()

  //console.log("categories", categories)
  return categories
}

async function getPosts(categoryId, pageNo, perPage) {

  const postsUrl = networkUtils.getPostsUrl(categoryId, pageNo, perPage)

  const response  = await fetch(postsUrl);
  if (response.status !== 200) {
    return [];
  }
  const posts = await response.json()

  //console.log("posts", posts)
  return posts
}

exports.getCategories = getCategories
exports.getPosts = getPosts