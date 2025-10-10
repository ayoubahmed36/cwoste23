<?php

namespace App\Http\Controllers;

use App\Models\ClientReview;
use Illuminate\Http\Request;

class ClientReviewController extends Controller
{
    /**
     * GET /clients/{client}/reviews
     * List all reviews for a client
     */
    public function index($clientId)
    {
        // TODO: implement
    }

    /**
     * GET /clients/{client}/reviews/latest
     * Show latest review for a client
     */
    public function latest($clientId)
    {
        // TODO: implement
    }

    /**
     * POST /clients/{client}/reviews
     * Store a new review (approve/reject/needs_changes)
     */
    public function store(Request $request, $clientId)
    {
        // TODO: implement
    }

    /**
     * GET /reviews/{review}
     * Show one review with issues
     */
    public function show(ClientReview $review)
    {
        // TODO: implement
    }
}
