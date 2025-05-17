<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $total = Task::where('user_id', $user->id)->count();
        $completed = Task::where('user_id', $user->id)->where('completed', true)->count();
        $pending = $total - $completed;

        return Inertia::render('Dashboard', [
            'stats' => [
                'total' => $total,
                'completed' => $completed,
                'pending' => $pending,
            ]
        ]);
    }
}
