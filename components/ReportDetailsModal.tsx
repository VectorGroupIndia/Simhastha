import React from 'react';
import { Report, statusStyles } from '../pages/ProfilePage';

interface ReportDetailsModalProps {
    report: Report;
    onClose: () => void;
}

const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);


const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose }) => {
    
    const handleDownloadPdf = () => {
        alert('PDF download functionality would be implemented here. This would generate a PDF of the report details for the user to save.');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full transform transition-all duration-300 scale-95 hover:scale-100" onClick={e => e.stopPropagation()}>
                <div className="p-6 md:p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors">
                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Column */}
                        <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                            <img src={report.imageUrl} alt={report.item} className="w-full h-full object-cover" />
                        </div>

                        {/* Details Column */}
                        <div className="flex flex-col">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                                    {report.type === 'lost' ? 'Lost Item Report' : 'Found Item Report'}
                                </p>
                                <h2 className="text-3xl font-bold text-brand-dark mt-1">{report.item}</h2>
                                 <span className={`mt-3 inline-block px-3 py-1 text-sm font-medium rounded-full ${statusStyles[report.status]}`}>
                                    {report.status}
                                </span>
                            </div>
                            
                            <div className="mt-6 space-y-4 text-slate-600">
                                <div className="flex items-start">
                                    <CalendarIcon className="w-5 h-5 mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                                    <span><strong>Date Reported:</strong> {report.date}</span>
                                </div>
                                 <div className="flex items-start">
                                    <LocationIcon className="w-5 h-5 mr-3 mt-0.5 text-brand-secondary flex-shrink-0" />
                                    <span><strong>Last Known Location:</strong> {report.location}</span>
                                </div>
                            </div>

                             <div className="mt-6 border-t pt-4">
                                <h3 className="font-semibold text-slate-800">Description</h3>
                                <p className="text-slate-600 text-sm mt-2">{report.description}</p>
                            </div>

                        </div>
                    </div>
                     <div className="mt-8 flex justify-end items-center gap-x-4">
                        <button onClick={handleDownloadPdf} className="px-6 py-2 bg-transparent border border-brand-primary text-brand-primary font-semibold rounded-md hover:bg-brand-primary hover:text-white transition-colors">
                            Download PDF
                        </button>
                        <button onClick={onClose} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary/90 transition-opacity">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailsModal;