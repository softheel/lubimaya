import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import './AdminOrders.css';

export default function AdminOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

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

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/orders', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке заказов');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Ошибка при загрузке заказов');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAdminAccess();
        fetchOrders();
    }, [checkAdminAccess, fetchOrders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                alert('Статус заказа обновлен');
                fetchOrders();
            } else {
                const error = await response.json();
                alert(error.error || 'Ошибка при обновлении статуса');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Ошибка при обновлении статуса');
        }
    };

    const getFilteredAndSortedOrders = () => {
        const normalizedSearch = searchTerm.toLowerCase().trim();

        let result = [...orders];

        // Фильтр по статусу
        if (statusFilter !== 'all') {
            result = result.filter(order => order.status === statusFilter);
        }

        // Поиск по имени, email и телефону
        if (normalizedSearch) {
            result = result.filter(order => {
                const name = (order.first_name || order.username || '').toLowerCase();
                const email = (order.delivery_email || '').toLowerCase();
                const phone = (order.delivery_phone || '').toLowerCase();

                return (
                    name.includes(normalizedSearch) ||
                    email.includes(normalizedSearch) ||
                    phone.includes(normalizedSearch)
                );
            });
        }

        // Сортировка
        result.sort((a, b) => {
            let aValue;
            let bValue;

            if (sortField === 'date') {
                aValue = new Date(a.created_at).getTime();
                bValue = new Date(b.created_at).getTime();
            } else if (sortField === 'total') {
                aValue = Number(a.total_price) || 0;
                bValue = Number(b.total_price) || 0;
            } else {
                return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    };

    if (loading) {
        return <div className="admin-orders dark main"><div className="section">Загрузка...</div></div>;
    }

    return (
        <div className="admin-orders dark main">
            <div className="section">
                <div className="admin-nav">
                    <Link to="/admin" className="back-link">← Назад к панели администратора</Link>
                </div>
                <h1>Управление заказами</h1>

                <div className="orders-filters">
                    <div className="filter-group">
                        <label>Статус заказа</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Все</option>
                            <option value="В обработке">В обработке</option>
                            <option value="Подтвержден">Подтвержден</option>
                            <option value="В доставке">В доставке</option>
                            <option value="Доставлен">Доставлен</option>
                            <option value="Отменен">Отменен</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Поиск (имя, email, телефон)</label>
                        <input
                            type="text"
                            placeholder="Начните вводить..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                            <option value="date_desc">По дате (новые сверху)</option>
                            <option value="date_asc">По дате (старые сверху)</option>
                            <option value="total_desc">По сумме (по убыванию)</option>
                            <option value="total_asc">По сумме (по возрастанию)</option>
                        </select>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <p className="no-orders">Заказов пока нет</p>
                ) : (
                    <div className="orders-list">
                        {getFilteredAndSortedOrders().map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div>
                                        <h3>Заказ #{order.id}</h3>
                                        <p className="order-date">
                                            {new Date(order.created_at).toLocaleString('ru-RU')}
                                        </p>
                                    </div>
                                    <div className="order-status">
                                        <label>Статус:</label>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="В обработке">В обработке</option>
                                            <option value="Подтвержден">Подтвержден</option>
                                            <option value="В доставке">В доставке</option>
                                            <option value="Доставлен">Доставлен</option>
                                            <option value="Отменен">Отменен</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="order-info">
                                    <div className="info-section">
                                        <h4>Покупатель</h4>
                                        <p><strong>Имя:</strong> {order.first_name || order.username}</p>
                                        <p><strong>Email:</strong> {order.delivery_email}</p>
                                        <p><strong>Телефон:</strong> {order.delivery_phone}</p>
                                    </div>
                                    <div className="info-section">
                                        <h4>Доставка</h4>
                                        <p><strong>Адрес:</strong> {order.delivery_address}</p>
                                    </div>
                                    <div className="info-section">
                                        <h4>Сумма заказа</h4>
                                        <p className="order-total">{order.total_price}₽</p>
                                    </div>
                                </div>

                                <div className="order-items">
                                    <h4>Товары в заказе:</h4>
                                    <div className="items-table-container">
                                        <table className="items-table">
                                            <thead>
                                                <tr>
                                                    <th>Товар</th>
                                                    <th>Количество</th>
                                                    <th>Цена</th>
                                                    <th>Сумма</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items && order.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td data-label="Товар">
                                                            <div className="item-info">
                                                                {item.image_url && (
                                                                    <img src={item.image_url} alt={item.name} className="item-image" />
                                                                )}
                                                                <span>{item.name}</span>
                                                            </div>
                                                        </td>
                                                        <td data-label="Количество">{item.quantity}</td>
                                                        <td data-label="Цена">{item.price}₽</td>
                                                        <td data-label="Сумма">{item.quantity * item.price}₽</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

