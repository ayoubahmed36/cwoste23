<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ServicesSeeder;
use Database\Seeders\RequiredDocumentsSeeder;
use Database\Seeders\RequiredDocumentsServiceSeeder;
use Database\Seeders\RequiredDocumentsRegistrationSeeder;
use Database\Seeders\ServiceTypesSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

/*         User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]); */

        User::factory()->create([
            'name' => 'Salhi Ahmed',
            'email' => 'slh@example.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        $this->call([
            ServiceTypesSeeder::class,
            ServicesSeeder::class,
            RequiredDocumentsSeeder::class,
            RequiredDocumentsServiceSeeder::class,
            RequiredDocumentsRegistrationSeeder::class,
        ]);
    }
}
