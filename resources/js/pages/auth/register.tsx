import { Head, useForm } from '@inertiajs/react';
import ClientAuthLayout from '@/layouts/client-auth-layout';
import InputNumber from '@/components/cwoste/input-number';
import InputSelect from '@/components/cwoste/input-select';
import PdfUploader from '@/components/cwoste/pdf-uploader';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import ConfirmationDialog2 from '@/components/confirmation-dialog2';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CInput from '@/components/cwoste/c-input';
import DatePicker from '@/components/cwoste/date-picker';
import RegisterImageUpload from '@/components/cwoste/register-image-upload';
import PdfPreviewThumbnail from '@/components/cwoste/pdf-preview-thumbnail';
import fillRegistrationForm from '@/utils-temp/fill-registration-form';

interface RegisterPropsType {
	documents: {
		id: number;
		description: string;
	}[];
}

export default function Register({ documents }: RegisterPropsType) {

	useEffect(() => {
		fillRegistrationForm(setData);
	}, []);

	const [isOpen, setIsOpen] = useState<boolean>(false)

	// 🔹 Personal image state
	const [personalImage, setPersonalImage] = useState<File | null>(null);

	const { data, setData, errors, post, processing } = useForm({
		ccp: '',
		email: '',
		password: '',
		password_confirmation: '',
		personalImage: null as File | null,

		lastName: '',
		firstName: '',
		phone: '',
		gender: '',
		dateOfBirth: new Date(),
		maritalStatus: '',
		nbChildren: 0,
		jobStatus: '',
		jobTitle: '',
		workInstitution: '',
		documents: documents.map((doc) => ({
			id: doc.id,
			description: doc.description,
			file: null as File | null,
		}))
	});

	const handleFileChange = (index: number, file: File | null) => {
		const updatedDocuments = [...data.documents];
		updatedDocuments[index] = {
			...updatedDocuments[index],
			file,
		};
		setData("documents", updatedDocuments);
	};

	const handleImageChange = (file: File | null) => {
		setPersonalImage(file);
		setData('personalImage', file);
	};

	const handleSubmit = () => {
		post("/register", {
			forceFormData: true,
		});
	};

	const handlePreview = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		post("/register/preview", {
			forceFormData: true,
			onSuccess: () => {
				setIsOpen(true)
			}
		})
	};

	const formatDate = (d: Date) => {
		return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
	}

	useEffect(() => {
	}, [data.dateOfBirth]);

	const PreviewField = ({ label, value }: { label: string; value: string | number | Date }) => (
		<div className="flex justify-between items-center py-2 px-3 bg-white rounded border">
			<span className="text-sm font-medium text-gray-600">{label}:</span>
			<span className="text-sm text-gray-800 font-medium">
				{value instanceof Date ? value.toLocaleDateString() : value || (
					<span className="text-gray-400">لم يتم ادخال البيانات</span>
				)}
			</span>
		</div>
	);

	return (
		<ClientAuthLayout>
			<Head title="إنشاء حساب جديد" />

			<div className="rounded-lg bg-white shadow-sm border border-gray-200">

				<div className="bg-white pt-6 px-6 rounded-t-lg flex items-center justify-center gap-4">
					<div className="bg-green-50 w-16 h-16 flex items-center justify-center rounded-full text-green-500">
						<i className="fas fa-user-plus text-2xl"></i>
					</div>
					<div>
						<h2 className="text-gray-800 font-bold text-xl">إنشاء حساب جديد</h2>
						<p className="text-gray-500 text-sm mt-1">سجل حساب جديد</p>
					</div>
				</div>

				<form onSubmit={handlePreview} className="p-6 flex flex-col gap-8">

					{/* 🟢 معلومات الحساب */}
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
								<i className="fas fa-info-circle text-blue-600"></i>
							</div>
							<h2 className="text-xl font-bold text-gray-800">معلومات الحساب</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-100/50 rounded-md p-5 py-10 border border-gray-200">
							<CInput label="رقم ال CCP" placeholder="أدخل رقم ال CCP" type="text" required icon="lucide:send" value={data.ccp} onChange={(value) => setData('ccp', value)} dir="ltr" error={errors.ccp} />
							<CInput label="الايميل" placeholder="example@domain.com" type="email" required icon="lucide:mail" value={data.email} onChange={(value) => setData('email', value)} dir="ltr" error={errors.email} />
							<CInput label="كلمة السر" placeholder="كلمة السر" required type="password" icon="lucide:lock" value={data.password} onChange={(value) => setData('password', value)} dir="ltr" error={errors.password} />
							<CInput label="تأكيد كلمة السر" placeholder="تأكيد كلمة السر" required type="password" icon="lucide:lock" value={data.password_confirmation} onChange={(value) => setData('password_confirmation', value)} dir="ltr" error={errors.password_confirmation} />
						</div>
					</div>

					{/* 🟦 المعلومات الشخصية */}
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center ml-3">
								<i className="fas fa-user text-pink-600"></i>
							</div>
							<h2 className="text-xl font-bold text-gray-800">المعلومات الشخصية</h2>
						</div>
						<div className="flex flex-col gap-5 bg-gray-100/50 rounded-md p-5 py-10 border border-gray-200">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="grid grid-cols-1 gap-5">
									<CInput label="اللقب" placeholder="أدخل اللقب" type="text" required value={data.lastName} onChange={(value) => setData('lastName', value)} error={errors.lastName} />
									<CInput label="الاسم" placeholder="أدخل الاسم" type="text" required value={data.firstName} onChange={(value) => setData('firstName', value)} error={errors.firstName} />
								</div>
								<RegisterImageUpload value={data.personalImage} onImageChange={handleImageChange} />


								<CInput label="رقم الهاتف" placeholder="أدخل رقم الهاتف" type="text" dir="ltr" required value={data.phone} onChange={(value) => setData('phone', value)} error={errors.phone} />
								<DatePicker
									label="تاريخ الميلاد"
									required
									value={new Date(data.dateOfBirth)}
									onChange={(newDate) => {
										newDate && setData('dateOfBirth', newDate)
									}}
									error={errors.dateOfBirth}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
								<InputSelect label="الجنس" options={['ذكر', 'انثى']} required value={data.gender} onChange={(value) => setData('gender', value)} placeholder="اختر الجنس" error={errors.gender} />
								<InputSelect label="الحالة الاجتماعية" options={['أعزب', 'متزوج']} required value={data.maritalStatus} onChange={(value) => setData('maritalStatus', value)} placeholder="اختر الحالة الاجتماعية" error={errors.maritalStatus} />
								<InputNumber label="عدد الأطفال" value={data.nbChildren} onChange={(value) => setData('nbChildren', value)} error={errors.nbChildren} required />
							</div>
						</div>
					</div>


					{/* 🟧 المعلومات الوظيفية */}
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
								<i className="fas fa-briefcase text-amber-600"></i>
							</div>
							<h2 className="text-xl font-bold text-gray-800">المعلومات الوظيفية</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-100/50 rounded-md p-5 py-10 border border-gray-200">
							{/* الحالة الوظيفية */}
							<InputSelect
								label="الحالة الوظيفية"
								options={['موظف', 'متقاعد']}
								required
								value={data.jobStatus}
								onChange={(value) => setData('jobStatus', value)}
								placeholder='اختر الحالة الوظيفية'
								error={errors.jobStatus}
							/>

							{/* اسم الوظيفة */}
							<CInput
								label={`${data.jobStatus == "موظف" ? "اسم الوظيفة" : "اسم الوظيفة السابقة"}`}
								placeholder="مثال: أستاذ التعليم الثانوي"
								type="text"
								required
								value={data.jobTitle}
								onChange={(value) => setData('jobTitle', value)}
								error={errors.jobTitle}
							/>

							{/* مؤسسة العمل */}
							<CInput
								label="مؤسسة العمل"
								placeholder="أدخل اسم المؤسسة"
								type="text"
								required
								value={data.workInstitution || ''}
								onChange={(value) => setData('workInstitution', value)}
								error={errors.workInstitution}
							/>
						</div>
					</div>


					{/* 🟣 رفع الملفات */}
					<div className="flex flex-col gap-5">
						<div className="flex items-center gap-2">
							<div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
								<i className="fas fa-file-upload text-purple-600"></i>
							</div>
							<h2 className="text-xl font-bold text-gray-800">رفع الملفات</h2>
						</div>

						<div className="space-y-5">
							{documents.map((doc, index) => {
								const fileError = errors[`documents.${index}.file`];
								return (
									<div key={index}>
										<PdfUploader
											maxSize={1}
											label={doc.description}
											file={data.documents[index].file}
											onFileChange={(file) => handleFileChange(index, file)}
										/>
										{fileError && (
											<p className="text-destructive text-sm mt-1">{fileError}</p>
										)}
									</div>
								);
							})}
						</div>
					</div>

					<div className="flex items-center">
						<Checkbox id="terms" className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white" required />
						<label htmlFor="terms" className="mr-2 text-sm font-medium text-gray-700">أوافق على <a href="#" className="text-green-600 hover:underline">الشروط والأحكام</a></label>
					</div>

					<div className="pt-6 border-t border-gray-200">
						{/* Preview Button */}
						<button type="submit" className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg" disabled={processing}>
							{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <i className="fas fa-user-plus"></i>}
							<span>إنشاء حساب</span>
						</button>
					</div>
					<p className="text-sm text-center">لديك حساب بالفعل؟ <a href="#" className="text-green-500 hover:underline font-medium">سجل الدخول هنا</a></p>

					<ConfirmationDialog2
						title={
							<div className="flex items-center gap-2">
								<Check className="size-8 text-green-500" />
								<span>مراجعة البيانات قبل التسجيل</span>
							</div>
						}
						closeButton={
							<Button variant="outline">
								العودة للتعديل
							</Button>
						}
						confirmButton={
							<button type="button" onClick={handleSubmit} className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md" disabled={processing}>
								{processing ? <Loader2 className="h-4 w-4 animate-spin" /> : ""}
								<span>تأكيد التسجيل</span>
							</button>
						}
						open={isOpen}
						onOpenChange={setIsOpen}
					>
						<div className="space-y-6">
							{/* Account Information Preview */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
										<i className="fas fa-info-circle text-green-600 text-sm"></i>
									</div>
									<h3 className="font-bold text-gray-800">معلومات الحساب</h3>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 px-4 py-8 rounded-lg border">
									<PreviewField label="رقم ال CCP" value={data.ccp} />
									<PreviewField label="الايميل" value={data.email} />
								</div>
							</div>

							{/* Personal Information Preview */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
										<i className="fas fa-user text-blue-600 text-sm"></i>
									</div>
									<h3 className="font-bold text-gray-800">المعلومات الشخصية</h3>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 px-4 py-8 rounded-lg border">
									<PreviewField label="اللقب" value={data.lastName} />
									<PreviewField label="الاسم" value={data.firstName} />
									<PreviewField label="رقم الهاتف" value={data.phone} />
									<PreviewField label="تاريخ الميلاد" value={data.dateOfBirth} />
									<PreviewField label="الجنس" value={data.gender} />
									<PreviewField label="الحالة الاجتماعية" value={data.maritalStatus} />
									<PreviewField label="عدد الأطفال" value={data.nbChildren} />
								</div>
							</div>

							{/* Personal Image Preview */}
							{data.personalImage && (
								<div>
									<div className="flex items-center gap-2 mb-4">
										<div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
											<i className="fas fa-camera text-amber-600 text-sm"></i>
										</div>
										<h3 className="font-bold text-gray-800">الصورة الشخصية</h3>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg border">
										<div className="flex items-center gap-3">
											<div className="w-16 h-16 rounded-full overflow-hidden bg-white">
												<img
													src={URL.createObjectURL(data.personalImage)}
													alt="الصورة الشخصية"
													className="w-full h-full object-cover"
												/>
											</div>
											<div>
												<p className="font-medium text-gray-800">{data.personalImage?.name}</p>
												<p className="text-sm text-gray-500">{(data.personalImage?.size / 1024).toFixed(1)} KB</p>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Job Information Preview */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
										<i className="fas fa-briefcase text-purple-600 text-sm"></i>
									</div>
									<h3 className="font-bold text-gray-800">المعلومات الوظيفية</h3>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 px-4 py-8 rounded-lg border">
									<PreviewField label="الحالة الوظيفية" value={data.jobStatus} />
									<PreviewField label="اسم الوظيفة" value={data.jobTitle} />
									<PreviewField label="مؤسسة العمل" value={data.workInstitution} />
								</div>
							</div>

							{/* Files Preview */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
										<i className="fas fa-file-pdf text-red-600 text-sm"></i>
									</div>
									<h3 className="font-bold text-gray-800">الملفات المرفوعة</h3>
								</div>
								<div className="space-y-3">
									{data.documents.map((doc, index) => (
										<div key={index}>
											<PdfPreviewThumbnail file={doc.file} label={doc.description} />
										</div>
									))}
								</div>
							</div>
						</div>
					</ConfirmationDialog2>

				</form>
			</div>

		</ClientAuthLayout>
	);
}