export function filter(invitees, filteredCategories) {
  return invitees.filter((invitee) =>
    filterByCategories(invitee, filteredCategories)
  )
}

export function search(invitees, query) {
  if (query.length < 3) return invitees
  return invitees.filter((invitee) => searchReader(invitee, query))
}
function searchReader(invitee, query) {
  return invitee.name.toLowerCase().includes(query.toLowerCase())
}

function filterByCategories(invitee, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return invitee.categories.some((category) =>
    filteredCategories.includes(category)
  )
}
