import ClientAppLayout from "@/layouts/client-app-layout";
import { useState } from "react";

export default function ClientDashboard() {

    return (
        <ClientAppLayout>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">مرحباً بك، أحمد محمد</h1>
                    <p className="text-gray-600">معلم رياضيات - ثانوية الشهيد محمد بوضياف</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-graduation-cap text-green-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">الطلبات المقبولة</p>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-clock text-yellow-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                                <p className="text-2xl font-bold text-gray-900">3</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-money-bill-wave text-blue-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">إجمالي المبالغ</p>
                                <p className="text-2xl font-bold text-gray-900">450,000 دج</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i className="fas fa-calendar-check text-purple-600 text-xl"></i>
                                </div>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-600">هذا الشهر</p>
                                <p className="text-2xl font-bold text-gray-900">2</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">آخر الطلبات</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                                        <i className="fas fa-home text-green-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">قرض السكن</h3>
                                        <p className="text-sm text-gray-600">تم التقديم في 15 ديسمبر 2024</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">مقبول</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center ml-4">
                                        <i className="fas fa-graduation-cap text-yellow-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">منحة الدخول المدرسي</h3>
                                        <p className="text-sm text-gray-600">تم التقديم في 10 ديسمبر 2024</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">قيد المراجعة</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                                        <i className="fas fa-stethoscope text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">مساعدة طبية</h3>
                                        <p className="text-sm text-gray-600">تم التقديم في 5 ديسمبر 2024</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">مقبول</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-plus text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">طلب خدمة جديدة</h3>
                            <p className="text-gray-600 text-sm">قدم طلباً جديداً للحصول على إحدى الخدمات المتاحة</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-list text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">متابعة الطلبات</h3>
                            <p className="text-gray-600 text-sm">راجع حالة طلباتك وتابع مراحل المعالجة</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-user-edit text-purple-600 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">تحديث البيانات</h3>
                            <p className="text-gray-600 text-sm">حدث معلوماتك الشخصية والمهنية</p>
                        </div>
                    </div>
                </div>
            </main>

        </ClientAppLayout >

    )

}








