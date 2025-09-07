import React, { useState } from 'react';
import AuthStep from '../components/reporting/AuthStep';
import InstructionsStep from '../components/reporting/InstructionsStep';
import ReportFormStep from '../components/reporting/ReportFormStep';
import ConfirmationStep from '../components/reporting/ConfirmationStep';
import SuccessStep from '../components/reporting/SuccessStep';

export interface ReportData {
  reportType: 'lost' | 'found';
  category: string;
  subcategory: string;
  itemName: string;
  description: string;
  location: string;
  serialNumber: string;
  city: string;
  tags: string;
  image: File | null;
  imagePreview: string | null;
}

type ReportStep = 'auth' | 'instructions' | 'form' | 'confirm' | 'success';

interface ReportFlowPageProps {
    isLoggedIn: boolean;
}

const ReportFlowPage: React.FC<ReportFlowPageProps> = ({ isLoggedIn }) => {
    const [step, setStep] = useState<ReportStep>(isLoggedIn ? 'instructions' : 'auth');
    const [formData, setFormData] = useState<Partial<ReportData>>({});

    const handleAuthSuccess = () => setStep('instructions');

    const handleInstructionsAck = () => setStep('form');
    
    const handleFormSubmit = (data: ReportData) => {
        setFormData(data);
        setStep('confirm');
    };

    const handleConfirm = () => {
        console.log('Final Report Data Submitted:', formData);
        // Here you would typically send the data to a backend server.
        // The image file would be uploaded as multipart/form-data.
        setStep('success');
    };

    const handleBackToForm = () => setStep('form');
    
    const handleFileAnother = () => {
        setFormData({});
        setStep('instructions'); // Go back to instructions for a new report, skipping auth.
    };

    const renderStep = () => {
        switch(step) {
            case 'auth': 
                return <AuthStep onAuthSuccess={handleAuthSuccess} />;
            case 'instructions': 
                return <InstructionsStep onProceed={handleInstructionsAck} />;
            case 'form': 
                return <ReportFormStep onSubmit={handleFormSubmit} initialData={formData} />;
            case 'confirm': 
                return <ConfirmationStep data={formData as ReportData} onConfirm={handleConfirm} onBack={handleBackToForm} />;
            case 'success':
                return <SuccessStep onFileAnother={handleFileAnother} reportData={formData as ReportData} />;
            default:
                return <div>Invalid Step</div>;
        }
    };
    
    const titles: Record<ReportStep, string> = {
        auth: 'User Verification',
        instructions: 'Before You Report',
        form: 'File a New Report',
        confirm: 'Confirm Your Details',
        success: 'Report Submitted Successfully',
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                     <h1 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl text-center mb-10">
                        {titles[step]}
                    </h1>
                    <div className="bg-brand-light p-6 sm:p-8 rounded-lg shadow-md border border-slate-200">
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFlowPage;