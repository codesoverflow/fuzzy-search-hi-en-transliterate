const postsNetworkData = require("./postsNetworkData");
const utils = require("../Utils/utils")
const postsDBProcess = require('./postsDBProcess')

const perPage = utils.getPerPageItems()

async function processData() {
    postsDBProcess.connect()
    const categories = await postsNetworkData.getCategories()
    for(category of categories) {
        await processCategory(category)
    }

    postsDBProcess.disconnect()
}

async function processCategory(category) {
    const categoryId = category.id
    const totalPosts = category.count
    const lastPageNo = category.lastPageNo || 0
    const fetchedItems = lastPageNo * perPage
    const nextPageNo = utils.getNextPageNo(totalPosts, fetchedItems)
    category.lastPageNo = nextPageNo

    await processPosts(categoryId, nextPageNo, perPage)

    
}

async function processPosts(categoryId, pageNo, perPage) {
    const posts = await postsNetworkData.getPosts(categoryId, pageNo, perPage)
    for(const post of posts) {
        await processPost(post)
    }
    
}

async function processPost(post) {
    await postsDBProcess.processPostDB(post)
}


processData()
