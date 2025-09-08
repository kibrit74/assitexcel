import React, { useState, useEffect } from 'react';
import UserManagement from './UserManagement';
import HelpContentEditor from './HelpContentEditor';
import AnalyticsDashboard from './AnalyticsDashboard';

// Modern Admin Panel Icons - Ana sayfa stiline uygun
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5"/>
        <circle cx="6.5" cy="6.5" r="1" fill="#10b981"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#10b981"/>
        <circle cx="6.5" cy="17.5" r="1" fill="#10b981"/>
        <circle cx="17.5" cy="17.5" r="1" fill="#10b981"/>
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <circle cx="17" cy="8" r="3" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M3 21v-2a6 6 0 0 1 12 0v2" stroke="#10b981" strokeWidth="1.5" fill="none"/>
        <path d="M16 21v-1a4 4 0 0 0-3-3.87" stroke="#10b981" strokeWidth="1.5" fill="none"/>
        <circle cx="9" cy="7" r="1" fill="#10b981"/>
        <circle cx="17" cy="8" r="0.8" fill="#10b981"/>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#10b981" strokeWidth="1"/>
        <circle cx="12" cy="12" r="1" fill="#10b981"/>
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="7" y="12" width="3" height="8" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1"/>
        <rect x="12" y="8" width="3" height="12" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1"/>
        <rect x="17" y="6" width="3" height="14" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1"/>
        <path d="M8 12l4-4 4 2" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="8" cy="12" r="1" fill="#10b981"/>
        <circle cx="12" cy="8" r="1" fill="#10b981"/>
        <circle cx="16" cy="10" r="1" fill="#10b981"/>
    </svg>
);

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="17" r="1" fill="#10b981"/>
        <path d="M12 2l2 2-2 2-2-2 2-2z" fill="#10b981" opacity="0.3"/>
    </svg>
);

const TrendUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l6-6 4 4 8-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7h4v4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="11" r="1" fill="#10b981"/>
        <circle cx="13" cy="15" r="1" fill="#10b981"/>
        <circle cx="21" cy="3" r="1" fill="#10b981"/>
    </svg>
);

const TrendDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 7l6 6 4-4 8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 17h4v-4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="13" r="1" fill="#ef4444"/>
        <circle cx="13" cy="9" r="1" fill="#ef4444"/>
        <circle cx="21" cy="21" r="1" fill="#ef4444"/>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" fill="#10b981" fillOpacity="0.3"/>
        <circle cx="6" cy="12" r="1" fill="#10b981"/>
        <circle cx="18" cy="12" r="1" fill="#10b981"/>
    </svg>
);

interface AdminPanelProps {
    onNavigate: (view: string) => void;
    currentUser?: {
        id: string;
        fullName: string;
        email: string;
        role?: 'user' | 'admin' | 'super_admin';
        isAdmin?: boolean;
    } | null;
}

interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalFormulas: number;
    todayFormulas: number;
    monthlyGrowth: number;
    avgResponseTime: number;
    helpArticles: number;
    uptime: number;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate, currentUser }) => {
    // Access control - sadece admin kullanıcılar erişebilir
    const isAdmin = currentUser?.isAdmin || currentUser?.role === 'admin' || currentUser?.role === 'super_admin';
    
    if (!currentUser || !isAdmin) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 1l9 4v7c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4z" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.8"/>
                            <path d="M9 9l6 6M15 9l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Erişim Reddedildi</h2>
                    <p className="text-slate-600 mb-6">Bu sayfaya erişmek için admin yetkilerine sahip olmanız gerekiyor.</p>
                    <button
                        onClick={() => onNavigate('landing')}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'analytics' | 'help' | 'settings'>('dashboard');
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 1234,
        activeUsers: 456,
        totalFormulas: 15678,
        todayFormulas: 89,
        monthlyGrowth: 15.2,
        avgResponseTime: 0.85,
        helpArticles: 45,
        uptime: 99.9
    });

    const [recentActivity, setRecentActivity] = useState([
        { id: 1, user: 'Ahmet Yılmaz', action: 'Yeni formül oluşturdu', time: '2 dakika önce', type: 'formula' },
        { id: 2, user: 'Fatma Kaya', action: 'VBA makrosu oluşturdu', time: '5 dakika önce', type: 'macro' },
        { id: 3, user: 'Mehmet Demir', action: 'Profil bilgilerini güncelledi', time: '10 dakika önce', type: 'profile' },
        { id: 4, user: 'Ayşe Öz', action: 'Yardım makalesini görüntüledi', time: '15 dakika önce', type: 'help' },
        { id: 5, user: 'Ali Şen', action: 'Yeni hesap oluşturdu', time: '20 dakika önce', type: 'register' }
    ]);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
        { id: 'users', label: 'Kullanıcılar', icon: <UsersIcon /> },
        { id: 'analytics', label: 'Analitik', icon: <ChartIcon /> },
        { id: 'help', label: 'Yardım Merkezi', icon: <HelpIcon /> },
        { id: 'settings', label: 'Ayarlar', icon: <SettingsIcon /> }
    ];

    const statsCards = [
        {
            title: 'Toplam Kullanıcı',
            value: stats.totalUsers.toLocaleString('tr-TR'),
            change: '+12%',
            trend: 'up',
            icon: <UsersIcon />,
            color: 'emerald'
        },
        {
            title: 'Aktif Kullanıcı',
            value: stats.activeUsers.toLocaleString('tr-TR'),
            change: '+8%',
            trend: 'up',
            icon: <ActivityIcon />,
            color: 'blue'
        },
        {
            title: 'Toplam Formül',
            value: stats.totalFormulas.toLocaleString('tr-TR'),
            change: '+25%',
            trend: 'up',
            icon: <ChartIcon />,
            color: 'purple'
        },
        {
            title: 'Bugünkü Formüller',
            value: stats.todayFormulas.toLocaleString('tr-TR'),
            change: '-3%',
            trend: 'down',
            icon: <TrendUpIcon />,
            color: 'orange'
        }
    ];

    const quickActions = [
        { title: 'Yeni Kullanıcı Ekle', desc: 'Sisteme manuel kullanıcı ekle', action: () => {} },
        { title: 'Yardım Makalesi Ekle', desc: 'Yeni yardım içeriği oluştur', action: () => {} },
        { title: 'Sistem Yedekleme', desc: 'Veritabanını yedekle', action: () => {} },
        { title: 'Performans Raporu', desc: 'Sistem performansını analiz et', action: () => {} }
    ];

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* İstatistik Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`bg-${card.color}-100 text-${card.color}-600 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${card.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                                {card.trend === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
                                <span className="font-semibold">{card.change}</span>
                            </div>
                        </div>
                        <h3 className="text-sm text-slate-600 mb-1">{card.title}</h3>
                        <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Ana Metrikler ve Son Aktiviteler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sistem Durumu */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <ActivityIcon />
                        Sistem Durumu
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Uptime</span>
                            <span className="text-emerald-600 font-semibold">{stats.uptime}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Ortalama Yanıt Süresi</span>
                            <span className="text-blue-600 font-semibold">{stats.avgResponseTime}s</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Yardım Makaleleri</span>
                            <span className="text-purple-600 font-semibold">{stats.helpArticles}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Aylık Büyüme</span>
                            <span className="text-emerald-600 font-semibold">+{stats.monthlyGrowth}%</span>
                        </div>
                    </div>
                </div>

                {/* Son Aktiviteler */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Son Aktiviteler</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className={`w-2 h-2 rounded-full ${
                                    activity.type === 'formula' ? 'bg-emerald-500' :
                                    activity.type === 'macro' ? 'bg-blue-500' :
                                    activity.type === 'profile' ? 'bg-purple-500' :
                                    activity.type === 'help' ? 'bg-orange-500' : 'bg-slate-500'
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{activity.user}</p>
                                    <p className="text-xs text-slate-600">{activity.action}</p>
                                </div>
                                <span className="text-xs text-slate-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hızlı Aksiyonlar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Hızlı Aksiyonlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="p-4 text-left rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                        >
                            <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-emerald-700">{action.title}</h4>
                            <p className="text-sm text-slate-600">{action.desc}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => onNavigate('app')}
                                className="text-slate-600 hover:text-emerald-600 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6"/>
                                </svg>
                            </button>
                            <h1 className="text-xl font-bold text-slate-800">Admin Paneli</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-slate-600">
                                Son güncelleme: {new Date().toLocaleString('tr-TR')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-6">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                                        : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab İçerikleri */}
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'analytics' && <AnalyticsDashboard />}
                {activeTab === 'help' && <HelpContentEditor />}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Sistem Ayarları</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Genel Ayarlar</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded border-slate-300 text-emerald-600" defaultChecked />
                                        <span className="text-slate-700">E-posta bildirimleri</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded border-slate-300 text-emerald-600" defaultChecked />
                                        <span className="text-slate-700">Yeni kullanıcı kayıtları</span>
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input type="checkbox" className="rounded border-slate-300 text-emerald-600" />
                                        <span className="text-slate-700">Bakım modu</span>
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800">Sistem Limitleri</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Günlük formül limiti</label>
                                        <input type="number" defaultValue="1000" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Maksimum dosya boyutu (MB)</label>
                                        <input type="number" defaultValue="10" className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;