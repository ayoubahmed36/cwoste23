import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Button } from "@/components/ui/button";
import PdfPreviewThumbnail from "./pdf-preview-thumbnail";
import { Icon } from "@iconify/react";

interface PdfUploaderProps {
    label: string;
    file: File | null;
    onFileChange: (file: File | null) => void;
    onError?: (error: string) => void;
    maxSize?: number;
}

export default function PdfUploader({ label, file, onFileChange, onError, maxSize }: PdfUploaderProps) {
    const [error, setError] = useState<string | null>(null);
    const status = error ? "error" : file ? "success" : "empty";

    const maxSizeInMB = maxSize ? maxSize : 1;

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            setError(null); // Clear previous errors

            if (rejectedFiles && rejectedFiles.length > 0) {
                const errorMsg = "الملف يتجاوز الحجم الأقصى (" + maxSize + "MB) أو ليس ملف PDF";
                setError(errorMsg);
                onError?.(errorMsg);
                return;
            }

            if (acceptedFiles && acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];

                // Check file size
                if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
                    const errorMsg = "الملف يتجاوز الحجم الأقصى (" + maxSizeInMB + "MB)";
                    setError(errorMsg);
                    onError?.(errorMsg);
                    return;
                }

                // Valid file
                setError(null);
                onFileChange(selectedFile);
            }
        },
        [onFileChange, onError]
    );

    // ✅ added open() for manual trigger
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: maxSizeInMB * 1024 * 1024, // 5MB
        multiple: false
    });

    // ✅ Replace / Retry just opens picker (no reset)
    const handleRetry = () => { open(); };

    return (
        <div className="flex-1 max-w-4xl flex flex-col gap-4">
            {/* Empty State with Dropzone */}
            {status === "empty" && (
                <section
                    aria-label="Empty state"
                    className={`h-32 rounded-xl border-2 border-dotted bg-white px-6 flex flex-col justify-center md:flex-row md:items-center md:justify-between gap-4 transition-colors ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                            <i className="fa-solid fa-file-pdf text-xl"></i>
                        </div>
                        <p className="text-gray-600 leading-snug font-medium truncate">
                            {isDragActive ? 'أفلت الملف هنا' : label}
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button type="button" size="lg" className="bg-green-50 text-green-600 text-base hover:bg-green-100 flex items-center gap-2 transition cursor-pointer w-full md:w-auto">
                            <i className="fas fa-upload"></i> رفع الملف
                        </Button>
                    </div>
                </section>
            )}

            {/* Error State */}
            {status === "error" && (
                <section aria-label="Error state" className="h-32 rounded-xl border border-red-200 bg-red-50 p-4 flex flex-col md:flex-row justify-center md:items-center md:justify-between gap-4" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex flex-1 min-w-0 items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600">
                            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="font-medium text-red-800 truncate">{label}</h2>
                            <p className="text-xs text-red-700 mt-1 truncate">
                                سبب الخطأ: <span className="font-semibold">{error}</span>.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button type="button" variant="destructive" onClick={(e) => { e.stopPropagation(); handleRetry(); }} className="w-full md:w-auto">
                            إعادة المحاولة
                        </Button>
                    </div>
                </section>
            )}

            {/* Success State */}
            {status === "success" && file && (
                <section aria-label="Uploaded state" className="h-40 md:h-32 rounded-xl border border-green-200 bg-green-50 p-4 flex flex-col md:flex-row items-center md:justify-between md:gap-4" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="w-full min-w-0 flex items-center gap-4">
                        <div className="relative inline-block">
                            {/* ✅ Close button on top of the file preview */}
                            <button
                                type="button"
                                onClick={(e) => { onFileChange(null); onError?.(""); e.stopPropagation(); }}
                                className="absolute -top-2 z-10 -start-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition cursor-pointer"
                                aria-label="إزالة الملف"
                            >
                                <Icon icon="lucide:x" />
                            </button>
                            <PdfPreviewThumbnail file={file} label={label} />
                        </div>

                    </div>
                    <div className="flex items-center gap-2 shrink-0 w-full justify-between md:w-auto">
                        <div className="mt-2 flex items-center gap-2 md:hidden">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-600 text-white">
                                تم الرفع
                            </span>
                            <button className="text-xs text-green-700 underline underline-offset-2 hover:text-green-600 cursor-pointer">
                                معاينة
                            </button>
                        </div>
                        <button type="button" className="px-3 py-2 text-sm rounded-lg bg-white border border-green-200 text-green-800 hover:bg-green-100" onClick={(e) => { e.stopPropagation(); handleRetry(); }}>
                            استبدال الملف
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}
