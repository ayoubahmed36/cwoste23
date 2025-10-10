<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceTypes = [
            [//1
                'name' => 'منحة',
                'slug' => 'منحة',
                'description' => 'الوصف الخاص بالنوع: منحة',
                'color' => 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            ],
            [//2
                'name' => 'خدمات صحية',
                'slug' => 'خدمات_صحية',
                'description' => 'الوصف الخاص بالنوع: مساعدة',
                'color' => 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
            ],
            [//3
                'name' => 'تضامن',
                'slug' => 'تضامن',
                'description' => 'الوصف الخاص بالنوع: مساعدة',
                'color' => 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
            ],
            [//4
                'name' => 'سلفة',
                'slug' => 'سلفة',
                'description' => 'الوصف الخاص بالنوع: سلفة',
                'color' => 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
            ],
            [//5
                'name' => 'رحلات وأسفار',
                'slug' => 'رحلات_وأسفار',
                'description' => 'الوصف الخاص بالنوع: رحلة',
                'color' => 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
            ],

        ];

        foreach ($serviceTypes as $serviceType) {
            ServiceType::create($serviceType);
        }
    }
}
