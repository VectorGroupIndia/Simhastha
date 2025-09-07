import React, { useState } from 'react';

interface InstructionsStepProps {
    onProceed: () => void;
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const InstructionsStep: React.FC<InstructionsStepProps> = ({ onProceed }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-brand-dark mb-3 flex items-center"><CheckIcon className="w-5 h-5 mr-2 text-green-600"/>Instructions</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700 pl-4">
                    <li>Choose the relevant category, subcategory, and type.</li>
                    <li>Give a clear description with additional details of the lost/found thing.</li>
                    <li>Enter the exact location of where you lost/found the item.</li>
                    <li>If applicable, mention the serial number, document number, etc.</li>
                    <li>Add extra reward, if you want to give a reward to the found reporter.</li>
                    <li>Choose the right city.</li>
                    <li>Use keywords (Tags) properly and upload a clear image for better visibility.</li>
                </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                 <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center"><AlertTriangleIcon className="w-5 h-5 mr-2"/>Note Before Reporting</h3>
                 <ul className="list-disc list-inside space-y-2 text-yellow-700 pl-4">
                    <li>This application is for providing service to the Lost and Found. The information may be shared with the Police.</li>
                    <li>Information reported under this application is not a subject matter of enquiry/investigation.</li>
                    <li>A false report is a punishable offence. The reporting person shall be solely responsible for any false information.</li>
                    <li>Dial <strong>112</strong> or <strong>100</strong> if there is any emergency.</li>
                </ul>
            </div>

            <div className="border-t pt-6 space-y-4">
                <div className="flex items-start">
                    <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-4 w-4 mt-1 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                    />
                    <label htmlFor="agree" className="ml-3 block text-sm text-slate-800">
                       I have read and understood the instructions and notes.
                    </label>
                </div>
                <button 
                    onClick={onProceed} 
                    disabled={!agreed}
                    className="w-full bg-brand-secondary text-white font-semibold py-3 px-4 rounded-md hover:opacity-90 transition-opacity disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    Proceed to Reporting Form
                </button>
            </div>
        </div>
    );
};

export default InstructionsStep;
