const postsNetworkData = require("./postsNetworkData");
const utils = require("../Utils/utils")
const perPage = utils.getPerPageItems()

async function processData() {
    const categories = await postsNetworkData.getCategories()
    categories.forEach(processCategory)
}

function processCategory(category) {
    const categoryId = category.id
    const totalPosts = category.count
    const lastPageNo = category.lastPageNo || 0
    const fetchedItems = lastPageNo * perPage
    const nextPageNo = utils.getNextPageNo(totalPosts, fetchedItems)
    category.lastPageNo = nextPageNo

    processPosts(categoryId, nextPageNo, perPage)

    
}

async function processPosts(categoryId, pageNo, perPage) {
    const posts = await postsNetworkData.getPosts(categoryId, pageNo, perPage)
    console.log("posts.length", posts.length)
    posts.forEach(processPost)
}

function processPost(post) {
    //console.log(post.id)
}

processData()