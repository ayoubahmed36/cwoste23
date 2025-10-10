import { useDropzone } from 'react-dropzone';
import { LuUser, LuCamera, LuX } from "react-icons/lu";
import { useState } from 'react';

interface ImageUploadProps {
    onImageChange: (file: File | null) => void;
    preview?: string | null;
    variant?: 'profile' | 'register';
    label?: string;
}

export default function ImageUpload({
    onImageChange,
    preview = null,
    variant = 'register',
    label = "الصورة الشخصية"
}: ImageUploadProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(preview);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024, // 2MB
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setCurrentFile(file);
                onImageChange(file);

                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        onDropRejected: (fileRejections) => {
            if (fileRejections[0]?.errors[0]?.code === 'file-too-large') {
                alert('حجم الصورة كبير جداً. الحد الأقصى 2MB');
            }
        }
    });

    const handleRemoveImage = () => {
        setCurrentFile(null);
        setImagePreview(null);
        onImageChange(null);
    };

    const isProfileVariant = variant === 'profile';

    return (
        <div className="flex flex-col gap-5">
            {!isProfileVariant && (
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <LuUser className="text-purple-600 size-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{label}</h2>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 ${isDragActive
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-green-400'
                    } ${isProfileVariant ? 'max-w-md mx-auto' : ''}`}
            >
                <input {...getInputProps()} />

                {/* Image Preview */}
                {imagePreview ? (
                    <div className={`relative ${isProfileVariant ? 'group' : ''}`}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className={`${isProfileVariant
                                    ? 'w-40 h-40 rounded-full'
                                    : 'w-32 h-32 rounded-full'
                                } object-cover border-4 border-white shadow-lg`}
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                            }}
                            className={`absolute bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 ${isProfileVariant
                                    ? '-top-2 -right-2 p-2 opacity-0 group-hover:opacity-100'
                                    : '-top-2 -right-2 p-1.5'
                                }`}
                            title="إزالة الصورة"
                        >
                            <LuX className="size-4" />
                        </button>
                    </div>
                ) : (
                    <div className={`flex flex-col items-center justify-center gap-3 ${isProfileVariant ? 'w-40 h-40' : 'w-32 h-32'
                        }`}>
                        <div className={`rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-dashed ${isDragActive
                                ? 'border-green-500'
                                : 'border-gray-400'
                            } ${isProfileVariant ? 'w-full h-full' : 'w-32 h-32'}`}>
                            <LuUser className={`${isDragActive ? 'text-green-500' : 'text-gray-500'} ${isProfileVariant ? 'size-16' : 'size-12'
                                }`} />
                        </div>
                    </div>
                )}

                {/* Upload Content */}
                <div className="text-center">
                    {!imagePreview ? (
                        <div className="inline-flex flex-col items-center gap-2">
                            <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2">
                                <LuCamera className="size-5" />
                                {isDragActive ? 'إسقاط الصورة هنا' : 'اختيار صورة شخصية'}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2">
                                <LuCamera className="size-4" />
                                تغيير الصورة
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage();
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                            >
                                <LuX className="size-4" />
                                إزالة
                            </button>
                        </div>
                    )}

                    <p className="text-sm text-gray-600 mt-2 max-w-md">
                        {currentFile
                            ? currentFile.name
                            : 'اسحب وأسقط الصورة هنا أو انقر للاختيار (PNG, JPG, JPEG - الحد الأقصى 2MB)'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}