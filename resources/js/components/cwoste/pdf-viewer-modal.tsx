import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText } from "lucide-react";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { useEffect, useState } from 'react';
import { toolbarPlugin, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar';


// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PdfViewerModalProps {
   isOpen: boolean;
   onClose: () => void;
   file: File | string;
   fileName: string;
}

export default function PdfViewerModal({ isOpen, onClose, file, fileName }: PdfViewerModalProps) {
   const [fileUrl, setFileUrl] = useState<string>('');

   const toolbarPluginInstance = toolbarPlugin();
   const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
   const transform: TransformToolbarSlot = (slot: ToolbarSlot) => {
      const { NumberOfPages } = slot;
      return Object.assign({}, slot, {
         NumberOfPages: () => (
            <>
               of <NumberOfPages />
            </>
         ),
         Open: () => <></>,
         SwitchTheme: () => <></>,
         GoToPreviousPage: () => <></>,
         GoToNextPage: () => <></>,
      });
   };

   useEffect(() => {
      if (isOpen && file) {
         // Convert File object to URL if needed
         if (typeof file === 'string') {
            setFileUrl(file);
         } else {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            // Cleanup on unmount
            return () => {
               URL.revokeObjectURL(url);
            };
         }
      }
   }, [isOpen, file]);

   return (
      <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
         <DialogContent className="max-w-[95vw] lg:max-w-[85vw] w-full p-0 gap-0 flex flex-col h-[95vh] [&>button]:hidden border-0">
            {/* Header */}
            <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-green-500 to-emerald-600 text-white shrink-0 flex-row items-center justify-between gap-8 space-y-0 rounded-t-lg">
               <div className="flex items-start lg:items-center gap-3">
                  <FileText className="h-6 w-6 mt-1 shrink-0 lg:mt-0" />
                  <DialogTitle className="text-xl font-semibold text-white m-0">{fileName}</DialogTitle>
               </div>
               <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-white hover:bg-white/20 shrink-0 self-start"
               >
                  <X className="h-5 w-5" />
               </Button>
            </DialogHeader>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-100 rounded-b-lg">
               {fileUrl ? (
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                     <div className="h-full w-full" style={{ direction: 'ltr' }}>
                        <div
                           className="rpv-core__viewer"
                           style={{
                              border: '1px solid rgba(0, 0, 0, 0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              height: '100%',
                           }}
                        >
                           <div
                              style={{
                                 alignItems: 'center',
                                 backgroundColor: '#eeeeee',
                                 borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                 display: 'flex',
                                 padding: '4px',
                              }}
                           >
                              <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                           </div>
                           <div
                              style={{
                                 flex: 1,
                                 overflow: 'hidden',
                              }}
                           >
                              <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
                           </div>
                        </div>
                     </div>
                  </Worker>
               ) : (
                  <div className="h-full flex items-center justify-center">
                     <div className="text-center">
                        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">جاري تحميل المستند...</p>
                     </div>
                  </div>
               )}
            </div>
         </DialogContent>
      </Dialog>
   );
}