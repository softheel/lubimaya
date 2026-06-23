import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css';
import Pencil from '../../assets/images/Pencil.svg';
import LikeRed from '../../assets/images/LikeRed.svg';
import BtnSmall from '../../Components/BtnSmall/BtnSmall';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Токен отсутствует');
                navigate('/auth');
                return;
            }

            // Сначала проверяем сохраненные данные
            const savedUserData = localStorage.getItem('userData');
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                setUser(userData);
                setTempUser(userData);
            }

            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных пользователя');
                }

                const data = await response.json();
                setUser(data);
                setTempUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
            }
        };

        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('/api/favorites', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке избранного');
                }

                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Ошибка при загрузке избранного:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        fetchFavorites();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            // Валидация имени и фамилии
            if (tempUser.first_name && tempUser.first_name.length < 2) {
                alert("Имя должно содержать минимум 2 символа");
                return;
            }
            if (tempUser.last_name && tempUser.last_name.length < 2) {
                alert("Фамилия должна содержать минимум 2 символа");
                return;
            }
            if (tempUser.first_name && !/^[а-яА-Яa-zA-Z\s-]+$/.test(tempUser.first_name)) {
                alert("Имя может содержать только буквы, пробелы и дефис");
                return;
            }
            if (tempUser.last_name && !/^[а-яА-Яa-zA-Z\s-]+$/.test(tempUser.last_name)) {
                alert("Фамилия может содержать только буквы, пробелы и дефис");
                return;
            }

            const token = localStorage.getItem("token");
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...tempUser,
                    first_name: tempUser.first_name?.trim() || null,
                    last_name: tempUser.last_name?.trim() || null
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setTempUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
                setIsEditing(false);
                alert("Данные успешно обновлены!");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Ошибка при обновлении данных. Попробуйте снова.");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
            alert("Ошибка сети. Проверьте подключение к интернету.");
        }
    };

    const handleEdit = () => {
        setTempUser({ ...user });
        setIsEditing(true);
    };

    const handleRemoveFavorite = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/favorites/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении из избранного");
            }

            setFavorites(favorites.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="profile dark main">
            <div className="section">
                {user ? (
                    <>
                        <p className="text20">
                            Добро пожаловать в личный кабинет, <b>
                                {user.first_name || user.last_name
                                    ? `${user.first_name || ''} ${user.last_name || ''}`
                                    : user.username}
                            </b>!
                        </p>
                        <div className="row">
                            <div className="profile-section col-lg-6 col-md-12 col-sm-12 mb-3 me-lg-2">
                                <div className="edit-header">
                                    <p className="text-20">Редактировать личные данные</p>
                                    {!isEditing && (
                                        <img
                                            src={Pencil}
                                            alt="Редактировать"
                                            className="edit-icon"
                                            onClick={handleEdit}
                                        />
                                    )}
                                </div>

                                <div className="profile-info">
                                    <div className="profile-field">
                                        <label>Имя:</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={tempUser?.first_name || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <span>{user.first_name}</span>
                                        )}
                                    </div>

                                    <div className="profile-field">
                                        <label>Фамилия:</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={tempUser?.last_name || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <span>{user.last_name}</span>
                                        )}
                                    </div>

                                    <div className="profile-field">
                                        <label>Email:</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={tempUser?.email || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <span>{user.email}</span>
                                        )}
                                    </div>

                                    <div className="profile-field">
                                        <label>Имя пользователя:</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="username"
                                                value={tempUser?.username || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <span>{user.username}</span>
                                        )}
                                    </div>

                                    {isEditing && (
                                        <div className="profile-actions">
                                            <BtnSmall onClick={() => setIsEditing(false)}>Отмена</BtnSmall>
                                            <BtnSmall onClick={handleSave}>Сохранить</BtnSmall>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className="col-1"></div> */}
                            <div className="favorites-section col-lg-6 col-md-12 col-sm-12 mb-3 ms-lg-2">
                                <p className="text20">Избранные товары</p>
                                {loading ? (
                                    <div>Загрузка избранных товаров...</div>
                                ) : favorites.length > 0 ? (
                                    <div className="favorites-grid">
                                        {favorites.map((item) => (
                                            <div key={`favorite-${item.id}`} className="favorite-item">
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="favorite-image"
                                                    onClick={() => handleProductClick(item.product_id)}
                                                />
                                                <div className="favorite-info">
                                                    <p onClick={() => handleProductClick(item.product_id)}>
                                                        {item.name}
                                                    </p>
                                                    <p className="">{item.price}₽/кг</p>
                                                    <p className={item.stock ? "inStock" : "outOfStock"}>
                                                        {item.stock ? "В наличии" : "Нет в наличии"}
                                                    </p>
                                                </div>
                                                <img
                                                    src={LikeRed}
                                                    alt="Удалить из избранного"
                                                    className="remove-favorite"
                                                    onClick={() => handleRemoveFavorite(item.product_id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-favorites">У вас пока нет избранных товаров</p>
                                )}
                            </div>
                        </div>


                    </>
                ) : (
                    <h1 className="profileTitle">Загрузка...</h1>
                )}
            </div>
        </div>
    );
}