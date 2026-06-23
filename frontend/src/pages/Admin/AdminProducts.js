import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import './AdminProducts.css';
import BtnSmall from '../../Components/BtnSmall/BtnSmall';

export default function AdminProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        stock: '',
        category_id: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');

    const checkAdminAccess = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        try {
            const response = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                navigate('/auth');
                return;
            }

            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (!userData.is_admin) {
                alert('Доступ запрещен. Требуются права администратора.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking admin access:', error);
            navigate('/auth');
        }
    }, [navigate]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    useEffect(() => {
        checkAdminAccess();
        fetchProducts();
        fetchCategories();
    }, [checkAdminAccess, fetchProducts, fetchCategories]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            image_url: '',
            stock: '',
            category_id: ''
        });
        setShowModal(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            description: product.description || '',
            price: product.price || '',
            image_url: product.image_url || '',
            stock: product.stock || '',
            category_id: product.category_id || ''
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const url = editingProduct
                ? `/api/admin/products/${editingProduct.id}`
                : '/api/admin/products';

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    image_url: formData.image_url,
                    stock: parseInt(formData.stock) || 0,
                    category_id: formData.category_id || null
                }),
            });

            if (response.ok) {
                alert(editingProduct ? 'Товар обновлен' : 'Товар создан');
                setShowModal(false);
                fetchProducts();
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при сохранении товара');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Ошибка при сохранении товара');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                alert('Товар удален');
                fetchProducts();
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при удалении товара');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Ошибка при удалении товара');
        }
    };

    const getFilteredAndSortedProducts = () => {
        const normalizedSearch = searchTerm.toLowerCase().trim();
        let result = [...products];

        // Фильтр по категории
        if (categoryFilter !== 'all') {
            result = result.filter(product => String(product.category_id) === String(categoryFilter));
        }

        // Поиск по названию
        if (normalizedSearch) {
            result = result.filter(product =>
                (product.name || '').toLowerCase().includes(normalizedSearch)
            );
        }

        // Сортировка
        result.sort((a, b) => {
            let aValue;
            let bValue;

            switch (sortField) {
                case 'name':
                    aValue = (a.name || '').toLowerCase();
                    bValue = (b.name || '').toLowerCase();
                    break;
                case 'price':
                    aValue = Number(a.price) || 0;
                    bValue = Number(b.price) || 0;
                    break;
                case 'stock':
                    aValue = Number(a.stock) || 0;
                    bValue = Number(b.stock) || 0;
                    break;
                case 'id':
                default:
                    aValue = Number(a.id) || 0;
                    bValue = Number(b.id) || 0;
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    };

    if (loading) {
        return <div className="admin-products dark main"><div className="section">Загрузка...</div></div>;
    }

    return (
        <div className="admin-products dark main">
            <div className="section">
                <div className="admin-nav">
                    <Link to="/admin" className="back-link">← Назад к панели администратора</Link>
                </div>
                <div className="admin-header">
                    <h1>Управление товарами</h1>
                    <BtnSmall onClick={handleCreate}>Добавить товар</BtnSmall>
                </div>

                <div className="products-filters">
                    <div className="filter-group">
                        <label>Поиск по названию</label>
                        <input
                            type="text"
                            placeholder="Введите название товара..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Категория</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Все категории</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Сортировка</label>
                        <select
                            value={`${sortField}_${sortOrder}`}
                            onChange={(e) => {
                                const [field, order] = e.target.value.split('_');
                                setSortField(field);
                                setSortOrder(order);
                            }}
                        >
                            <option value="id_asc">По ID (по возрастанию)</option>
                            <option value="id_desc">По ID (по убыванию)</option>
                            <option value="name_asc">По названию (А-Я)</option>
                            <option value="name_desc">По названию (Я-А)</option>
                            <option value="price_asc">По цене (дешевые сверху)</option>
                            <option value="price_desc">По цене (дорогие сверху)</option>
                            <option value="stock_asc">По остатку (меньше сверху)</option>
                            <option value="stock_desc">По остатку (больше сверху)</option>
                        </select>
                    </div>
                </div>

                <div className="products-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Остаток</th>
                                <th>Изображение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredAndSortedProducts().map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}₽</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        {product.image_url && (
                                            <img src={product.image_url} alt={product.name} className="product-thumb" />
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEdit(product)}>Редактировать</button>
                                        <button className="btn-delete" onClick={() => handleDelete(product.id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Название *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Описание</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Цена *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>URL изображения</label>
                                    <input
                                        type="text"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Остаток</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Категория</label>
                                    <select
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Без категории</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <BtnSmall type="button" onClick={() => setShowModal(false)}>Отмена</BtnSmall>
                                    <BtnSmall type="submit">Сохранить</BtnSmall>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

