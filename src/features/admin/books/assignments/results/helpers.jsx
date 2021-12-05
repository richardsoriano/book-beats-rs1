export function filter(assignments, filteredStatus, filteredGenres, statuses) {
  return assignments.filter(
    (assignment) =>
      filterByStatus(assignment, filteredStatus, statuses) &&
      filterByGenres(assignment, filteredGenres)
  )
}

export function search(assignments, query) {
  if (query.length < 3) return assignments
  return assignments.filter((assignment) => searchTitle(assignment, query))
}
function searchTitle(assignment, query) {
  return assignment.title.toLowerCase().includes(query.toLowerCase())
}

function searchGenres(assignment, query) {
  return (
    assignment.genres.filter((genre) =>
      genre.toLowerCase().includes(query.toLowerCase())
    ).length > 0
  )
}

function filterByStatus(assignment, filteredStatus, statuses) {
  if (compareCaseInsensitive(filteredStatus, statuses[0])) return true
  return compareCaseInsensitive(assignment.status, filteredStatus)
}

function filterByGenres(assignment, filteredGenres) {
  console.dir(filteredGenres)
  console.log('f Genres')
  if (filteredGenres.length === 0) return true
  return assignment.genres.some((genre) => filteredGenres.includes(genre))
}

function compareCaseInsensitive(a, b) {
  return a.toLowerCase() === b.toLowerCase()
}
