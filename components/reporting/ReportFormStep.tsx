import React, { useState, useEffect } from 'react';
import { ReportData } from '../../pages/ReportFlowPage';
import { analyzeItemImage } from '../../services/gemini';


interface ReportFormStepProps {
    onSubmit: (data: ReportData) => void;
    initialData: Partial<ReportData>;
}

const categories = {
    'Electronics': ['Mobile Phone', 'Laptop', 'Camera', 'Headphones', 'Other'],
    'Documents': ['Wallet', 'ID Card', 'Passport', 'Keys', 'Other'],
    'Bags': ['Backpack', 'Handbag', 'Luggage', 'Other'],
    'Personal Items': ['Watch', 'Jewelry', 'Glasses', 'Umbrella', 'Other'],
    'Other': ['Other'],
};

const cities = ['Ujjain', 'Indore', 'Bhopal', 'Gwalior', 'Jabalpur'];

const fileToBase64 = (file: File): Promise<{mimeType: string, data: string}> => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const [mimePart, dataPart] = result.split(';base64,');
            const mimeType = mimePart.split(':')[1];
            resolve({mimeType, data: dataPart});
        };
        reader.onerror = error => reject(error);
    });

const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

const loadingMessages = ["Analyzing image...", "Identifying key features...", "Categorizing the item...", "Almost there..."];


const ReportFormStep: React.FC<ReportFormStepProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<ReportData>({
        reportType: 'lost',
        category: '',
        subcategory: '',
        itemName: '',
        description: '',
        location: '',
        serialNumber: '',
        city: 'Ujjain',
        tags: '',
        image: null,
        imagePreview: null,
        ...initialData,
    });
    
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState('');
    const [analysisSuccess, setAnalysisSuccess] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        if (formData.category && categories[formData.category as keyof typeof categories]) {
            setSubcategories(categories[formData.category as keyof typeof categories]);
        } else {
            setSubcategories([]);
        }
    }, [formData.category]);

     useEffect(() => {
        let interval: number;
        if (isAnalyzing) {
            setLoadingMessage(loadingMessages[0]); 
            let messageIndex = 0;
            interval = window.setInterval(() => {
                messageIndex = (messageIndex + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[messageIndex]);
            }, 2000); 
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isAnalyzing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setAnalysisSuccess(false);
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnalysisSuccess(false);
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAnalyzeImage = async () => {
        if (!formData.image) return;

        setIsAnalyzing(true);
        setAnalysisSuccess(false);
        setAnalysisError('');
        try {
            const { mimeType, data: base64ImageData } = await fileToBase64(formData.image);
            
            const result = await analyzeItemImage(base64ImageData, mimeType);

            setFormData(prev => ({
                ...prev,
                category: result.category || prev.category,
                subcategory: result.subcategory || '',
                itemName: result.title || prev.itemName,
                description: result.description || prev.description,
            }));
            
            setAnalysisSuccess(true);

        } catch (error) {
            console.error("AI analysis failed:", error);
            setAnalysisError(error instanceof Error ? error.message : "An unknown error occurred.");
            setAnalysisSuccess(false);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type Tabs */}
            <div className="flex border-b border-gray-200">
                <button type="button" onClick={() => setFormData(p => ({...p, reportType: 'lost'}))} className={`flex-1 py-3 text-center font-semibold transition-colors duration-200 ${formData.reportType === 'lost' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-slate-500 hover:text-slate-700'}`}>
                    I Lost Something
                </button>
                <button type="button" onClick={() => setFormData(p => ({...p, reportType: 'found'}))} className={`flex-1 py-3 text-center font-semibold transition-colors duration-200 ${formData.reportType === 'found' ? 'text-brand-secondary border-b-2 border-brand-secondary' : 'text-slate-500 hover:text-slate-700'}`}>
                    I Found Something
                </button>
            </div>
            
            {/* Image Upload & AI */}
            <div>
                 <label className="block text-sm font-medium text-slate-700">1. Upload Image & Analyze (Recommended)</label>
                 <div className="mt-2 p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                     <div className="flex flex-col sm:flex-row items-center gap-4">
                        {formData.imagePreview ? (
                            <img src={formData.imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-md bg-slate-100 flex-shrink-0" />
                        ) : (
                             <div className="h-24 w-24 flex items-center justify-center rounded-md bg-slate-100 text-slate-400 flex-shrink-0">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                             </div>
                        )}
                        <div className="flex-grow text-center sm:text-left">
                            <label htmlFor="file-upload" className="cursor-pointer rounded-md bg-white font-semibold text-brand-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 hover:text-brand-primary/80">
                                <span>{formData.image ? 'Change file' : 'Choose an image'}</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*"/>
                            </label>
                            {formData.image && <button type="button" onClick={() => setFormData(p => ({...p, image: null, imagePreview: null}))} className="ml-3 text-sm text-red-600 hover:text-red-800">Remove</button>}
                            <p className="text-xs text-slate-500 mt-1">A clear image significantly improves the chances of finding a match.</p>
                        </div>
                     </div>
                     <div className="mt-4">
                        <button type="button" onClick={handleAnalyzeImage} disabled={!formData.image || isAnalyzing} className="w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary/90 disabled:bg-slate-400 disabled:cursor-not-allowed flex">
                            Analyze Image with AI
                        </button>
                     </div>
                     {isAnalyzing && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-brand-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm font-medium text-brand-primary">{loadingMessage}</span>
                        </div>
                    )}
                    {analysisSuccess && !isAnalyzing && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                             <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-green-800">Analysis Complete!</h4>
                                <p className="mt-1 text-sm text-green-700">The form has been pre-filled. Please review and edit the details as needed.</p>
                            </div>
                        </div>
                    )}
                    {analysisError && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                            <AlertTriangleIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0"/>
                            <div>
                                <h4 className="font-semibold text-red-800">Oops! The AI analysis failed.</h4>
                                <p className="mt-1 text-sm text-red-700">{analysisError}</p>
                                <p className="mt-2 text-sm text-red-700">Please try again with a different image, or fill in the details manually below.</p>
                            </div>
                        </div>
                    )}
                 </div>
            </div>
            
            <div className="border-t pt-6 space-y-6">
                 <p className="block text-sm font-medium text-slate-700">2. Fill or Edit the Details Below</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category & Subcategory */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                        <select id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900">
                            <option value="">Select a category</option>
                            {Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-slate-700">Subcategory</label>
                        <select id="subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} required disabled={!formData.category} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary disabled:bg-slate-50 text-slate-900">
                            <option value="">Select a subcategory</option>
                            {subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                    </div>
                </div>

                {/* Item Name */}
                <div>
                    <label htmlFor="itemName" className="block text-sm font-medium text-slate-700">Item Name / Title</label>
                    <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleChange} required placeholder="e.g., Black Samsung Smartphone" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900"/>
                </div>

                {/* Description */}
                <div>
                     <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required placeholder="Provide as many details as possible: color, brand, model, any identifying marks, etc." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900"></textarea>
                </div>
                
                 {/* City */}
                 <div>
                     <label htmlFor="city" className="block text-sm font-medium text-slate-700">City</label>
                    <select id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900">
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>

                 {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700">{formData.reportType === 'lost' ? 'Last Seen Location' : 'Found Location'}</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Near Ram Ghat, Ujjain" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900"/>
                </div>

                {/* Serial Number */}
                <div>
                    <label htmlFor="serialNumber" className="block text-sm font-medium text-slate-700">Serial/Document Number (Optional)</label>
                    <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900"/>
                </div>
                
                {/* Tags */}
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Keywords / Tags (Optional)</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., samsung, phone, black, ramghat" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-slate-900"/>
                    <p className="mt-1 text-xs text-slate-500">Separate keywords with commas. This helps in search.</p>
                </div>
            </div>

            <div className="border-t pt-6">
                <button type="submit" className="w-full bg-brand-secondary text-white font-semibold py-3 px-4 rounded-md hover:opacity-90 transition-opacity">
                    Review and Confirm Details
                </button>
            </div>
        </form>
    );
};

export default ReportFormStep;