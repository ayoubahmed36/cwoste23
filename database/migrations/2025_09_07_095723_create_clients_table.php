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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('ccp')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['ذكر', 'انثى']);
            $table->enum('marital_status', ['أعزب', 'متزوج']);
            $table->smallInteger('nb_children')->default(0);
            $table->enum('job_status', ['موظف', 'متقاعد'])->default('موظف');
            $table->string('job_title');
            $table->string('work_institution');
            $table->string('postal_cheque');
            $table->string('proof_certificate');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
