import React, { useState, useEffect } from 'react';

// İkonlar - Ana sayfa stiline uygun
const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#10b981" strokeWidth="1.5"/>
        <circle cx="12" cy="17" r="1" fill="#10b981"/>
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="#10b981" strokeWidth="1.5"/>
        <polyline points="17,21 17,13 7,13 7,21" stroke="#10b981" strokeWidth="1.5"/>
        <polyline points="7,3 7,8 15,8" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 8v8M8 12h8" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#ef4444" strokeWidth="1.5"/>
        <path d="M10 11v6M14 11v6" stroke="#ef4444" strokeWidth="1.5"/>
    </svg>
);

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5"/>
        <polyline points="14,2 14,8 20,8" stroke="#10b981" strokeWidth="1.5"/>
    </svg>
);

interface HelpArticle {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    views: number;
}

interface HelpCategory {
    id: string;
    name: string;
    description: string;
    articleCount: number;
}

const HelpContentEditor: React.FC = () => {
    const [categories, setCategories] = useState<HelpCategory[]>([]);
    const [articles, setArticles] = useState<HelpArticle[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showNewArticleModal, setShowNewArticleModal] = useState(false);
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editForm, setEditForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        isPublished: false
    });

    // Mock data
    useEffect(() => {
        const mockCategories: HelpCategory[] = [
            { id: '1', name: 'Genel Kullanım', description: 'Temel özellikler ve kullanım', articleCount: 8 },
            { id: '2', name: 'Formül Oluşturma', description: 'Formül oluşturma yönergeleri', articleCount: 12 },
            { id: '3', name: 'VBA Makroları', description: 'VBA makro oluşturma rehberi', articleCount: 6 },
            { id: '4', name: 'Sorun Giderme', description: 'Yaygın sorunlar ve çözümleri', articleCount: 5 }
        ];

        const mockArticles: HelpArticle[] = [
            {
                id: '1',
                title: 'Excel Formül Yardımcısına Giriş',
                content: '# Excel Formül Yardımcısına Giriş\n\nBu rehber, Excel Formül Yardımcısının temel özelliklerini açıklar...',
                category: 'Genel Kullanım',
                tags: ['başlangıç', 'giriş', 'temel'],
                isPublished: true,
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-09-01'),
                views: 1542
            },
            {
                id: '2',
                title: 'İlk Formülünüzü Oluşturun',
                content: '# İlk Formülünüzü Oluşturun\n\nBu adım adım kılavuz...',
                category: 'Formül Oluşturma',
                tags: ['formül', 'başlangıç', 'tutorial'],
                isPublished: true,
                createdAt: new Date('2024-01-20'),
                updatedAt: new Date('2024-08-15'),
                views: 987
            },
            {
                id: '3',
                title: 'VBA Makroları Nasıl Oluşturulur',
                content: '# VBA Makroları\n\nVBA makroları oluşturma...',
                category: 'VBA Makroları',
                tags: ['vba', 'makro', 'otomasyon'],
                isPublished: false,
                createdAt: new Date('2024-02-01'),
                updatedAt: new Date('2024-09-05'),
                views: 234
            }
        ];

        setCategories(mockCategories);
        setArticles(mockArticles);
    }, []);

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || article.category === 
            categories.find(cat => cat.id === selectedCategory)?.name;
        return matchesSearch && matchesCategory;
    });

    const handleEditArticle = (article: HelpArticle) => {
        setSelectedArticle(article);
        setEditForm({
            title: article.title,
            content: article.content,
            category: article.category,
            tags: article.tags.join(', '),
            isPublished: article.isPublished
        });
        setIsEditing(true);
    };

    const handleSaveArticle = () => {
        if (!selectedArticle) return;

        const updatedArticle = {
            ...selectedArticle,
            title: editForm.title,
            content: editForm.content,
            category: editForm.category,
            tags: editForm.tags.split(',').map(tag => tag.trim()),
            isPublished: editForm.isPublished,
            updatedAt: new Date()
        };

        setArticles(prev => prev.map(article => 
            article.id === selectedArticle.id ? updatedArticle : article
        ));
        setSelectedArticle(updatedArticle);
        setIsEditing(false);
    };

    const handleCreateArticle = (data: any) => {
        const newArticle: HelpArticle = {
            id: Date.now().toString(),
            title: data.title,
            content: data.content || '# Yeni Makale\n\nİçerik buraya yazılacak...',
            category: data.category,
            tags: data.tags.split(',').map((tag: string) => tag.trim()),
            isPublished: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            views: 0
        };

        setArticles(prev => [...prev, newArticle]);
        setShowNewArticleModal(false);
        handleEditArticle(newArticle);
    };

    const handleDeleteArticle = (articleId: string) => {
        setArticles(prev => prev.filter(article => article.id !== articleId));
        if (selectedArticle?.id === articleId) {
            setSelectedArticle(null);
            setIsEditing(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            {/* Sol Sidebar - Kategoriler ve Makaleler */}
            <div className="lg:col-span-1 space-y-4">
                {/* Kategori Filtresi */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-800">Kategoriler</h3>
                        <button
                            onClick={() => setShowNewCategoryModal(true)}
                            className="p-1 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                selectedCategory === 'all' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <FolderIcon />
                                <span className="text-sm">Tüm Makaleler</span>
                            </div>
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    selectedCategory === category.id 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : 'hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FolderIcon />
                                        <span className="text-sm">{category.name}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{category.articleCount}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Makale Listesi */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-800">Makaleler</h3>
                        <button
                            onClick={() => setShowNewArticleModal(true)}
                            className="p-1 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                        >
                            <PlusIcon />
                        </button>
                    </div>
                    
                    <input
                        type="text"
                        placeholder="Makale ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 mb-3 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredArticles.map(article => (
                            <div
                                key={article.id}
                                onClick={() => handleEditArticle(article)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                                    selectedArticle?.id === article.id 
                                        ? 'bg-emerald-50 border-emerald-200' 
                                        : 'hover:bg-slate-50 border-transparent'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-sm font-medium text-slate-800 truncate">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-1 ml-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            article.isPublished ? 'bg-emerald-500' : 'bg-slate-400'
                                        }`}></div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteArticle(article.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-600">{article.category}</p>
                                <p className="text-xs text-slate-500">{article.views} görüntüleme</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sağ Alan - Editör */}
            <div className="lg:col-span-3">
                {selectedArticle ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 h-full flex flex-col">
                        {/* Editör Header */}
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-100 text-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                        <DocumentIcon />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">
                                            {isEditing ? 'Makale Düzenle' : selectedArticle.title}
                                        </h2>
                                        <p className="text-sm text-slate-600">
                                            Son güncelleme: {selectedArticle.updatedAt.toLocaleDateString('tr-TR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                                            >
                                                İptal
                                            </button>
                                            <button
                                                onClick={handleSaveArticle}
                                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                            >
                                                <SaveIcon />
                                                Kaydet
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                        >
                                            <EditIcon />
                                            Düzenle
                                        </button>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <input
                                        type="text"
                                        placeholder="Makale başlığı"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                    <select
                                        value={editForm.category}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Etiketler (virgülle ayırın)"
                                        value={editForm.tags}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* İçerik Alanı */}
                        <div className="flex-1 p-6">
                            {isEditing ? (
                                <div className="h-full flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={editForm.isPublished}
                                                onChange={(e) => setEditForm(prev => ({ ...prev, isPublished: e.target.checked }))}
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-sm text-slate-700">Yayınla</span>
                                        </label>
                                    </div>
                                    <textarea
                                        value={editForm.content}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                                        className="flex-1 p-4 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm resize-none"
                                        placeholder="Makale içeriğini Markdown formatında yazın..."
                                    />
                                </div>
                            ) : (
                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-wrap text-slate-700">
                                        {selectedArticle.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 h-full flex items-center justify-center">
                        <div className="text-center">
                            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HelpIcon />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Makale Seçin</h3>
                            <p className="text-slate-600 mb-4">Düzenlemek için sol taraftan bir makale seçin</p>
                            <button
                                onClick={() => setShowNewArticleModal(true)}
                                className="flex items-center gap-2 mx-auto px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                            >
                                <PlusIcon />
                                Yeni Makale Oluştur
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Yeni Makale Modal */}
            {showNewArticleModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Yeni Makale Oluştur</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleCreateArticle({
                                title: formData.get('title'),
                                category: formData.get('category'),
                                tags: formData.get('tags')
                            });
                        }}>
                            <div className="space-y-4">
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Makale başlığı"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                />
                                <select
                                    name="category"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                                <input
                                    name="tags"
                                    type="text"
                                    placeholder="Etiketler (virgülle ayırın)"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowNewArticleModal(false)}
                                    className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    Oluştur
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HelpContentEditor;