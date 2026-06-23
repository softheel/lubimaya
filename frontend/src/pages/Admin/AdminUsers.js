import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import './AdminUsers.css';

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [sortField, setSortField] = useState('id');
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

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке пользователей');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Ошибка при загрузке пользователей');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAdminAccess();
        fetchUsers();
    }, [checkAdminAccess, fetchUsers]);

    const getFilteredAndSortedUsers = () => {
        const normalizedSearch = searchTerm.toLowerCase().trim();
        let result = [...users];

        // Фильтр по роли
        if (roleFilter === 'admins') {
            result = result.filter(user => user.is_admin);
        } else if (roleFilter === 'users') {
            result = result.filter(user => !user.is_admin);
        }

        // Поиск по username и email
        if (normalizedSearch) {
            result = result.filter(user => {
                const username = (user.username || '').toLowerCase();
                const email = (user.email || '').toLowerCase();
                return (
                    username.includes(normalizedSearch) ||
                    email.includes(normalizedSearch)
                );
            });
        }

        // Сортировка
        result.sort((a, b) => {
            let aValue;
            let bValue;

            switch (sortField) {
                case 'username':
                    aValue = (a.username || '').toLowerCase();
                    bValue = (b.username || '').toLowerCase();
                    break;
                case 'date':
                    aValue = a.created_at ? new Date(a.created_at).getTime() : 0;
                    bValue = b.created_at ? new Date(b.created_at).getTime() : 0;
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
        return <div className="admin-users dark main"><div className="section">Загрузка...</div></div>;
    }

    return (
        <div className="admin-users dark main">
            <div className="section">
                <div className="admin-nav">
                    <Link to="/admin" className="back-link">← Назад к панели администратора</Link>
                </div>
                <h1>Просмотр пользователей</h1>
                <p className="users-count">Всего пользователей: {users.length}</p>

                <div className="users-filters">
                    <div className="filter-group">
                        <label>Поиск по имени пользователя или email</label>
                        <input
                            type="text"
                            placeholder="Начните вводить..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Роль</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">Все</option>
                            <option value="admins">Только администраторы</option>
                            <option value="users">Только пользователи</option>
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
                            <option value="id_desc">По ID (новые сверху)</option>
                            <option value="id_asc">По ID (старые сверху)</option>
                            <option value="username_asc">По имени пользователя (А-Я)</option>
                            <option value="username_desc">По имени пользователя (Я-А)</option>
                            <option value="date_desc">По дате регистрации (новые сверху)</option>
                            <option value="date_asc">По дате регистрации (старые сверху)</option>
                        </select>
                    </div>
                </div>

                <div className="users-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя пользователя</th>
                                <th>Email</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Администратор</th>
                                <th>Дата регистрации</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredAndSortedUsers().map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name || '-'}</td>
                                    <td>{user.last_name || '-'}</td>
                                    <td>
                                        <span className={`badge ${user.is_admin ? 'badge-admin' : 'badge-user'}`}>
                                            {user.is_admin ? 'Да' : 'Нет'}
                                        </span>
                                    </td>
                                    <td>
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString('ru-RU')
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

