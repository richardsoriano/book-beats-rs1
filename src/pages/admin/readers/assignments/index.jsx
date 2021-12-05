import AdminReadersAssignments from '@/features/admin/readers/assignments'
import readers from '@/data/readers'

export default function AdminReadersAssignmentsPage({ readerAssignments }) {
  return <AdminReadersAssignments readerAssignments={readerAssignments} />
}

function aggregateReaderAssignments(assignments) {
  return assignments.map((assignment) => ({
    reader: assignment.name,
    max: assignment.preferences.maxNumberOfBooks,
    assignedCount: assignment.assignments.length,
    completedCount: assignment.assignments.filter(
      (assignment) => assignment.reviewedOn !== null
    ).length,
    availableCount:
      assignment.preferences.maxNumberOfBooks - assignment.assignments.length,
    categories: assignment.preferences.categories,
  }))
}
export function getServerSideProps() {
  return {
    props: {
      readerAssignments: aggregateReaderAssignments(readers),
    },
  }
}
