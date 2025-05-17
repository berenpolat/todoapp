import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Layout from "@/Layouts/AuthenticatedLayout"
import { motion } from 'framer-motion'
import { Pencil, Trash2, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { toast } from 'react-hot-toast'

export default function Index({ tasks }) {
    const { data, setData, post, reset } = useForm({ title: '' })
    const { flash } = usePage().props
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        if (flash?.success) toast.success(flash.success)
        if (flash?.error) toast.error(flash.error)
    }, [flash])

    function submit(e) {
        e.preventDefault()
        post(route('todos.store'), {
            onSuccess: () => reset()
        })
    }

    function handleEdit(task) {
        setEditingId(task.id)
        setEditText(task.title)
    }

    function handleUpdate(task) {
        router.put(route('todos.update', task.id), { title: editText, completed: task.completed }, {
            onSuccess: () => setEditingId(null),
        })
    }

    function handleDelete(id) {
        router.delete(route('todos.destroy', id))
    }

    function handleCompleteToggle(task, checked) {
        router.put(
            route('todos.update', task.id),
            {
                title: task.title,
                completed: checked === true,
            },
            {
                preserveScroll: true,
            }
        )
    }


    return (
        <Layout title="My Tasks" header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                My Tasks
            </h2>
        }>
            <Head title="My Tasks" />

            <div className="max-w-xl mx-auto space-y-6 my-3">
                <form
                    onSubmit={submit}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                    <Input
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        placeholder="What do you need to do?"
                        className="flex-1 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    />
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                    >
                        Add Task
                    </Button>
                </form>

                <div className="space-y-3">
                    {tasks.length === 0 && (
                        <p className="text-gray-500">No tasks yet. Add one!</p>
                    )}

                    {tasks.map(task => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <Checkbox
                                        checked={!!task.completed}
                                        onCheckedChange={(checked) =>
                                            handleCompleteToggle(task, checked)
                                        }
                                    />

                                    {editingId === task.id ? (
                                        <Input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="flex-1"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className={task.completed ? 'line-through text-muted-foreground' : 'font-medium'}>
                                            {task.title}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 items-center ml-3">
                                    {editingId === task.id ? (
                                        <Button size="sm" variant="outline" onClick={() => handleUpdate(task)}>
                                            <Save size={16} className="mr-1" />
                                            Save
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="ghost" onClick={() => handleEdit(task)}>
                                            <Pencil size={16} />
                                        </Button>
                                    )}
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(task.id)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
