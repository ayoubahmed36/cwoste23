import AdminAppLayout from "@/layouts/admin-app-layout";

export default function AdminDashboard() {

    return (
        <AdminAppLayout>
            {/* Welcome Banner */}
            <div className="rounded-md bg-white shadow-sm p-6 mb-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-2">مرحباً بك، مدير النظام</h2>
                <p className="text-gray-600">هنا يمكنك إدارة جميع طلبات الخدمات الاجتماعية لعمال التربية لولاية عنابة</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Requests */}
                <div className="stat-card rounded-md bg-white shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">إجمالي الطلبات</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">1,243</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 flex items-center justify-center">
                            <i className="fas fa-file-alt text-blue-500 text-xl"></i>
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="stat-card rounded-md bg-white shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">طلبات قيد الانتظار</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">56</h3>
                        </div>
                        <div className="w-12 h-12 bg-yellow-50 flex items-center justify-center">
                            <i className="fas fa-clock text-yellow-500 text-xl"></i>
                        </div>
                    </div>
                </div>

                {/* Approved Requests */}
                <div className="stat-card rounded-md bg-white shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">طلبات مقبولة</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">987</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-50 flex items-center justify-center">
                            <i className="fas fa-check-circle text-green-500 text-xl"></i>
                        </div>
                    </div>
                </div>

                {/* Rejected Requests */}
                <div className="stat-card rounded-md bg-white shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">طلبات مرفوضة</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">200</h3>
                        </div>
                        <div className="w-12 h-12 bg-red-50 flex items-center justify-center">
                            <i className="fas fa-times-circle text-red-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Applications */}
                <div className="bg-white rounded-md shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">آخر الطلبات</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center ml-3">
                                        <i className="fas fa-home text-green-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">أحمد محمد - قرض السكن</h4>
                                        <p className="text-xs text-gray-600">منذ 5 دقائق</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">جديد</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
                                        <i className="fas fa-graduation-cap text-blue-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">فاطمة علي - منحة الدخول المدرسي</h4>
                                        <p className="text-xs text-gray-600">منذ 15 دقيقة</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">جديد</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center ml-3">
                                        <i className="fas fa-stethoscope text-red-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">محمد حسن - مساعدة طبية</h4>
                                        <p className="text-xs text-gray-600">منذ 30 دقيقة</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">تمت المراجعة</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-md shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">إجراءات سريعة</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 text-center bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                <i className="fas fa-file-check text-green-600 text-2xl mb-2"></i>
                                <p className="text-sm font-medium text-gray-900">مراجعة الطلبات</p>
                            </button>

                            <button className="p-4 text-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <i className="fas fa-user-plus text-blue-600 text-2xl mb-2"></i>
                                <p className="text-sm font-medium text-gray-900">إضافة مستخدم</p>
                            </button>

                            <button className="p-4 text-center bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                <i className="fas fa-chart-line text-purple-600 text-2xl mb-2"></i>
                                <p className="text-sm font-medium text-gray-900">عرض التقارير</p>
                            </button>

                            <button className="p-4 text-center bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                                <i className="fas fa-bell text-yellow-600 text-2xl mb-2"></i>
                                <p className="text-sm font-medium text-gray-900">إرسال إشعار</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAppLayout>

    )

}








