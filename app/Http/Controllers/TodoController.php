<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function create()
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
        ]);

        Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'completed' => false,
        ]);

        return redirect()->route('todos.index')->with('success', 'Task created successfully!');
    }

    public function edit(Task $task)
    {

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, int $taskId)
    {

        $request->validate([
            'title' => 'required|max:255',
        ]);

        $task = Task::findOrFail($taskId);
        $task->update([
            'title' => $request->title,
            'completed' => $request->has('completed') ? $request->get('completed') : 0,
        ]);

        return redirect()->route('todos.index')->with('success', 'Task updated successfully!');
    }

    public function destroy(int $taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return redirect()->route('todos.index')
            ->with('success', 'Task deleted successfully!');
    }
}
