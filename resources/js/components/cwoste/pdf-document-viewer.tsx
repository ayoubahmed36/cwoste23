import { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Document, Page } from "react-pdf";
import { Download, Upload, X, Check, Loader2, Clock } from "lucide-react";
import { Icon } from "@iconify/react";

interface PdfDocumentViewerProps {
	documentId: number;
	fileName: string;
	description: string;
	uploadedAt?: string;
	status?: 'pending' | 'accepted' | 'rejected';
	onReplace?: (file: File) => void;
	onApprove?: () => void;
	onReject?: () => void;
	onReset?: () => void;
}

export default function PdfDocumentViewer({
	documentId,
	fileName,
	description,
	uploadedAt,
	status = 'pending',
	onReplace,
	onApprove,
	onReject,
	onReset,
}: PdfDocumentViewerProps) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [newFile, setNewFile] = useState<File | null>(null);

	// Fetch PDF from protected route
	useEffect(() => {
		const fetchPdf = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/documents/${documentId}`);

				if (!response.ok) {
					const errorText = await response.text();
					console.error("Failed to fetch document:", {
						status: response.status,
						statusText: response.statusText,
						body: errorText,
						documentId,
					});
					throw new Error("فشل في تحميل الملف");
				}

				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				setPdfUrl(url);
				setError(null);
			} catch (err) {
				console.error("Document fetch error:", err);
				setError(err instanceof Error ? err.message : "حدث خطأ");
			} finally {
				setLoading(false);
			}
		};

		fetchPdf();

		// Cleanup
		return () => {
			if (pdfUrl) {
				URL.revokeObjectURL(pdfUrl);
			}
		};
	}, [documentId]);

	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			setError(null);

			if (rejectedFiles && rejectedFiles.length > 0) {
				setError("الملف يتجاوز الحجم الأقصى (1MB) أو ليس ملف PDF");
				return;
			}

			if (acceptedFiles && acceptedFiles.length > 0) {
				const selectedFile = acceptedFiles[0];

				if (selectedFile.size > 1024 * 1024) {
					setError("الملف يتجاوز الحجم الأقصى (1MB)");
					return;
				}

				// Just set the new file, don't auto-approve yet
				// The approval will happen later when changes are saved
				setNewFile(selectedFile);
				setError(null);
				
				// Call onReplace to notify parent of file selection
				if (onReplace) {
					onReplace(selectedFile);
				}
			}
		},
		[onReplace]
	);

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		accept: { "application/pdf": [".pdf"] },
		maxSize: 1024 * 1024,
		multiple: false,
		noClick: false, // Always allow click
		noDrag: false,  // Always allow drag
	});

	const handleConfirmReplace = () => {
		if (newFile && onReplace) {
			onReplace(newFile);
			setNewFile(null); // Return to state 1
		}
	};

	const handleCancelReplace = () => {
		setNewFile(null); // Return to state 1
		setError(null);
	};

	const handleDownload = () => {
		if (pdfUrl) {
			const link = document.createElement("a");
			link.href = pdfUrl;
			link.download = fileName;
			link.click();
		}
	};

	// Loading state
	if (loading) {
		return (
			<div className="h-32 rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-center gap-4">
				<Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
				<span className="text-gray-600">جاري تحميل {description}...</span>
			</div>
		);
	}

	// Error state (file upload error OR failed to load document) - STATE 3
	// Show this when there's an error, regardless of whether DB file exists
	if (error) {
		return (
			<section
				aria-label="Error state"
				className={`h-32 rounded-xl border-2 border-red-200 bg-red-50 p-4 flex flex-col md:flex-row justify-center md:items-center md:justify-between gap-4 transition-colors ${isDragActive ? "border-red-400" : "border-red-200"}`}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<div className="flex flex-1 min-w-0 items-center gap-3">
					<div className="relative w-12 h-12 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600">
						<i className="fa-solid fa-triangle-exclamation text-xl"></i>
					</div>
					<div className="flex-1 min-w-0">
						<h2 className="font-medium text-red-800 truncate">{description}</h2>
						<p className="text-xs text-red-700 mt-1 truncate">
							سبب الخطأ: <span className="font-semibold">{error}</span>.
						</p>
						{pdfUrl && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									setError(null); // Clear error and return to STATE 1
									setNewFile(null);
								}}
								className="text-xs text-green-600 hover:text-green-800 underline mt-1 cursor-pointer bg-transparent border-none p-0"
							>
								العودة للملف الأصلي
							</button>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="destructive"
						onClick={(e) => {
							e.stopPropagation();
							setError(null); // Clear error
							open(); // Open file picker
						}}
						className="w-full md:w-auto"
					>
						استبدال
					</Button>
				</div>
			</section>
		);
	}

	// Replace mode - Success state (new file selected) - STATE 2
	if (newFile) {
		return (
			<section
				aria-label="New file selected"
				className={`h-40 md:h-32 rounded-xl border-2 border-green-200 bg-green-50 p-4 flex flex-col md:flex-row items-center md:justify-between md:gap-4 transition-colors ${isDragActive ? "border-green-400" : "border-green-200"}`}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<div className="w-full min-w-0 flex items-center gap-4">
					<div className="relative inline-block">
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setNewFile(null); // Return to STATE 1 (DB file)
							}}
							className="absolute -top-2 z-10 -start-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition cursor-pointer"
							aria-label="إزالة الملف"
						>
							<Icon icon="lucide:x" />
						</button>
						<div className="relative border-2 border-green-300 rounded-lg p-0.5 bg-white">
							<Document
								file={newFile}
								loading={
									<div className="w-16 h-20 bg-green-50 flex items-center justify-center">
										<Loader2 className="w-5 h-5 text-green-500 animate-spin" />
									</div>
								}
							>
								<Page
									pageNumber={1}
									width={64}
									renderTextLayer={false}
									renderAnnotationLayer={false}
								/>
							</Document>
						</div>
					</div>
					<div className="flex-1 min-w-0">
						<h2 className="font-semibold text-green-900 truncate">{newFile.name}</h2>
						<p className="text-sm text-green-700 mt-1">{description}</p>
						<p className="text-xs text-green-600 mt-1">
							{(newFile.size / 1024 / 1024).toFixed(2)} MB
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={(e) => {
							e.stopPropagation();
							open(); // Open file picker for replacement
						}}
						className="bg-white border-green-200 text-green-800 hover:bg-green-100 w-full md:w-auto"
					>
						<Upload className="h-4 w-4 ml-1.5" />
						استبدال
					</Button>
				</div>
			</section>
		);
	}

	// Normal view mode - Success state (document loaded) - STATE 1
	return (
		<section
			aria-label="Document loaded"
			className={`h-40 md:h-32 rounded-xl border-2 border-gray-200 bg-white p-4 flex flex-col md:flex-row items-center md:justify-between md:gap-4 transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<div className="w-full min-w-0 flex items-center gap-4">
				<div className="relative inline-block">
					{pdfUrl && (
						<div className="relative border-2 border-gray-300 rounded-lg p-0.5 bg-white">
							<Document
								file={pdfUrl}
								loading={
									<div className="w-16 h-20 bg-gray-50 flex items-center justify-center">
										<Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
									</div>
								}
							>
								<Page
									pageNumber={1}
									width={64}
									renderTextLayer={false}
									renderAnnotationLayer={false}
								/>
							</Document>
						</div>
					)}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<h2 className="font-semibold text-gray-900 truncate">{fileName}</h2>
						{status === 'pending' && (
							<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
								قيد المراجعة
							</span>
						)}
						{status === 'accepted' && (
							<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
								مقبول
							</span>
						)}
						{status === 'rejected' && (
							<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
								مرفوض
							</span>
						)}
					</div>
					<p className="text-sm text-gray-700 mt-1">{description}</p>
					{uploadedAt && (
						<p className="text-xs text-gray-600 mt-1">
							{new Date(uploadedAt).toLocaleDateString("ar-DZ", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					)}
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto">
				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={(e) => {
						e.stopPropagation();
						handleDownload();
					}}
					className="bg-white border-gray-200 text-gray-800 hover:bg-gray-100"
				>
					<Download className="h-4 w-4 ml-1.5" />
					تحميل
				</Button>
				{onReplace && (
					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={(e) => {
							e.stopPropagation();
							open(); // Open file picker directly
						}}
						className="bg-white border-gray-200 text-gray-800 hover:bg-gray-100"
					>
						<Upload className="h-4 w-4 ml-1.5" />
						استبدال
					</Button>
				)}
				{/* Toggle button: Shows قبول when pending, shows قيد المراجعة when accepted */}
				{onApprove && onReset && (
					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={(e) => {
							e.stopPropagation();
							if (status === 'pending') {
								onApprove(); // Change to accepted
							} else if (status === 'accepted') {
								onReset(); // Change back to pending
							}
						}}
						className={
							status === 'accepted'
								? "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
								: "bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50"
						}
						title={status === 'accepted' ? "إعادة إلى قيد المراجعة" : "قبول"}
					>
						{status === 'accepted' ? (
							<Clock className="h-4 w-4" />
						) : (
							<Check className="h-4 w-4" />
						)}
					</Button>
				)}
				{onReject && (
					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={(e) => {
							e.stopPropagation();
							onReject();
						}}
						className="bg-white border-rose-300 text-rose-700 hover:bg-rose-50"
						title="رفض"
					>
						<X className="h-4 w-4" />
					</Button>
				)}
			</div>
		</section>
	);
}
