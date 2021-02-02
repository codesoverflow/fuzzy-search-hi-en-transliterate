const configs = require("../configs/configs")

function getCategoriesUrl() {
  return `${configs.baseUrl}${configs.jsonPath}categories?per_page=50&page=1`
}

function getPostsUrl(categoryId, pageNo, perPage = 100) {
  return `${configs.baseUrl}${configs.jsonPath}posts?categories=${categoryId}&page=${pageNo}&per_page=${perPage}`
}

exports.getCategoriesUrl = getCategoriesUrl

exports.getPostsUrl = getPostsUrl
