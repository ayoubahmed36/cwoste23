import { Head, usePage } from "@inertiajs/react";
import ClientAppLayout from "@/layouts/client-app-layout";
import ClientWaitingLayout from "@/layouts/client-waiting-layout";

type AuthedUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    status?: "pending" | "approved";
    ccp?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    maritalStatus?: string;
    nbChildren?: number;
    jobStatus?: string;
    jobTitle?: string;
};

type PageProps = {
    auth: { user: AuthedUser };
};

export default function Profile() {
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;

    const Layout = user?.status === "approved" ? ClientAppLayout : ClientWaitingLayout;

    return (
        <Layout>
            <Head title="الصفحة الشخصية" />

            <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">الصفحة الشخصية</h1>
                    <StatusBadge status="pending" />
                </div>

                {/* 🟢 معلومات الحساب */}
                <Section title="معلومات الحساب" icon="fas fa-info-circle" color="green">
                    <Field label="رقم CCP" value={user?.ccp ?? "—"} status="approved" />
                    <Field
                        label="البريد الإلكتروني"
                        value={user?.email ?? "—"}
                        status="rejected"
                        reason="البريد الإلكتروني غير صالح أو مستخدم من قبل."
                    />
                </Section>

                {/* 🟦 المعلومات الشخصية */}
                <Section title="المعلومات الشخصية" icon="fas fa-user" color="blue">
                    <Field label="اللقب" value={user?.lastName ?? "—"} status="pending" />
                    <Field label="الاسم" value={user?.firstName ?? "—"} status="approved" />
                    <Field label="رقم الهاتف" value={user?.phone ?? "—"} status="approved" />
                    <Field label="تاريخ الميلاد" value={user?.dateOfBirth ?? "—"} status="approved" />
                    <Field label="الجنس" value={user?.gender ?? "—"} status="pending" />
                    <Field
                        label="الحالة الاجتماعية"
                        value={user?.maritalStatus ?? "—"}
                        status="rejected"
                        reason="يجب رفع وثيقة تثبت الحالة الاجتماعية."
                    />
                    <Field label="عدد الأطفال" value={user?.nbChildren?.toString() ?? "—"} status="approved" />
                </Section>

                {/* 🟧 المعلومات الوظيفية */}
                <Section title="المعلومات الوظيفية" icon="fas fa-briefcase" color="amber">
                    <Field label="الحالة الوظيفية" value={user?.jobStatus ?? "—"} status="pending" />
                    <Field label="اسم الوظيفة" value={user?.jobTitle ?? "—"} status="approved" />
                </Section>

                {/* 🟣 الملفات المرفوعة */}
                <Section title="الملفات المرفوعة" icon="fas fa-file-upload" color="purple">
                    <Field label="شهادة العمل / التقاعد" value="تم رفع الملف" status="approved" />
                    <Field
                        label="الصك البريدي"
                        value="تم رفع الملف"
                        status="rejected"
                        reason="الصك غير واضح، يرجى إعادة رفع نسخة أفضل."
                    />
                </Section>
            </div>
        </Layout>
    );
}

/* Section wrapper */
function Section({
    title,
    icon,
    color,
    children,
}: {
    title: string;
    icon: string;
    color: "green" | "blue" | "amber" | "purple";
    children: React.ReactNode;
}) {
    const colors: any = {
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600",
        amber: "bg-amber-100 text-amber-600",
        purple: "bg-purple-100 text-purple-600",
    };
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors[color]}`}>
                    <i className={icon}></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                {children}
            </div>
        </div>
    );
}

/* Field with status + rejection reason */
function Field({
    label,
    value,
    status,
    reason,
}: {
    label: string;
    value: string;
    status: "pending" | "approved" | "rejected";
    reason?: string;
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b last:border-b-0">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
                {status === "rejected" && reason && (
                    <p className="mt-1 text-xs text-red-600">{reason}</p>
                )}
            </div>
            <StatusBadge status={status} />
        </div>
    );
}

/* Reusable Status Badge */
function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
    const map: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };
    const labels: Record<string, string> = {
        pending: "قيد الدراسة",
        approved: "مقبول",
        rejected: "مرفوض",
    };
    return (
        <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${map[status]}`}
        >
            {labels[status]}
        </span>
    );
}
