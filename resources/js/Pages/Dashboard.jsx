import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Dashboard({ stats }) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 font-semibold">
              You're logged in! Here's your task summary 👇
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 text-center border shadow-sm">
                <p className="text-gray-500 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 text-center border shadow-sm">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 text-center border shadow-sm">
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-red-600">{stats.pending}</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
