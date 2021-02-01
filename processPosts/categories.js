require("isomorphic-fetch");


async function getCategories() {
  const response  = await fetch("https://bhajandiary.com/wp-json/wp/v2/categories?per_page=50&page=1");
  if (response.status !== 200) {
    return [];
  }
  const categories = await response.json()

  console.log("categories", categories)
  return categories
}

exports.getCategories = getCategories