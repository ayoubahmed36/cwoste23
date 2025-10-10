import React, { useEffect, useRef, useState } from "react";
import { X, ImagePlus } from "lucide-react";

interface RegisterImageUploadProps {
    value?: File | string | null; // <- ✅ accept File or URL string
    onImageChange?: (file: File | null) => void;
}

export default function RegisterImageUpload({ value, onImageChange }: RegisterImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ✅ Sync `value` prop to `preview` whenever parent changes it
    useEffect(() => {
        if (typeof value === "string") {
            setPreview(value); // URL provided
        } else if (value instanceof File) {
            setPreview(URL.createObjectURL(value));
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange?.(file); // Parent updates `value` → useEffect sets preview
        }
    };

    const handleClick = () => fileInputRef.current?.click();

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onImageChange?.(null); // clear in parent
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div
            onClick={handleClick}
            className="flex-1 flex flex-col items-center justify-center rounded-md border-2 py-4 border-dashed border-gray-300 hover:border-green-400 bg-white/60 dark:bg-slate-900/40 cursor-pointer transition-all duration-200"
        >
            <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 border border-gray-200 overflow-hidden">
                    {preview ? (
                        <img
                            src={preview}
                            alt="الصورة الشخصية"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ImagePlus className="w-8 h-8" />
                    )}
                </div>

                {preview && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute -top-1 -start-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition cursor-pointer"
                        aria-label="إزالة الصورة"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <p className="text-sm font-medium text-gray-600 mt-3">
                انقر لاختيار الصورة الشخصية
            </p>
            <p className="text-xs text-gray-400">PNG أو JPG حتى 2MB</p>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
