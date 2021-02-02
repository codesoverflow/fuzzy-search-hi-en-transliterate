function getNextPageNo(totalItems, fetchedItems) {
  if (fetchedItems <= 0) {
    return 1;
  }

  const perPageItems = getPerPageItems();
  const currentPage = Math.ceil(fetchedItems / perPageItems);
  const totalPage = Math.ceil(totalItems / perPageItems);
  const nextPage = currentPage + 1;

  if (nextPage > totalPage) {
    return 0;
  }

  return nextPage;
}

function getPerPageItems() {
    return 100;
}

exports.getNextPageNo = getNextPageNo
exports.getPerPageItems = getPerPageItems