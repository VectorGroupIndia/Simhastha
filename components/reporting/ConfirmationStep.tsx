import React from 'react';
import { ReportData } from '../../pages/ReportFlowPage';
import { useLanguage } from '../../contexts/LanguageContext';

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
    const { t } = useLanguage();

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-inner border border-slate-200">
                <h3 className="text-xl font-bold text-brand-dark mb-4 border-b pb-2">{t.confirmHeading}</h3>
                <div className="sm:divide-y sm:divide-slate-200">
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                         <dt className="text-sm font-medium text-slate-600">{t.confirmImage}</dt>
                         <dd className="mt-1 sm:mt-0 sm:col-span-2">
                             {data.imagePreview ? (
                                <img src={data.imagePreview} alt="Report item" className="h-32 w-32 object-cover rounded-md bg-slate-100" />
                            ) : (
                                <span className="text-sm text-slate-500">{t.confirmNoImage}</span>
                            )}
                         </dd>
                    </div>

                    <DetailRow label={t.confirmReportType} value={data.reportType === 'lost' ? t.confirmReportTypeLost : t.confirmReportTypeFound} />
                    <DetailRow label={t.itemName} value={data.itemName} />
                    <DetailRow label={t.confirmCategory} value={`${data.category} - ${data.subcategory}`} />
                    <DetailRow label={t.description} value={data.description} />
                    <DetailRow label={t.confirmLocation} value={data.location} />
                    <DetailRow label={t.city} value={data.city} />
                    <DetailRow label={t.confirmSerialNumber} value={data.serialNumber} />
                    <DetailRow label={t.confirmTags} value={data.tags} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6">
                 <button 
                    onClick={onBack} 
                    className="w-full sm:w-auto bg-transparent border border-slate-400 text-slate-700 font-semibold py-2 px-6 rounded-md hover:bg-slate-100 transition-colors"
                >
                    {t.confirmBackButton}
                </button>
                <button 
                    onClick={onConfirm} 
                    className="w-full sm:w-auto bg-brand-secondary text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                    {t.confirmSubmitButton}
                </button>
            </div>
        </div>
    );
};

export default ConfirmationStep;
