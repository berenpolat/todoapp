<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">📝 Todo List</h1>
        <a href="{{ route('tasks.create') }}" class="btn btn-success">+ Add New Task</a>
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <div class="list-group shadow-sm">

        @forelse($tasks as $task)
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <form action="{{ route('tasks.update', $task) }}" method="POST" class="me-3">
                        @csrf
                        @method('PUT')
                        <input type="checkbox" onchange="this.form.submit()" name="completed" {{ $task->completed ? 'checked' : '' }}>
                        <input type="hidden" name="title" value="{{ $task->title }}">
                    </form>

                    <span class="{{ $task->completed ? 'text-decoration-line-through text-muted' : '' }}">
                        {{ $task->title }}
                    </span>
                </div>

                <div class="d-flex">
                    <a href="{{ route('tasks.edit', $task) }}" class="btn btn-sm btn-warning me-2">Edit</a>

                    <form action="{{ route('tasks.destroy', $task) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</button>
                    </form>
                </div>
            </div>
        @empty
            <div class="alert alert-info">
                No tasks yet. Start by creating one!
            </div>
        @endforelse

    </div>
</div>

</body>
</html>
