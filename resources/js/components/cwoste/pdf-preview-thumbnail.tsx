import { Document, Page } from "react-pdf";

export default function PdfPreviewThumbnail({ file, label }: { file: File | string | null; label?: string }) {
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

	const isFile = file instanceof File;

	return (
		<div className="flex items-center gap-3">
			<div className="relative border-2 border-gray-300 rounded-lg p-0.5 bg-white group">
				<Document
					file={file}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="w-16 h-20 bg-gray-50 flex items-center justify-center">
							<div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
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
				{/* Dark overlay with button on hover */}
				<div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
					<button
						type="button"
						className="px-1 py-1 bg-green-500 text-white text-[10px] font-medium rounded hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							// TODO: Implement preview modal
							console.log('Preview file:', file);
						}}
					>
						عرض الملف
					</button>
				</div>
			</div>
			{isFile && (
				<div className="flex-1 min-w-0">
					{label && <p className="text-sm font-medium text-gray-800 truncate">{label}</p>}
					<p className="text-sm font-medium text-gray-500 truncate">{file.name}</p>
					<p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
				</div>
			)}
		</div>
	);
};