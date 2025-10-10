<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [//1
                'name' => 'منحة الايتام',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة الايتام',
                'config' => json_encode([
                    'icon' => 'mdi:account-child-outline',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_1.pdf',
                'form_file' => 'form_file_1.pdf',
            ],

            [//2
                'name' => 'منحة الأرملة الغير عاملة',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة الارملة الغير عاملة',
                'config' => json_encode([
                    'icon' => 'streamline-ultimate:single-woman-home',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_2.pdf',
                'form_file' => 'form_file_2.pdf',
            ],

            [//3
                'name' => 'منحة الإعاقة',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة الإعاقة',
                'config' => json_encode([
                    'icon' => 'icon-park-outline:wheelchair',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_3.pdf',
                'form_file' => 'form_file_3.pdf',
            ],

            [//4
                'name' => 'أدوات الإعاقة',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بأدوات الإعاقة',
                'config' => json_encode([
                    'icon' => 'lineicons:wheelchair-1',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_4.pdf',
                'form_file' => 'form_file_4.pdf',
            ],

            [//5
                'name' => 'منحة التقاعد',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة التقاعد',
                'config' => json_encode([
                    'icon' => 'healthicons:old-man-outline',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_5.pdf',
                'form_file' => 'form_file_5.pdf',
            ],

            [//6
                'name' => 'منحة وفاة العامل(ة)',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة وفاة العامل(ة)',
                'config' => json_encode([
                    'icon' => 'hugeicons:hand-prayer',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_6.pdf',
                'form_file' => 'form_file_6.pdf',
            ],

            [//7
                'name' => 'منحة وفاة الزوج(ة)',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة وفاة الزوج(ة)',
                'config' => json_encode([
                    'icon' => 'streamline-plump:candle',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_7.pdf',
                'form_file' => 'form_file_7.pdf',
            ],

            [//8
                'name' => 'منحة وفاة الابن(ة)',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة وفاة الابن(ة)',
                'config' => json_encode([
                    'icon' => 'solar:hand-heart-linear',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_8.pdf',
                'form_file' => 'form_file_8.pdf',
            ],

            [//9
                'name' => 'منحة وفاة الوالد(ة)',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة وفاة الوالد(ة)',
                'config' => json_encode([
                    'icon' => 'fluent-mdl2:family',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_9.pdf',
                'form_file' => 'form_file_9.pdf',
            ],


            [//10
                'name' => 'منحة الزواج',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة الزواج',
                'config' => json_encode([
                    'icon' => 'fa7-solid:ring',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_10.pdf',
                'form_file' => 'form_file_10.pdf',
            ],
            
            [//11
                'name' => 'طلب تعويض عملية جراحية',
                'service_type_id' => 2,
                'description' => 'الوصف الخاص بطلب تعويض عملية جراحية',
                'config' => json_encode([
                    'icon' => 'guidance:surgery',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_11.pdf',
                'form_file' => 'form_file_11.pdf',
            ],

            [//12
                'name' => 'طلب تعويض فحوصات الأشعة والتحاليل',
                'service_type_id' => 2,
                'description' => 'الوصف الخاص بطلب تعويض فحوصات الأشعة والتحاليل',
                'config' => json_encode([
                    'icon' => 'material-symbols:radiology-outline-rounded',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_12.pdf',
                'form_file' => 'form_file_12.pdf',
            ],

            [//13
                'name' => 'طلب استفادة من العلاج بالحمامات المعدنية',
                'service_type_id' => 2,
                'description' => 'الوصف الخاص بطلب الاستفادة من العلاج بالحمامات المعدنية',
                'config' => json_encode([
                    'icon' => 'material-symbols-light:bath-soak-sharp',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_13.pdf',
                'form_file' => 'form_file_13.pdf',
            ],

            [//14
                'name' => 'طلب الاستفادة من مساعدة عن الكوارث والحوادث',
                'service_type_id' => 3,
                'description' => 'الوصف الخاص بطلب الاستفادة من مساعدة عن الكوارث والحوادث',
                'config' => json_encode([
                    'icon' => 'ph:ambulance-light',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_14.pdf',
                'form_file' => 'form_file_14.pdf',
            ],

            [//15
                'name' => 'طلب الاستفادة من مساعدة عن الحالات الاجتماعية والصحية القاهرة',
                'service_type_id' => 3,
                'description' => 'الوصف الخاص بطلب الاستفادة من مساعدة عن الحالات الاجتماعية والصحية القاهرة',
                'config' => json_encode([
                    'icon' => 'streamline:medical-bag-remix',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_15.pdf',
                'form_file' => 'form_file_15.pdf',
            ],
            
            [//16
                'name' => 'سلفة الزواج',
                'service_type_id' => 4,
                'description' => 'الوصف الخاص بسلفة الزواج',
                'config' => json_encode([
                    'icon' => 'ph:gift',
                    'required_documents' => []
                ]),
                'active' => true,
                'rules_file' => 'rules_file_16.pdf',
                'form_file' => 'form_file_16.pdf',
            ],
            
            [//17
                'name' => 'السلفة الاستثنائية',
                'service_type_id' => 4,
                'description' => 'الوصف الخاص بالسلفة الاستثنائية',
                'config' => json_encode([
                    'icon' => 'carbon:global-loan-and-trial',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_17.pdf',
                'form_file' => 'form_file_17.pdf',
            ],
            
            [//18
                'name' => 'سلفة شراء السكن',
                'service_type_id' => 4,
                'description' => 'الوصف الخاص بسلفة السكن',
                'config' => json_encode([
                    'icon' => 'hugeicons:house-04',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_18.pdf',
                'form_file' => 'form_file_18.pdf',
            ],

            [//19
                'name' => 'سلفة بناء السكن',
                'service_type_id' => 4,
                'description' => 'الوصف الخاص بسلفة السكن',
                'config' => json_encode([
                    'icon' => 'carbon:construction',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_19.pdf',
                'form_file' => 'form_file_19.pdf',
            ],

            [//20
                'name' => 'سلفة شراء السيارة',
                'service_type_id' => 4,
                'description' => 'الوصف الخاص بسلفة شراء السيارة',
                'config' => json_encode([
                    'icon' => 'jam:car',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_20.pdf',
                'form_file' => 'form_file_20.pdf',
            ],

            [//21
                'name' => 'منحة تكريم أبناء القطاع',
                'service_type_id' => 1,
                'description' => 'الوصف الخاص بمنحة تكريم أبناء القطاع',
                'config' => json_encode([
                    'icon' => 'lucide:medal',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_21.pdf',
                'form_file' => 'form_file_21.pdf',
            ],

            [//22
                'name' => 'الاستفادة من الرحلات الداخلية',
                'service_type_id' => 5,
                'description' => 'الوصف الخاص بالاستفادة من الرحلات الداخلية',
                'config' => json_encode([
                    'icon' => 'healthicons:travel',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_22.pdf',
                'form_file' => 'form_file_22.pdf',
            ],

            [//23
                'name' => 'الاستفادة من رحلة خارج الوطن',
                'service_type_id' => 5,
                'description' => 'الوصف الخاص بالاستفادة من رحلة خارج الوطن',
                'config' => json_encode([
                    'icon' => 'lucide:plane',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_23.pdf',
                'form_file' => 'form_file_23.pdf',
            ],

            [//24
                'name' => 'الاستفادة من المخيمات الصيفية',
                'service_type_id' => 5,
                'description' => 'الوصف الخاص بالاستفادة من المخيمات الصيفية',
                'config' => json_encode([
                    'icon' => 'streamline:camping-tent',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_24.pdf',
                'form_file' => 'form_file_24.pdf',
            ],

            [//25
                'name' => 'طلب الاستفادة من مساعدة لأداء مناسك الحج',
                'service_type_id' => 5,
                'description' => 'الوصف الخاص بطلب الاستفادة من مساعدة لأداء مناسك الحج',
                'config' => json_encode([
                    'icon' => 'emojione-monotone:kaaba',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_25.pdf',
                'form_file' => 'form_file_25.pdf',
            ],

            [//26
                'name' => 'طلب الاستفادة من مساعدة لأداء مناسك العمرة',
                'service_type_id' => 5,
                'description' => 'الوصف الخاص بطلب الاستفادة من مساعدة لأداء مناسك العمرة',
                'config' => json_encode([
                    'icon' => 'hugeicons:kaaba-02',
                ]),
                'active' => true,
                'rules_file' => 'rules_file_26.pdf',
                'form_file' => 'form_file_26.pdf',
            ],

        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
