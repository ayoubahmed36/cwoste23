<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('client_review_issues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_id')->constrained('client_reviews')->cascadeOnDelete();
            $table->string('field_name');     // ex: "phone", "proof_certificate"
            $table->text('issue_detail');     // explanation of the problem
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_review_issues');
    }
};
