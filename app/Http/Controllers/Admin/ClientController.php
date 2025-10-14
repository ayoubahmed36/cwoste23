<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // TODO: List all clients
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // TODO: Show form to create client (probably unused, since clients self-register)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Store new client (probably unused for admin)
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // TODO: Show single client details
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        // $user = auth()->user();

        // $notifications = Notification::with(['sender', 'submission'])
        //     ->where('receiver_id', $user->id)
        //     ->orderByDesc('created_at')
        //     ->take(10)
        //     ->get();

        // return Inertia::render('admin/clients/edit', [

        //     'notifications' => $notifications,
        //     'unreadCount' => $notifications->where('is_read', false)->count()
        // ]);
        return Inertia::render('admin/clients/edit');

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // TODO: Update client info or approve/reject
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // TODO: Delete client
    }
}
