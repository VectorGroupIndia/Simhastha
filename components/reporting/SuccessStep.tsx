import React from 'react';
import { ReportData } from '../../pages/ReportFlowPage';

interface SuccessStepProps {
    onFileAnother: () => void;
    reportData: ReportData;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ onFileAnother, reportData }) => {
     const handleDownloadPdf = () => {
        alert('PDF download functionality would be implemented here. This would generate a PDF of the report details for the user to save.');
    };
    
    return (
        <div className="text-center space-y-8">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg text-slate-700">
                Your report for the <strong>{reportData.itemName}</strong> has been submitted. You will receive notifications via Email and SMS. You can track the status of your report on your profile page.
            </p>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-left space-y-4">
                <h3 className="text-md font-semibold text-blue-800">Note after form Submission</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-blue-700 pl-4">
                    {reportData.category === 'Electronics' && (reportData.subcategory === 'Mobile Phone' || reportData.subcategory === 'Other') && (
                        <li>In case of a Lost Mobile Handset, after registering the complaint here, please proceed to the <a href="https://www.ceir.gov.in/Home/index.jsp" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-blue-900">Central Equipment Identity Register (CEIR)</a> website for blocking the handset and for all-India traceability.</li>
                    )}
                    <li>This is a digitally signed document and requires no signature as per IT Act 2008.</li>
                    <li>If required, approach the concerned Police Station for a Police Stamp/Signature.</li>
                    <li>This application is for lodging reports of Articles Lost / Found in the respective City only.</li>
                </ul>
            </div>
            
            <div className="p-4 bg-red-50 border-l-4 border-red-400 text-left space-y-4">
                <h3 className="text-md font-semibold text-red-800">Disclaimer</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-red-700 pl-4">
                    <li>The report lodged with this application is not a subject matter of enquiry/investigation.</li>
                    <li>In case the loss is due to theft or any other crime, contact the nearest police station.</li>
                    <li>A false report to the police is a punishable offence as per the IPC & IT Act.</li>
                </ul>
            </div>
            
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t pt-6">
                 <button 
                    onClick={handleDownloadPdf} 
                    className="w-full sm:w-auto bg-transparent border border-brand-primary text-brand-primary font-semibold py-2 px-6 rounded-md hover:bg-brand-primary hover:text-white transition-colors"
                >
                    Download Report (PDF)
                </button>
                <button 
                    onClick={onFileAnother} 
                    className="w-full sm:w-auto bg-brand-secondary text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                    File Another Report
                </button>
            </div>
        </div>
    );
};

export default SuccessStep;
