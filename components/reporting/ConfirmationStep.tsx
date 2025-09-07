import React from 'react';
import { ReportData } from '../../pages/ReportFlowPage';

interface ConfirmationStepProps {
    data: ReportData;
    onConfirm: () => void;
    onBack: () => void;
}

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
    value ? (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-slate-600">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2 break-words">{value}</dd>
        </div>
    ) : null
);

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ data, onConfirm, onBack }) => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-inner border border-slate-200">
                <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">Please confirm the details</h3>
                <div className="sm:divide-y sm:divide-slate-200">
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                         <dt className="text-sm font-medium text-slate-600">Report Image</dt>
                         <dd className="mt-1 sm:mt-0 sm:col-span-2">
                             {data.imagePreview ? (
                                <img src={data.imagePreview} alt="Report item" className="h-32 w-32 object-cover rounded-md bg-slate-100" />
                            ) : (
                                <span className="text-sm text-slate-500">No image uploaded.</span>
                            )}
                         </dd>
                    </div>

                    <DetailRow label="Report Type" value={data.reportType === 'lost' ? 'Lost Item' : 'Found Item'} />
                    <DetailRow label="Item Name" value={data.itemName} />
                    <DetailRow label="Category" value={`${data.category} - ${data.subcategory}`} />
                    <DetailRow label="Description" value={data.description} />
                    <DetailRow label="Location" value={data.location} />
                    <DetailRow label="City" value={data.city} />
                    <DetailRow label="Serial Number" value={data.serialNumber} />
                    <DetailRow label="Tags" value={data.tags} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6">
                 <button 
                    onClick={onBack} 
                    className="w-full sm:w-auto bg-transparent border border-slate-400 text-slate-700 font-semibold py-2 px-6 rounded-md hover:bg-slate-100 transition-colors"
                >
                    Go Back & Edit
                </button>
                <button 
                    onClick={onConfirm} 
                    className="w-full sm:w-auto bg-brand-secondary text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                    Confirm & Submit Report
                </button>
            </div>
        </div>
    );
};

export default ConfirmationStep;