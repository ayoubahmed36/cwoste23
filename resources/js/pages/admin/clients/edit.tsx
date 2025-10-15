import AdminAppLayout from "@/layouts/admin-app-layout";
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Pencil, Check, X, Download, User, Mail, Phone, Calendar, Briefcase, FileText, AlertCircle, Save } from 'lucide-react';
import PdfDocumentViewer from "@/components/cwoste/pdf-document-viewer";
import DatePicker from "@/components/cwoste/date-picker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type FieldStatus = 'pending' | 'accepted' | 'rejected';

interface FieldValidation {
    status: FieldStatus;
    comment?: string;
}

interface ClientData {
    ccp: string;
    email: string;
    last_name: string;
    first_name: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    marital_status: string;
    nb_children: number;
    job_status: string;
    job_title: string;
    work_institution: string;
}

interface Document {
    id: number;
    original_name: string;
    path: string;
    description: string;
    created_at: string;
}

interface PageProps {
    client: {
        id: number;
        user_id: number;
        name: string;
        email: string;
        ccp: string;
        first_name: string;
        last_name: string;
        phone: string;
        date_of_birth: string;
        gender: string;
        marital_status: string;
        nb_children: number;
        job_status: string;
        job_title: string;
        work_institution: string;
        registration_status: string;
        image: string | null;
    };
    documents: Document[];
    submission: {
        id: number;
        status: string;
        created_at: string;
    } | null;
    validations: Record<string, FieldValidation>;
    [key: string]: any;
}

export default function Edit() {
    const { props } = usePage<PageProps>();
    const { client, documents, submission, validations } = props;

    // Initialize client data state from props
    const [clientData, setClientData] = useState<ClientData>({
        ccp: client.ccp,
        email: client.email,
        last_name: client.last_name,
        first_name: client.first_name,
        phone: client.phone,
        gender: client.gender,
        date_of_birth: client.date_of_birth,
        marital_status: client.marital_status,
        nb_children: client.nb_children,
        job_status: client.job_status,
        job_title: client.job_title,
        work_institution: client.work_institution
    });

    // Initialize field validations from props or set to pending
    const [fieldValidations, setFieldValidations] = useState<Record<string, FieldValidation>>({
        ccp: validations?.ccp || { status: 'pending', comment: '' },
        email: validations?.email || { status: 'pending', comment: '' },
        last_name: validations?.last_name || { status: 'pending', comment: '' },
        first_name: validations?.first_name || { status: 'pending', comment: '' },
        phone: validations?.phone || { status: 'pending', comment: '' },
        gender: validations?.gender || { status: 'pending', comment: '' },
        date_of_birth: validations?.date_of_birth || { status: 'pending', comment: '' },
        marital_status: validations?.marital_status || { status: 'pending', comment: '' },
        nb_children: validations?.nb_children || { status: 'pending', comment: '' },
        job_status: validations?.job_status || { status: 'pending', comment: '' },
        job_title: validations?.job_title || { status: 'pending', comment: '' },
        work_institution: validations?.work_institution || { status: 'pending', comment: '' }
    });

    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string | Date>('');
    const [commentField, setCommentField] = useState<string | null>(null);
    const [commentText, setCommentText] = useState<string>('');
    const [commentDocumentId, setCommentDocumentId] = useState<number | null>(null);
    const [documentCommentText, setDocumentCommentText] = useState<string>('');

    // Initialize document validations
    const [documentValidations, setDocumentValidations] = useState<Record<number, FieldValidation>>(
        documents.reduce((acc, doc) => {
            acc[doc.id] = { status: 'pending', comment: '' };
            return acc;
        }, {} as Record<number, FieldValidation>)
    );

    const approveField = (field: string) => {
        setFieldValidations(prev => ({
            ...prev,
            [field]: { ...prev[field], status: 'accepted' as FieldStatus, comment: '' }
        }));
    };

    const rejectField = (field: string) => {
        setCommentField(field);
    };

    const resetFieldStatus = (field: string) => {
        setFieldValidations(prev => ({
            ...prev,
            [field]: { status: 'pending', comment: '' }
        }));
    };

    const approveDocument = (docId: number) => {
        setDocumentValidations(prev => ({
            ...prev,
            [docId]: { status: 'accepted', comment: '' }
        }));
    };

    const rejectDocument = (docId: number) => {
        // Open modal to enter rejection comment
        setCommentDocumentId(docId);
        setDocumentCommentText('');
    };

    const confirmDocumentRejection = () => {
        if (commentDocumentId !== null && documentCommentText.trim()) {
            setDocumentValidations(prev => ({
                ...prev,
                [commentDocumentId]: { status: 'rejected', comment: documentCommentText }
            }));
            setCommentDocumentId(null);
            setDocumentCommentText('');
        }
    };

    const resetDocumentStatus = (docId: number) => {
        setDocumentValidations(prev => ({
            ...prev,
            [docId]: { status: 'pending', comment: '' }
        }));
    };

    const approveAllInSection = (section: 'personal' | 'account' | 'job') => {
        const sectionFields = {
            personal: ['last_name', 'first_name', 'phone', 'gender', 'date_of_birth', 'marital_status', 'nb_children'],
            account: ['ccp', 'email'],
            job: ['job_status', 'job_title', 'work_institution']
        };

        const fieldsToApprove = sectionFields[section];
        setFieldValidations(prev => {
            const updated = { ...prev };
            fieldsToApprove.forEach(field => {
                updated[field] = { status: 'accepted', comment: '' };
            });
            return updated;
        });
    };

    const approveAllDocuments = () => {
        setDocumentValidations(prev => {
            const updated = { ...prev };
            documents.forEach(doc => {
                updated[doc.id] = { status: 'accepted', comment: '' };
            });
            return updated;
        });
    };

    const confirmRejection = () => {
        if (commentField) {
            setFieldValidations(prev => ({
                ...prev,
                [commentField]: { status: 'rejected', comment: commentText }
            }));
            setCommentField(null);
            setCommentText('');
        }
    };

    const startEditing = (field: string, value: string | number) => {
        setEditingField(field);
        // For date fields, convert string to Date object like register.tsx does
        if (field === 'date_of_birth' && typeof value === 'string') {
            setEditValue(new Date(value));
        } else {
            setEditValue(value.toString());
        }
    };

    const saveEdit = () => {
        if (editingField) {
            let finalValue: string | number = editValue as string;
            
            // Convert Date back to string for storage
            if (editingField === 'date_of_birth' && editValue instanceof Date) {
                const year = editValue.getFullYear();
                const month = String(editValue.getMonth() + 1).padStart(2, '0');
                const day = String(editValue.getDate()).padStart(2, '0');
                finalValue = `${year}-${month}-${day}`;
            } else if (editingField === 'nb_children') {
                finalValue = parseInt(editValue as string);
            }
            
            setClientData(prev => ({
                ...prev,
                [editingField]: finalValue
            }));
            setFieldValidations(prev => ({
                ...prev,
                [editingField]: { status: 'accepted' as FieldStatus, comment: 'تم التعديل من قبل المسؤول' }
            }));
            setEditingField(null);
        }
    };

    const StatusBadge = ({ status }: { status: FieldStatus }) => {
        const config = {
            pending: { 
                color: 'bg-amber-50 text-amber-700 border-amber-200', 
                icon: Clock, 
                text: 'قيد المراجعة',
                dotColor: 'bg-amber-500'
            },
            accepted: { 
                color: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
                icon: CheckCircle, 
                text: 'مقبول',
                dotColor: 'bg-emerald-500'
            },
            rejected: { 
                color: 'bg-rose-50 text-rose-700 border-rose-200', 
                icon: XCircle, 
                text: 'مرفوض',
                dotColor: 'bg-rose-500'
            }
        };
        const { color, icon: Icon, text, dotColor } = config[status];
        return (
            <Badge className={`${color} gap-1.5 border font-medium`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                <Icon className="h-3.5 w-3.5" />
                {text}
            </Badge>
        );
    };   
    
    interface ValidationFieldProps {
        label: string;
        field: string;
        value: string | number;
        type?: 'text' | 'number' | 'select' | 'date';
        options?: string[];
    }

    const ValidationField = ({ label, field, value, type = 'text', options }: ValidationFieldProps) => {
        const validation = fieldValidations[field];
        const isEditing = editingField === field;

        return (
            <div className={`p-5 border rounded-xl transition-all duration-200 ${validation.status === 'rejected'
                    ? 'border-rose-200 bg-rose-50/30'
                    : validation.status === 'accepted'
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        {/* Label and Status */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">{label}</span>
                            <StatusBadge status={validation.status} />
                        </div>

                        {/* Value or Edit Field */}
                        <div className="flex items-center gap-3">
                            {isEditing ? (
                                <div className="flex items-center gap-2 flex-1">
                                    {type === 'select' && options ? (
                                        <Select value={editValue as string} onValueChange={setEditValue}>
                                            <SelectTrigger className="flex-1 max-w-md h-10 bg-white border-gray-300">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {options.map(option => (
                                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : type === 'date' ? (
                                        <DatePicker
                                            value={editValue instanceof Date ? editValue : new Date(editValue)}
                                            onChange={(date) => {
                                                date && setEditValue(date)
                                            }}
                                            className="flex-1 max-w-md"
                                        />
                                    ) : (
                                        <Input
                                            type={type}
                                            value={editValue as string}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            className="flex-1 max-w-md h-10 bg-white border-gray-300"
                                            autoFocus
                                        />
                                    )}
                                    <Button
                                        size="sm"
                                        onClick={saveEdit}
                                        className="bg-green-600 hover:bg-green-700 h-9 px-4"
                                    >
                                        <Save className="h-4 w-4 ml-1.5" />
                                        حفظ
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingField(null)}
                                        className="h-9 px-4"
                                    >
                                        <X className="h-4 w-4 ml-1.5" />
                                        إلغاء
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-base text-gray-900 font-medium">{value}</span>
                                </div>
                            )}
                        </div>

                        {/* Comment/Error Message */}
                        {validation.comment && (
                            <div className="flex items-start gap-2 p-3 bg-rose-100 border border-rose-200 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-rose-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-rose-700 leading-relaxed">{validation.comment}</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {!isEditing && (
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditing(field, value)}
                                className="h-9 w-9 p-0 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                                title="تعديل"
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            {/* Toggle button: Shows قبول when pending, shows clock when accepted */}
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    if (validation.status === 'pending') {
                                        approveField(field);
                                    } else if (validation.status === 'accepted') {
                                        resetFieldStatus(field);
                                    }
                                }}
                                className={
                                    validation.status === 'accepted'
                                        ? "h-9 w-9 p-0 bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                                        : "h-9 w-9 p-0 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                                }
                                title={validation.status === 'accepted' ? "إعادة إلى قيد المراجعة" : "قبول"}
                            >
                                {validation.status === 'accepted' ? (
                                    <Clock className="h-4 w-4" />
                                ) : (
                                    <Check className="h-4 w-4" />
                                )}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => rejectField(field)}
                                className="h-9 w-9 p-0 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700"
                                title="رفض"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <AdminAppLayout>
            <Head title="مراجعة طلب التسجيل" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    مراجعة طلب التسجيل
                                </h1>
                                <div className="flex items-center gap-2 text-gray-600 mr-12">
                                    <User className="h-4 w-4" />
                                    <span className="font-medium">العميل: {client.name}</span>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                className={`text-base px-5 py-2.5 font-semibold w-fit ${
                                    client.registration_status === 'pending' 
                                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                                        : client.registration_status === 'approved'
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                        : 'bg-rose-50 border-rose-300 text-rose-700'
                                }`}
                            >
                                {client.registration_status === 'pending' && <Clock className="h-4 w-4 ml-2" />}
                                {client.registration_status === 'approved' && <CheckCircle className="h-4 w-4 ml-2" />}
                                {client.registration_status === 'rejected' && <XCircle className="h-4 w-4 ml-2" />}
                                {client.registration_status === 'pending' && 'قيد المراجعة'}
                                {client.registration_status === 'approved' && 'تمت الموافقة'}
                                {client.registration_status === 'rejected' && 'مرفوض'}
                            </Badge>
                        </div>
                    </div>

                    {/* Tabs System */}
                    <Tabs defaultValue="personal" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 h-auto">
                            <TabsTrigger
                                value="personal"
                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 font-semibold transition-all"
                            >
                                <Calendar className="h-4 w-4 ml-2" />
                                المعلومات الشخصية
                            </TabsTrigger>
                            <TabsTrigger
                                value="account"
                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 font-semibold transition-all"
                            >
                                <User className="h-4 w-4 ml-2" />
                                معلومات الحساب
                            </TabsTrigger>
                            <TabsTrigger
                                value="job"
                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 font-semibold transition-all"
                            >
                                <Briefcase className="h-4 w-4 ml-2" />
                                المعلومات الوظيفية
                            </TabsTrigger>
                            <TabsTrigger
                                value="documents"
                                className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg py-3 font-semibold transition-all"
                            >
                                <FileText className="h-4 w-4 ml-2" />
                                الملفات
                            </TabsTrigger>
                        </TabsList>

                        {/* Personal Information Tab */}
                        <TabsContent value="personal" className="space-y-0">
                            <Card className="border-gray-200 shadow-sm pt-0">
                                <CardHeader className="py-6 rounded-t-xl bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-3 text-xl">
                                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                                    <User className="h-4 w-4 text-white" />
                                                </div>
                                                المعلومات الشخصية
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                تفاصيل البيانات الشخصية للعميل
                                            </CardDescription>
                                        </div>
                                        <Button
                                            onClick={() => approveAllInSection('personal')}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 ml-2" />
                                            قبول الكل
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6 bg-gray-50/50">
                                    <ValidationField
                                        label="اللقب"
                                        field="last_name"
                                        value={clientData.last_name}
                                    />
                                    <ValidationField
                                        label="الاسم"
                                        field="first_name"
                                        value={clientData.first_name}
                                    />
                                    <ValidationField
                                        label="رقم الهاتف" 
                                        field="phone"
                                        value={clientData.phone}
                                    />
                                    <ValidationField
                                        label="الجنس"
                                        field="gender"
                                        value={clientData.gender}
                                        type="select"
                                        options={['ذكر', 'انثى']}
                                    />
                                    <ValidationField
                                        label="تاريخ الميلاد"
                                        field="date_of_birth"
                                        value={clientData.date_of_birth}
                                        type="date"
                                    />
                                    <ValidationField
                                        label="الحالة الاجتماعية"
                                        field="marital_status"
                                        value={clientData.marital_status}
                                        type="select"
                                        options={['أعزب', 'متزوج']}
                                    />
                                    <ValidationField
                                        label="عدد الأطفال"
                                        field="nb_children"
                                        value={clientData.nb_children}
                                        type="number"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Account Information Tab */}
                        <TabsContent value="account" className="space-y-0">
                            <Card className="border-gray-200 shadow-sm pt-0">
                                <CardHeader className="py-6 rounded-t-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-3 text-xl">
                                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                                    <Mail className="h-4 w-4 text-white" />
                                                </div>
                                                معلومات الحساب
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                بيانات تسجيل الدخول والحساب البريدي
                                            </CardDescription>
                                        </div>
                                        <Button
                                            onClick={() => approveAllInSection('account')}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 ml-2" />
                                            قبول الكل
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6 bg-gray-50/50">
                                    <ValidationField
                                        label="رقم الحساب الجاري البريدي (CCP)"
                                        field="ccp"
                                        value={clientData.ccp}
                                    />
                                    <ValidationField
                                        label="البريد الإلكتروني"
                                        field="email"
                                        value={clientData.email}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Job Information Tab */}
                        <TabsContent value="job" className="space-y-0">
                            <Card className="border-gray-200 shadow-sm pt-0">
                                <CardHeader className="py-6 rounded-t-xl bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-3 text-xl">
                                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                                    <Briefcase className="h-4 w-4 text-white" />
                                                </div>
                                                المعلومات المهنية
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                تفاصيل الوظيفة ومكان العمل
                                            </CardDescription>
                                        </div>
                                        <Button
                                            onClick={() => approveAllInSection('job')}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 ml-2" />
                                            قبول الكل
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6 bg-gray-50/50">
                                    <ValidationField
                                        label="الحالة الوظيفية"
                                        field="job_status"
                                        value={clientData.job_status}
                                    />
                                    <ValidationField
                                        label="المنصب الوظيفي"
                                        field="job_title"
                                        value={clientData.job_title}
                                    />
                                    <ValidationField
                                        label="مؤسسة العمل"
                                        field="work_institution"
                                        value={clientData.work_institution}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Documents Tab */}
                        <TabsContent value="documents" className="space-y-4">
                            <Card className="border-gray-200 shadow-sm pt-0">
                                <CardHeader className="py-6 rounded-t-xl bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-3 text-xl">
                                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                                    <FileText className="h-4 w-4 text-white" />
                                                </div>
                                                الملفات المرفقة
                                            </CardTitle>
                                            <CardDescription className="text-gray-600">
                                                الوثائق والملفات المطلوبة للتسجيل
                                            </CardDescription>
                                        </div>
                                        <Button
                                            onClick={() => approveAllDocuments()}
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <CheckCircle className="h-4 w-4 ml-2" />
                                            قبول الكل
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3 p-6 bg-gray-50/50">
                                    {documents && documents.length > 0 ? (
                                        documents.map((doc) => (
                                            <PdfDocumentViewer
                                                key={doc.id}
                                                documentId={doc.id}
                                                fileName={doc.original_name}
                                                description={doc.description}
                                                uploadedAt={doc.created_at}
                                                status={documentValidations[doc.id]?.status || 'pending'}
                                                onReplace={(file: File) => {
                                                    // File replacement is handled in component state only
                                                    // Will be saved to backend later when user clicks final save
                                                    console.log('File selected for replacement:', file.name);
                                                }}
                                                onApprove={() => approveDocument(doc.id)}
                                                onReject={() => rejectDocument(doc.id)}
                                                onReset={() => resetDocumentStatus(doc.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                            <p>لا توجد ملفات مرفقة</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Comment Dialog/Modal */}
                    <Dialog open={!!commentField} onOpenChange={(open) => !open && setCommentField(null)}>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 text-xl">
                                    <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-white" />
                                    </div>
                                    إضافة ملاحظة على الرفض
                                </DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    يرجى توضيح سبب رفض هذا الحقل
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <Textarea
                                    placeholder="مثال: البيانات المدخلة غير صحيحة، يرجى التأكد من المعلومات..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="min-h-32 resize-none border-gray-300 focus:border-rose-400 focus:ring-rose-400"
                                    autoFocus
                                />
                                <div className="flex gap-3">
                                    <Button
                                        onClick={confirmRejection}
                                        className="flex-1 bg-rose-600 hover:bg-rose-700 h-11 text-base font-semibold"
                                        disabled={!commentText.trim()}
                                    >
                                        <Check className="h-4 w-4 ml-2" />
                                        تأكيد الرفض
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setCommentField(null);
                                            setCommentText('');
                                        }}
                                        className="flex-1 h-11 text-base font-semibold hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4 ml-2" />
                                        إلغاء
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Document Rejection Comment Dialog */}
                    <Dialog open={commentDocumentId !== null} onOpenChange={(open) => !open && setCommentDocumentId(null)}>
                        <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 text-xl">
                                    <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-white" />
                                    </div>
                                    إضافة ملاحظة على رفض الوثيقة
                                </DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    يرجى توضيح سبب رفض هذه الوثيقة
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <Textarea
                                    placeholder="مثال: الوثيقة غير واضحة، يرجى رفع نسخة أفضل..."
                                    value={documentCommentText}
                                    onChange={(e) => setDocumentCommentText(e.target.value)}
                                    className="min-h-32 resize-none border-gray-300 focus:border-rose-400 focus:ring-rose-400"
                                    autoFocus
                                />
                                <div className="flex gap-3">
                                    <Button
                                        onClick={confirmDocumentRejection}
                                        className="flex-1 bg-rose-600 hover:bg-rose-700 h-11 text-base font-semibold"
                                        disabled={!documentCommentText.trim()}
                                    >
                                        <Check className="h-4 w-4 ml-2" />
                                        تأكيد الرفض
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setCommentDocumentId(null);
                                            setDocumentCommentText('');
                                        }}
                                        className="flex-1 h-11 text-base font-semibold hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4 ml-2" />
                                        إلغاء
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Final Action Buttons */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <p className="text-gray-600 text-sm">
                                بعد المراجعة الكاملة، يمكنك اتخاذ القرار النهائي بشأن الطلب
                            </p>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 sm:flex-none h-12 border-rose-300 text-rose-700 hover:bg-rose-50 hover:border-rose-400 font-semibold"
                                >
                                    <XCircle className="h-5 w-5 ml-2" />
                                    رفض الطلب نهائياً
                                </Button>
                                <Button
                                    size="lg"
                                    className="flex-1 sm:flex-none h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30 font-semibold"
                                >
                                    <CheckCircle className="h-5 w-5 ml-2" />
                                    الموافقة النهائية
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAppLayout>
    );
}