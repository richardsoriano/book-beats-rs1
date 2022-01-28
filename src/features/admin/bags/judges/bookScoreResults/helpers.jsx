export function filter(books, filteredCategories) {
  console.log('filter books', books)
  console.log('filtered', filteredCategories)
  const booksFiltered = books.filter((book) =>
    filterByCategories(book, filteredCategories)
  )
  return booksFiltered
  // return books.filter((book) => filterByCategories(book, filteredCategories))
}

function filterByCategories(book, filteredCategories) {
  console.log('filtered categories', filteredCategories)
  if (filteredCategories.length === 0) return true
  return book.categories.some((category) =>
    filteredCategories.includes(category)
  )
}
