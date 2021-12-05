import dbPromise, { jsonify } from '@/modules/mongodb'
import Table from '@/ui/table'

export default function AdminBags({ bags }) {
  return (
    
  )
}
export async function getServerSideProps(ctx) {
  
  return {
    props: {
      bags: bags,
    },
  }
}
