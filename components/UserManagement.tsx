import React, { useState, useEffect } from 'react';

// İkonlar - Ana sayfa stiline uygun
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M3 21v-2a6 6 0 0 1 12 0v2" stroke="#10b981" strokeWidth="1.5" fill="none"/>
        <circle cx="9" cy="7" r="1" fill="#10b981"/>
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#ef4444" strokeWidth="1.5"/>
        <path d="M10 11v6M14 11v6" stroke="#ef4444" strokeWidth="1.5"/>
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 8v8M8 12h8" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

interface User {
    id: string;
    fullName: string;
    email: string;
    membershipPlan: string;
    status: 'active' | 'inactive' | 'suspended';
    createdAt: Date;
    lastLogin: Date | null;
    totalFormulas: number;
    credits: number;
    maxCredits: number;
}

interface UserManagementProps {
    onBack?: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const usersPerPage = 10;

    // Mock data
    useEffect(() => {
        const mockUsers: User[] = [
            {
                id: '1',
                fullName: 'Ahmet Yılmaz',
                email: 'ahmet@example.com',
                membershipPlan: 'Premium',
                status: 'active',
                createdAt: new Date('2024-01-15'),
                lastLogin: new Date('2024-09-07'),
                totalFormulas: 145,
                credits: 800,
                maxCredits: 1000
            },
            {
                id: '2',
                fullName: 'Fatma Kaya',
                email: 'fatma@example.com',
                membershipPlan: 'Ücretsiz',
                status: 'active',
                createdAt: new Date('2024-02-20'),
                lastLogin: new Date('2024-09-06'),
                totalFormulas: 23,
                credits: 67,
                maxCredits: 100
            },
            {
                id: '3',
                fullName: 'Mehmet Demir',
                email: 'mehmet@example.com',
                membershipPlan: 'Enterprise',
                status: 'inactive',
                createdAt: new Date('2024-03-10'),
                lastLogin: new Date('2024-08-15'),
                totalFormulas: 456,
                credits: 2500,
                maxCredits: 5000
            }
        ];
        setUsers(mockUsers);
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const getStatusBadge = (status: string) => {
        const styles = {
            active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            inactive: 'bg-slate-100 text-slate-700 border-slate-200',
            suspended: 'bg-red-100 text-red-700 border-red-200'
        };
        const labels = {
            active: 'Aktif',
            inactive: 'Pasif',
            suspended: 'Askıda'
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status as keyof typeof styles]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setShowUserModal(true);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(prev => prev.filter(user => user.id !== userId));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                        <UsersIcon />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Kullanıcı Yönetimi</h2>
                        <p className="text-slate-600">Toplam {users.length} kullanıcı</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowUserModal(true)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <PlusIcon />
                    Yeni Kullanıcı
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SearchIcon />
                        </div>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                        <option value="suspended">Askıda</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-800">Kullanıcı</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-800">Plan</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-800">Durum</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-800">Kredi</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-800">Formüller</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-800">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {currentUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-slate-800">{user.fullName}</div>
                                            <div className="text-sm text-slate-600">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-800">{user.membershipPlan}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(user.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 bg-slate-200 rounded-full h-2">
                                                <div 
                                                    className="bg-emerald-500 h-2 rounded-full"
                                                    style={{ width: `${(user.credits / user.maxCredits) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-600">
                                                {user.credits}/{user.maxCredits}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-800">{user.totalFormulas}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Modal */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">
                            {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ad Soyad"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <input
                                type="email"
                                placeholder="E-posta"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                                <option>Ücretsiz</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowUserModal(false);
                                    setEditingUser(null);
                                }}
                                className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                            >
                                İptal
                            </button>
                            <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                                {editingUser ? 'Güncelle' : 'Oluştur'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;