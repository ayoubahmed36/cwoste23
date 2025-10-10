<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequiredDocumentsServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pivotRows = [
            // منحة الأيتام
            ['service_id' => 1, 'required_document_id' => 1],
            ['service_id' => 1, 'required_document_id' => 2],
            ['service_id' => 1, 'required_document_id' => 3],
            ['service_id' => 1, 'required_document_id' => 4],
            ['service_id' => 1, 'required_document_id' => 5],
            ['service_id' => 1, 'required_document_id' => 6],
            ['service_id' => 1, 'required_document_id' => 7],
            ['service_id' => 1, 'required_document_id' => 8],

            // منحة الأرملة الغير عاملة
            ['service_id' => 2, 'required_document_id' => 1],
            ['service_id' => 2, 'required_document_id' => 2],
            ['service_id' => 2, 'required_document_id' => 9],
            ['service_id' => 2, 'required_document_id' => 10],
            ['service_id' => 2, 'required_document_id' => 11],
            ['service_id' => 2, 'required_document_id' => 12],
            ['service_id' => 2, 'required_document_id' => 13],
            ['service_id' => 2, 'required_document_id' => 14],

            // منحة الإعاقة
            ['service_id' => 3, 'required_document_id' => 1],
            ['service_id' => 3, 'required_document_id' => 2],
            ['service_id' => 3, 'required_document_id' => 15],
            ['service_id' => 3, 'required_document_id' => 16],
            ['service_id' => 3, 'required_document_id' => 17],
            ['service_id' => 3, 'required_document_id' => 18],
            ['service_id' => 3, 'required_document_id' => 8],


            // أدوات الإعاقة
            ['service_id' => 4, 'required_document_id' => 1],
            ['service_id' => 4, 'required_document_id' => 2],
            ['service_id' => 4, 'required_document_id' => 19],
            ['service_id' => 4, 'required_document_id' => 20],
            ['service_id' => 4, 'required_document_id' => 18],
            ['service_id' => 4, 'required_document_id' => 21],

            // منحة التقاعد
            ['service_id' => 5, 'required_document_id' => 1],
            ['service_id' => 5, 'required_document_id' => 22],
            ['service_id' => 5, 'required_document_id' => 23],
            ['service_id' => 5, 'required_document_id' => 24],
            ['service_id' => 5, 'required_document_id' => 25],
            ['service_id' => 5, 'required_document_id' => 26],
            ['service_id' => 5, 'required_document_id' => 8],

            // منحة وفاة العامل(ة)
            ['service_id' => 6, 'required_document_id' => 1],
            ['service_id' => 6, 'required_document_id' => 2],
            ['service_id' => 6, 'required_document_id' => 27],
            ['service_id' => 6, 'required_document_id' => 28],
            ['service_id' => 6, 'required_document_id' => 29],
            ['service_id' => 6, 'required_document_id' => 30],
            ['service_id' => 6, 'required_document_id' => 31],

            // منحة وفاة الزوج(ة)
            ['service_id' => 7, 'required_document_id' => 1],
            ['service_id' => 7, 'required_document_id' => 2],
            ['service_id' => 7, 'required_document_id' => 32],
            ['service_id' => 7, 'required_document_id' => 19],
            ['service_id' => 7, 'required_document_id' => 8],

            // منحة وفاة الابن(ة)
            ['service_id' => 8, 'required_document_id' => 1],
            ['service_id' => 8, 'required_document_id' => 2],
            ['service_id' => 8, 'required_document_id' => 33],
            ['service_id' => 8, 'required_document_id' => 34],
            ['service_id' => 8, 'required_document_id' => 8],

            // منحة وفاة الوالد(ة)
            ['service_id' => 9, 'required_document_id' => 1],
            ['service_id' => 9, 'required_document_id' => 2],
            ['service_id' => 9, 'required_document_id' => 35],
            ['service_id' => 9, 'required_document_id' => 36],
            ['service_id' => 9, 'required_document_id' => 8],

            // منحة الزواج 
            ['service_id' => 10, 'required_document_id' => 1],
            ['service_id' => 10, 'required_document_id' => 37],
            ['service_id' => 10, 'required_document_id' => 38],
            ['service_id' => 10, 'required_document_id' => 8],

            // طلب تعويض عملية جراحية 
            ['service_id' => 11, 'required_document_id' => 1],
            ['service_id' => 11, 'required_document_id' => 2],
            ['service_id' => 11, 'required_document_id' => 39],
            ['service_id' => 11, 'required_document_id' => 40],
            ['service_id' => 11, 'required_document_id' => 41],
            ['service_id' => 11, 'required_document_id' => 42],
            ['service_id' => 11, 'required_document_id' => 43],
            ['service_id' => 11, 'required_document_id' => 44],
            ['service_id' => 11, 'required_document_id' => 8],

            // طلب تعويض فحوصات الأشعة والتحاليل 
            ['service_id' => 12, 'required_document_id' => 1],
            ['service_id' => 12, 'required_document_id' => 2],
            ['service_id' => 12, 'required_document_id' => 40],
            ['service_id' => 12, 'required_document_id' => 45],
            ['service_id' => 12, 'required_document_id' => 42],
            ['service_id' => 12, 'required_document_id' => 43],
            ['service_id' => 12, 'required_document_id' => 44],
            ['service_id' => 12, 'required_document_id' => 8],

            // طلب استفادة من العلاج بالحمامات المعدنية 
            ['service_id' => 13, 'required_document_id' => 1],
            ['service_id' => 13, 'required_document_id' => 2],
            ['service_id' => 13, 'required_document_id' => 46],
            ['service_id' => 13, 'required_document_id' => 47],
            ['service_id' => 13, 'required_document_id' => 48],


            // طلب الاستفادة من مساعدة عن الكوارث والحوادث 
            ['service_id' => 14, 'required_document_id' => 1],
            ['service_id' => 14, 'required_document_id' => 2],
            ['service_id' => 14, 'required_document_id' => 49],
            ['service_id' => 14, 'required_document_id' => 50],
            ['service_id' => 14, 'required_document_id' => 51],
            ['service_id' => 14, 'required_document_id' => 52],
            ['service_id' => 14, 'required_document_id' => 53],

            // طلب الاستفادة من مساعدة عن الحالات الاجتماعية والصحية القاهرة 
            ['service_id' => 15, 'required_document_id' => 1],
            ['service_id' => 15, 'required_document_id' => 54],
            ['service_id' => 15, 'required_document_id' => 49],
            ['service_id' => 15, 'required_document_id' => 55],
            ['service_id' => 15, 'required_document_id' => 8],

            // سلفة الزواج 
            ['service_id' => 16, 'required_document_id' => 1],
            ['service_id' => 16, 'required_document_id' => 37],
            ['service_id' => 16, 'required_document_id' => 56],
            ['service_id' => 16, 'required_document_id' => 57],
            ['service_id' => 16, 'required_document_id' => 63],
            ['service_id' => 16, 'required_document_id' => 58],
            ['service_id' => 16, 'required_document_id' => 59],
            ['service_id' => 16, 'required_document_id' => 8],

            // السلفة الاستثنائية 
            ['service_id' => 17, 'required_document_id' => 1],
            ['service_id' => 17, 'required_document_id' => 60],
            ['service_id' => 17, 'required_document_id' => 61],
            ['service_id' => 17, 'required_document_id' => 66],
            ['service_id' => 17, 'required_document_id' => 62],
            ['service_id' => 17, 'required_document_id' => 8],
            ['service_id' => 17, 'required_document_id' => 63, 'step' => 'completion'],
            ['service_id' => 17, 'required_document_id' => 64, 'step' => 'completion'],
            ['service_id' => 17, 'required_document_id' => 65, 'step' => 'completion'],

            // سلفة شراء السكن 
            ['service_id' => 18, 'required_document_id' => 1],
            ['service_id' => 18, 'required_document_id' => 60],
            ['service_id' => 18, 'required_document_id' => 19],
            ['service_id' => 18, 'required_document_id' => 61],
            ['service_id' => 18, 'required_document_id' => 67],
            ['service_id' => 18, 'required_document_id' => 70],
            ['service_id' => 18, 'required_document_id' => 8],
            ['service_id' => 18, 'required_document_id' => 63, 'step' => 'completion'],
            ['service_id' => 18, 'required_document_id' => 64, 'step' => 'completion'],
            ['service_id' => 18, 'required_document_id' => 65, 'step' => 'completion'],

            // سلفة بناء السكن 
            ['service_id' => 19, 'required_document_id' => 1],
            ['service_id' => 19, 'required_document_id' => 60],
            ['service_id' => 19, 'required_document_id' => 19],
            ['service_id' => 19, 'required_document_id' => 61],
            ['service_id' => 19, 'required_document_id' => 66],
            ['service_id' => 19, 'required_document_id' => 68],
            ['service_id' => 19, 'required_document_id' => 8],
            ['service_id' => 19, 'required_document_id' => 63, 'step' => 'completion'],
            ['service_id' => 19, 'required_document_id' => 64, 'step' => 'completion'],
            ['service_id' => 19, 'required_document_id' => 65, 'step' => 'completion'],

            // سلفة شراء سيارة  
            ['service_id' => 20, 'required_document_id' => 1],
            ['service_id' => 20, 'required_document_id' => 60],
            ['service_id' => 20, 'required_document_id' => 19],
            ['service_id' => 20, 'required_document_id' => 61],
            ['service_id' => 20, 'required_document_id' => 66],
            ['service_id' => 20, 'required_document_id' => 8],
            ['service_id' => 20, 'required_document_id' => 63, 'step' => 'completion'],
            ['service_id' => 20, 'required_document_id' => 64, 'step' => 'completion'],
            ['service_id' => 20, 'required_document_id' => 65, 'step' => 'completion'],

            // منحة تكريم أبناء القطاع  
            ['service_id' => 21, 'required_document_id' => 1],
            ['service_id' => 21, 'required_document_id' => 2],
            ['service_id' => 21, 'required_document_id' => 19],
            ['service_id' => 21, 'required_document_id' => 69],
            ['service_id' => 21, 'required_document_id' => 70],
            ['service_id' => 21, 'required_document_id' => 8],

            // الاستفادة من الرحلات الداخلية
            ['service_id' => 22, 'required_document_id' => 1],
            ['service_id' => 22, 'required_document_id' => 2],
            ['service_id' => 22, 'required_document_id' => 71],
            ['service_id' => 22, 'required_document_id' => 72],
            ['service_id' => 22, 'required_document_id' => 73],
            ['service_id' => 22, 'required_document_id' => 74],
            ['service_id' => 22, 'required_document_id' => 8],

            // الاستفادة من رحلة خارج الوطن
            ['service_id' => 23, 'required_document_id' => 1],
            ['service_id' => 23, 'required_document_id' => 2],
            ['service_id' => 23, 'required_document_id' => 77],
            ['service_id' => 23, 'required_document_id' => 71],
            ['service_id' => 23, 'required_document_id' => 73],
            ['service_id' => 23, 'required_document_id' => 74],
            ['service_id' => 23, 'required_document_id' => 8],

            // الاستفادة من المخيمات الصيفية  
            ['service_id' => 24, 'required_document_id' => 1],
            ['service_id' => 24, 'required_document_id' => 2],
            ['service_id' => 24, 'required_document_id' => 78],
            ['service_id' => 24, 'required_document_id' => 19],
            ['service_id' => 24, 'required_document_id' => 74],
            ['service_id' => 24, 'required_document_id' => 8],


            // طلب الاستفادة من مساعدة لأداء مناسك الحج  
            ['service_id' => 25, 'required_document_id' => 1],
            ['service_id' => 25, 'required_document_id' => 2],
            ['service_id' => 25, 'required_document_id' => 75],
            ['service_id' => 25, 'required_document_id' => 76],
            ['service_id' => 25, 'required_document_id' => 8],

            // طلب الاستفادة من مساعدة لأداء مناسك العمرة  
            ['service_id' => 26, 'required_document_id' => 1],
            ['service_id' => 26, 'required_document_id' => 2],
            ['service_id' => 26, 'required_document_id' => 77],

        ];

        foreach ($pivotRows as $row) {
            DB::table('required_document_service')->insert(array_merge($row, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
