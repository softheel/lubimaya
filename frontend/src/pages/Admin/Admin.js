import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Admin.css';

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminAccess = async () => {
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
        };

        checkAdminAccess();
    }, [navigate]);

    return (
        <div className="admin-dashboard dark main">
            <div className="section">
                <h1 className="admin-title">Панель администратора</h1>
                <div className="admin-menu">
                    <Link to="/admin/products" className="admin-card">
                        <div className="admin-card-content">
                            <h3>Управление товарами</h3>
                            <p>Добавление, редактирование и удаление товаров</p>
                        </div>
                    </Link>
                    <Link to="/admin/orders" className="admin-card">
                        <div className="admin-card-content">
                            <h3>Управление заказами</h3>
                            <p>Просмотр и изменение статусов заказов</p>
                        </div>
                    </Link>
                    <Link to="/admin/users" className="admin-card">
                        <div className="admin-card-content">
                            <h3>Просмотр пользователей</h3>
                            <p>Список всех зарегистрированных пользователей</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


