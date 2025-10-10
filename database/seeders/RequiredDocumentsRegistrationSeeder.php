<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequiredDocumentsRegistrationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pivotRows = [
            ['required_document_id' => 2],
            ['required_document_id' => 48],

        ];

        foreach ($pivotRows as $row) {
            DB::table('required_document_registration')->insert(array_merge($row, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
