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
        // Get client with user and submission data
        $client = \App\Models\Client::with([
            'user',
            'user.registrationDocuments.requiredDocumentRegistration.requiredDocument'
        ])->findOrFail($id);

        // Get submission for this client
        $submission = \App\Models\Submission::where('user_id', $client->user_id)
            ->where('type', 'registration')
            ->first();

        // Get validation details if any
        $validations = $submission 
            ? \App\Models\SubmissionValidation::where('submission_id', $submission->id)->get()
            : collect();

        return Inertia::render('admin/clients/edit', [
            'client' => [
                'id' => $client->id,
                'user_id' => $client->user_id,
                'name' => $client->user->name,
                'email' => $client->user->email,
                'ccp' => $client->ccp,
                'first_name' => $client->first_name,
                'last_name' => $client->last_name,
                'phone' => $client->phone,
                'date_of_birth' => $client->date_of_birth,
                'gender' => $client->gender,
                'marital_status' => $client->marital_status,
                'nb_children' => $client->nb_children,
                'job_status' => $client->job_status,
                'job_title' => $client->job_title,
                'work_institution' => $client->work_institution,
                'registration_status' => $client->registration_status,
                'image' => $client->user->image,
            ],
            'documents' => $client->user->registrationDocuments->map(function($doc) {
                return [
                    'id' => $doc->id,
                    'original_name' => $doc->original_name,
                    'path' => $doc->path,
                    'description' => $doc->requiredDocumentRegistration && $doc->requiredDocumentRegistration->requiredDocument 
                        ? $doc->requiredDocumentRegistration->requiredDocument->description 
                        : 'وثيقة',
                    'created_at' => $doc->created_at,
                ];
            }),
            'submission' => $submission ? [
                'id' => $submission->id,
                'status' => $submission->status,
                'created_at' => $submission->created_at,
            ] : null,
            'validations' => $validations->mapWithKeys(function($validation) {
                return [
                    $validation->field_name => [
                        'status' => $validation->status,
                        'comment' => $validation->admin_message,
                    ]
                ];
            }),
        ]);
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
