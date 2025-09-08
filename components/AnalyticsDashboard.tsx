import React, { useState, useEffect } from 'react';

// İkonlar - Ana sayfa stiline uygun
const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="7" y="12" width="3" height="8" fill="#10b981" fillOpacity="0.3"/>
        <rect x="12" y="8" width="3" height="12" fill="#10b981" fillOpacity="0.2"/>
        <rect x="17" y="6" width="3" height="14" fill="#10b981" fillOpacity="0.25"/>
        <path d="M8 12l4-4 4 2" stroke="#10b981" strokeWidth="1.5"/>
        <circle cx="8" cy="12" r="1" fill="#10b981"/>
        <circle cx="12" cy="8" r="1" fill="#10b981"/>
        <circle cx="16" cy="10" r="1" fill="#10b981"/>
    </svg>
);

const TrendUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l6-6 4 4 8-8" stroke="#10b981" strokeWidth="2"/>
        <path d="M17 7h4v4" stroke="#10b981" strokeWidth="2"/>
    </svg>
);

const TrendDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 7l6 6 4-4 8 8" stroke="#ef4444" strokeWidth="2"/>
        <path d="M17 17h4v-4" stroke="#ef4444" strokeWidth="2"/>
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M3 21v-2a6 6 0 0 1 12 0v2" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#10b981" strokeWidth="2"/>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="1.5"/>
        <polyline points="12,6 12,12 16,14" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

interface AnalyticsData {
    dailyUsers: Array<{ date: string; users: number }>;
    formulaUsage: Array<{ date: string; formulas: number; macros: number }>;
    topPages: Array<{ page: string; views: number; bounce_rate: number }>;
    userGrowth: Array<{ month: string; total: number; new: number }>;
    deviceStats: Array<{ device: string; percentage: number; users: number }>;
    trafficSources: Array<{ source: string; percentage: number; sessions: number }>;
}

const AnalyticsDashboard: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock veri oluşturma
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const generateMockData = (): AnalyticsData => {
                const now = new Date();
                const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
                
                const dailyUsers = Array.from({ length: days }, (_, i) => {
                    const date = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000);
                    return {
                        date: date.toISOString().split('T')[0],
                        users: Math.floor(Math.random() * 100) + 50
                    };
                });

                const formulaUsage = Array.from({ length: days }, (_, i) => {
                    const date = new Date(now.getTime() - (days - 1 - i) * 24 * 60 * 60 * 1000);
                    return {
                        date: date.toISOString().split('T')[0],
                        formulas: Math.floor(Math.random() * 200) + 100,
                        macros: Math.floor(Math.random() * 50) + 20
                    };
                });

                return {
                    dailyUsers,
                    formulaUsage,
                    topPages: [
                        { page: '/app', views: 15420, bounce_rate: 25.4 },
                        { page: '/landing', views: 12350, bounce_rate: 35.2 },
                        { page: '/profile', views: 8940, bounce_rate: 18.7 },
                        { page: '/pricing', views: 5680, bounce_rate: 42.1 },
                        { page: '/help', views: 4320, bounce_rate: 28.9 }
                    ],
                    userGrowth: [
                        { month: 'Ocak', total: 850, new: 120 },
                        { month: 'Şubat', total: 920, new: 95 },
                        { month: 'Mart', total: 1050, new: 145 },
                        { month: 'Nisan', total: 1180, new: 110 },
                        { month: 'Mayıs', total: 1320, new: 165 },
                        { month: 'Haziran', total: 1480, new: 180 }
                    ],
                    deviceStats: [
                        { device: 'Masaüstü', percentage: 65, users: 812 },
                        { device: 'Mobil', percentage: 28, users: 350 },
                        { device: 'Tablet', percentage: 7, users: 88 }
                    ],
                    trafficSources: [
                        { source: 'Organik Arama', percentage: 45, sessions: 2250 },
                        { source: 'Doğrudan Trafik', percentage: 30, sessions: 1500 },
                        { source: 'Sosyal Medya', percentage: 15, sessions: 750 },
                        { source: 'Referans', percentage: 10, sessions: 500 }
                    ]
                };
            };

            setAnalyticsData(generateMockData());
            setIsLoading(false);
        }, 1000);
    }, [timeRange]);

    const StatCard = ({ title, value, change, trend, icon, color = 'emerald' }: any) => (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`bg-${color}-100 text-${color}-600 w-12 h-12 rounded-xl flex items-center justify-center`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {trend === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
                    <span className="font-semibold">{change}</span>
                </div>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    );

    const SimpleChart = ({ data, type = 'line', height = 200 }: any) => {
        if (!data || data.length === 0) return <div className="animate-pulse bg-slate-200 rounded h-48"></div>;

        const maxValue = Math.max(...data.map((d: any) => d.users || d.formulas || d.total || 0));
        const width = 100;

        return (
            <div className="relative" style={{ height }}>
                <svg width="100%" height={height} className="overflow-visible">
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((percent, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={height * percent}
                            x2="100%"
                            y2={height * percent}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            opacity="0.5"
                        />
                    ))}
                    
                    {/* Data visualization */}
                    {type === 'line' && (
                        <polyline
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            points={data.map((d: any, i: number) => 
                                `${(i * width) / (data.length - 1)},${height - ((d.users || d.formulas || d.total) / maxValue) * height}`
                            ).join(' ')}
                        />
                    )}
                    
                    {type === 'bar' && data.map((d: any, i: number) => (
                        <rect
                            key={i}
                            x={(i * width) / data.length + '%'}
                            y={height - ((d.users || d.formulas || d.total) / maxValue) * height}
                            width={`${80 / data.length}%`}
                            height={((d.users || d.formulas || d.total) / maxValue) * height}
                            fill="#10b981"
                            fillOpacity="0.7"
                        />
                    ))}
                    
                    {/* Data points */}
                    {type === 'line' && data.map((d: any, i: number) => (
                        <circle
                            key={i}
                            cx={`${(i * width) / (data.length - 1)}%`}
                            cy={height - ((d.users || d.formulas || d.total) / maxValue) * height}
                            r="3"
                            fill="#10b981"
                        />
                    ))}
                </svg>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 h-32">
                                <div className="bg-slate-200 rounded h-4 mb-4"></div>
                                <div className="bg-slate-200 rounded h-8"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                        <ChartIcon />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Analitik Dashboard</h2>
                        <p className="text-slate-600">Kullanıcı ve trafik analizi</p>
                    </div>
                </div>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="7d">Son 7 Gün</option>
                    <option value="30d">Son 30 Gün</option>
                    <option value="90d">Son 90 Gün</option>
                    <option value="1y">Son 1 Yıl</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Günlük Aktif Kullanıcı"
                    value="1,234"
                    change="+12.5%"
                    trend="up"
                    icon={<UsersIcon />}
                />
                <StatCard
                    title="Toplam Formül"
                    value="15,678"
                    change="+8.2%"
                    trend="up"
                    icon={<ActivityIcon />}
                    color="blue"
                />
                <StatCard
                    title="Ortalama Süre"
                    value="4m 32s"
                    change="-2.1%"
                    trend="down"
                    icon={<ClockIcon />}
                    color="purple"
                />
                <StatCard
                    title="Dönüşüm Oranı"
                    value="12.8%"
                    change="+1.4%"
                    trend="up"
                    icon={<TrendUpIcon />}
                    color="orange"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kullanıcı Trafiği */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Günlük Kullanıcı Trafiği</h3>
                    <SimpleChart data={analyticsData?.dailyUsers} type="line" />
                </div>

                {/* Formül Kullanımı */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Formül ve Makro Kullanımı</h3>
                    <SimpleChart data={analyticsData?.formulaUsage} type="bar" />
                </div>
            </div>

            {/* Traffic Sources ve Device Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trafik Kaynakları */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Trafik Kaynakları</h3>
                    <div className="space-y-3">
                        {analyticsData?.trafficSources.map((source, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-800">{source.source}</span>
                                        <span className="text-sm text-slate-600">{source.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div 
                                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${source.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500">{source.sessions.toLocaleString()} oturum</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* En Çok Ziyaret Edilen Sayfalar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Popüler Sayfalar</h3>
                    <div className="space-y-3">
                        {analyticsData?.topPages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                                <div>
                                    <div className="font-medium text-slate-800">{page.page}</div>
                                    <div className="text-sm text-slate-600">
                                        {page.views.toLocaleString()} görüntüleme
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-slate-800">
                                        %{page.bounce_rate}
                                    </div>
                                    <div className="text-xs text-slate-500">Çıkış oranı</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Kullanıcı Büyümesi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Aylık Kullanıcı Büyümesi</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {analyticsData?.userGrowth.map((month, index) => (
                        <div key={index} className="text-center p-4 rounded-lg bg-slate-50">
                            <div className="text-sm font-medium text-slate-600 mb-1">{month.month}</div>
                            <div className="text-xl font-bold text-slate-800 mb-1">{month.total.toLocaleString()}</div>
                            <div className="text-xs text-emerald-600">+{month.new} yeni</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;