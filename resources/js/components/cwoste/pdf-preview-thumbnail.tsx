import { Document, Page } from "react-pdf";

export default function PdfPreviewThumbnail({ file, label }: { file: File | null; label?: string }) {
	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => { };

	if (!file) {
		return (
			<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
				<div className="w-12 h-14 bg-white border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400">
					<i className="fas fa-file-pdf text-lg mb-1"></i>
					<span className="text-xs">PDF</span>
				</div>
				<div>
					<p className="text-sm font-medium text-gray-600">{label || 'No file'}</p>
					<p className="text-xs text-gray-400">لم يتم رفع الملف</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-3">
			<div className="relative border border-gray-500 p-0.5">
				<Document
					file={file}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="w-12 h-14 bg-white border border-blue-300 rounded-md flex items-center justify-center">
							<div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
						</div>
					}
				>
					<Page
						pageNumber={1}
						width={48}
						height={56}
						renderTextLayer={false}
						renderAnnotationLayer={false}
					/>
				</Document>
			</div>
			<div className="flex-1 min-w-0">
				{label && <p className="text-sm font-medium text-gray-800 truncate">{label}</p>}
				<p className="text-sm font-medium text-gray-500 truncate">{file.name}</p>
				<p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
			</div>
		</div>
	);
};