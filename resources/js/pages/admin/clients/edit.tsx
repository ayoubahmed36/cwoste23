import AdminAppLayout from "@/layouts/admin-app-layout";
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, Pencil, Check, X, Download, User, Mail, Phone, Calendar, Briefcase, FileText } from 'lucide-react';

type FieldStatus = 'pending' | 'approved' | 'rejected';

interface FieldValidation {
    status: FieldStatus;
    comment?: string;
}

interface ClientData {
    ccp: string;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    maritalStatus: string;
    nbChildren: number;
    jobStatus: string;
    jobTitle: string;
}

export default function Edit() {
    // Mock client data from registration form
    const [clientData, setClientData] = useState<ClientData>({
        ccp: "1234567890",
        email: "mohamed.ahmed@example.com",
        lastName: "أحمد",
        firstName: "محمد",
        phone: "+213555123456",
        gender: "ذكر",
        dateOfBirth: "1985-05-15",
        maritalStatus: "متزوج",
        nbChildren: 3,
        jobStatus: "موظف",
        jobTitle: "أستاذ التعليم الثانوي"
    });

    const [fieldValidations, setFieldValidations] = useState<Record<string, FieldValidation>>({
        ccp: { status: 'pending', comment: '' },
        email: { status: 'pending', comment: '' },
        lastName: { status: 'pending', comment: '' },
        firstName: { status: 'pending', comment: '' },
        phone: { status: 'pending', comment: '' },
        gender: { status: 'pending', comment: '' },
        dateOfBirth: { status: 'pending', comment: '' },
        maritalStatus: { status: 'pending', comment: '' },
        nbChildren: { status: 'pending', comment: '' },
        jobStatus: { status: 'pending', comment: '' },
        jobTitle: { status: 'pending', comment: '' }
    });

    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const [commentField, setCommentField] = useState<string | null>(null);
    const [commentText, setCommentText] = useState<string>('');

    const approveField = (field: string) => {
        setFieldValidations(prev => ({
            ...prev,
            [field]: { ...prev[field], status: 'approved', comment: '' }
        }));
    };

    const rejectField = (field: string) => {
        setCommentField(field);
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
        setEditValue(value.toString());
    };

    const saveEdit = () => {
        if (editingField) {
            setClientData(prev => ({
                ...prev,
                [editingField]: editingField === 'nbChildren' ? parseInt(editValue) : editValue
            }));
            setFieldValidations(prev => ({
                ...prev,
                [editingField]: { status: 'approved', comment: 'تم التعديل من قبل المسؤول' }
            }));
            setEditingField(null);
        }
    };

    const StatusBadge = ({ status }: { status: FieldStatus }) => {
        const config = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'قيد المراجعة' },
            approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'مقبول' },
            rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'مرفوض' }
        };
        const { color, icon: Icon, text } = config[status];
        return (
            <Badge className={`${color} gap-1`}>
                <Icon className="h-3 w-3" />
                {text}
            </Badge>
        );
    };

    interface ValidationFieldProps {
        label: string;
        field: string;
        value: string | number;
        type?: 'text' | 'number' | 'select';
        options?: string[];
    }

    const ValidationField = ({ label, field, value, type = 'text', options }: ValidationFieldProps) => {
        const validation = fieldValidations[field];

        return (
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="font-medium min-w-[150px]">{label}</span>
                        {editingField === field ? (
                            <div className="flex items-center gap-2">
                                {type === 'select' && options ? (
                                    <Select value={editValue} onValueChange={setEditValue}>
                                        <SelectTrigger className="w-48">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map(option => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        type={type}
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="w-48"
                                    />
                                )}
                                <Button size="sm" onClick={saveEdit}><Check className="h-4 w-4" /></Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingField(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <span className="text-gray-700">{value}</span>
                        )}
                        <StatusBadge status={validation.status} />
                    </div>

                    {validation.comment && (
                        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{validation.comment}</p>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditing(field, value)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => approveField(field)}>
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => rejectField(field)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <AdminAppLayout>
            <Head title="مراجعة طلب التسجيل" />

            <div className="container mx-auto p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">مراجعة طلب التسجيل</h1>
                        <p className="text-gray-600">العميل: محمد أحمد</p>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                        قيد المراجعة
                    </Badge>
                </div>

                <Tabs defaultValue="account" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="account">معلومات الحساب</TabsTrigger>
                        <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
                        <TabsTrigger value="job">المعلومات الوظيفية</TabsTrigger>
                        <TabsTrigger value="files">الملفات</TabsTrigger>
                    </TabsList>

                    {/* Account Information */}
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    معلومات الحساب
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ValidationField
                                    label="رقم ال CCP"
                                    field="ccp"
                                    value={clientData.ccp}
                                />
                                <ValidationField
                                    label="الايميل"
                                    field="email"
                                    value={clientData.email}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Personal Information */}
                    <TabsContent value="personal">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    المعلومات الشخصية
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ValidationField
                                    label="اللقب"
                                    field="lastName"
                                    value={clientData.lastName}
                                />
                                <ValidationField
                                    label="الاسم"
                                    field="firstName"
                                    value={clientData.firstName}
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
                                    field="dateOfBirth"
                                    value={clientData.dateOfBirth}
                                />
                                <ValidationField
                                    label="الحالة الاجتماعية"
                                    field="maritalStatus"
                                    value={clientData.maritalStatus}
                                    type="select"
                                    options={['أعزب', 'متزوج']}
                                />
                                <ValidationField
                                    label="عدد الأطفال"
                                    field="nbChildren"
                                    value={clientData.nbChildren}
                                    type="number"
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Job Information */}
                    <TabsContent value="job">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    المعلومات الوظيفية
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ValidationField
                                    label="الحالة الوظيفية"
                                    field="jobStatus"
                                    value={clientData.jobStatus}
                                    type="select"
                                    options={['موظف', 'متقاعد']}
                                />
                                <ValidationField
                                    label="اسم الوظيفة"
                                    field="jobTitle"
                                    value={clientData.jobTitle}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Files */}
                    <TabsContent value="files">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    الملفات المرفوعة
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-8 w-8 text-red-500" />
                                        <div>
                                            <p className="font-medium">شهادة العمل.pdf</p>
                                            <p className="text-sm text-gray-500">2.1 MB</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Comment Dialog */}
                {commentField && (
                    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96">
                        <CardHeader>
                            <CardTitle>تعليق على الرفض</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="أدخل سبب الرفض..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="h-24"
                            />
                        </CardContent>
                        <CardContent className="flex gap-2">
                            <Button onClick={confirmRejection} className="flex-1">تأكيد</Button>
                            <Button variant="outline" onClick={() => setCommentField(null)} className="flex-1">
                                إلغاء
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Final Actions */}
                <div className="flex gap-4 justify-end pt-6 border-t">
                    <Button variant="outline" size="lg">رفض الطلب</Button>
                    <Button size="lg">موافقة نهائية</Button>
                </div>
            </div>
        </AdminAppLayout>
    );
}