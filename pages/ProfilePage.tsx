import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReportDetailsModal from '../components/ReportDetailsModal';
import { useLanguage } from '../contexts/LanguageContext';

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const user = {
    name: 'Demo User',
    email: 'user@demo.com',
    mobile: '+91 98765 43210',
};

type ReportStatus = 'Active' | 'Reunited' | 'Pending Verification' | 'Handed to Authority' | 'Closed';

export interface Report {
    id: number;
    type: 'lost' | 'found';
    item: string;
    date: string;
    status: ReportStatus;
    description: string;
    location: string;
    imageUrl: string;
}

const lostReports: Report[] = [
    { 
        id: 1, 
        type: 'lost',
        item: 'Black Leather Wallet', 
        date: '2024-07-15', 
        status: 'Active',
        description: 'A black bifold leather wallet containing various cards and a small amount of cash. Has a small scratch on the front corner.',
        location: 'Near Mahakaleshwar Temple Entrance',
        imageUrl: 'https://images.unsplash.com/photo-1619118399516-fd3340523f64?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 2, 
        type: 'lost',
        item: 'Samsung Galaxy S22', 
        date: '2024-07-10', 
        status: 'Reunited',
        description: 'Black Samsung Galaxy S22 in a clear case with a popsocket on the back. Lock screen shows a picture of a golden retriever.',
        location: 'Ram Ghat Area',
        imageUrl: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b10?q=80&w=1964&auto=format&fit=crop'
    },
    { 
        id: 3, 
        type: 'lost',
        item: 'Blue Umbrella', 
        date: '2024-06-25', 
        status: 'Closed',
        description: 'Standard-sized blue umbrella with a wooden handle. No distinguishing marks.',
        location: 'Ujjain Railway Station',
        imageUrl: 'https://images.unsplash.com/photo-1534579227629-9d512f1469b2?q=80&w=2070&auto=format&fit=crop'
    },
];

const foundReports: Report[] = [
    { 
        id: 4, 
        type: 'found',
        item: 'Silver Keychain with Bell', 
        date: '2024-07-18', 
        status: 'Pending Verification',
        description: 'A set of three keys on a silver keychain. One of the keys is for a car. A small bell is attached.',
        location: 'Harsiddhi Temple Food Court',
        imageUrl: 'https://images.unsplash.com/photo-1543373822-e31d70e4aa24?q=80&w=2070&auto=format&fit=crop'
    },
    { 
        id: 5, 
        type: 'found',
        item: 'Child\'s Red Backpack', 
        date: '2024-07-16', 
        status: 'Handed to Authority',
        description: 'Small red backpack with a cartoon character on it. Contains a water bottle and a small toy car.',
        location: 'Near Triveni Ghat Parking',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98e3d2791f15?q=80&w=1964&auto=format&fit=crop'
    },
];

export const statusStyles: Record<ReportStatus, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Reunited': 'bg-blue-100 text-blue-800',
    'Pending Verification': 'bg-yellow-100 text-yellow-800',
    'Handed to Authority': 'bg-indigo-100 text-indigo-800',
    'Closed': 'bg-slate-100 text-slate-800',
};

const ProfilePage: React.FC = () => {
    const { t, translateStatus } = useLanguage();
    const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const handleViewDetails = (report: Report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    const renderReports = (reports: Report[]) => (
        <div className="space-y-4">
            {reports.length > 0 ? reports.map(report => (
                <div key={report.id} className="flex flex-wrap items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                    <div>
                        <p className="font-semibold text-brand-dark">{report.item}</p>
                        <p className="text-sm text-slate-500">{t.profileReportedOn} {report.date}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[report.status]}`}>
                            {translateStatus(report.status)}
                        </span>
                        <button onClick={() => handleViewDetails(report)} className="text-sm font-semibold text-brand-primary hover:underline">{t.profileViewDetails}</button>
                    </div>
                </div>
            )) : <p className="text-center text-slate-500 py-8">{t.profileNoReports}</p>}
        </div>
    );

    return (
        <>
            <div className="bg-brand-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
                        <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">{t.profileTitle}</h1>
                        <Link to="/report" className="px-6 py-3 rounded-md text-sm font-semibold text-white bg-brand-secondary hover:opacity-90 transition-opacity shadow-md">
                            {t.profileNewReport}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column: User Details */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-brand-light flex items-center justify-center mb-4">
                                        <UserIcon className="w-12 h-12 text-brand-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-dark">{user.name}</h2>
                                </div>
                                <div className="mt-8 space-y-4 text-left">
                                    <div className="flex items-center">
                                        <MailIcon className="w-5 h-5 text-brand-secondary mr-3"/>
                                        <span className="text-slate-700">{user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <PhoneIcon className="w-5 h-5 text-brand-secondary mr-3"/>
                                        <span className="text-slate-700">{user.mobile}</span>
                                    </div>
                                </div>
                                <button className="mt-8 w-full bg-transparent border border-brand-primary text-brand-primary font-semibold py-2 px-4 rounded-md hover:bg-brand-primary hover:text-white transition-colors">
                                    {t.profileEdit}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Activity Feed */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-lg">
                                <div className="border-b border-slate-200">
                                    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                                        <button
                                            onClick={() => setActiveTab('lost')}
                                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'lost' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                                        >
                                            {t.profileLostReports}
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('found')}
                                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'found' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                                        >
                                            {t.profileFoundReports}
                                        </button>
                                    </nav>
                                </div>
                                <div className="p-6">
                                    {activeTab === 'lost' ? renderReports(lostReports) : renderReports(foundReports)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedReport && (
                <ReportDetailsModal report={selectedReport} onClose={handleCloseModal} />
            )}
        </>
    );
};

export default ProfilePage;
