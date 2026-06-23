import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Like from '../../assets/images/Like.svg';
import LikeRed from '../../assets/images/LikeRed.svg'; // Импортируем красную иконку
import './Card.css';
import BtnSmall from "../BtnSmall/BtnSmall";

export default function ProductCard({ product, onDetailsClick }) {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false); // Состояние для избранного

    useEffect(() => {
        const checkFavorite = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`/api/favorites/check/${product.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setIsFavorite(data.isFavorite);
            } catch (error) {
                console.error('Ошибка при проверке избранного:', error);
                setIsFavorite(false); // значение по умолчанию при ошибке
            }
        };

        checkFavorite();
    }, [product.id]);

    // Обработчик клика по кнопке "Подробнее"
    const handleDetailsClick = () => {
        if (onDetailsClick) {
            onDetailsClick();
        } else {
            navigate(`/product/${product.id}`);
        }
    };

    // Обработчик клика по иконке "лайка"
    const handleLikeClick = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/auth');
            return;
        }

        try {
            const response = await fetch(`/api/favorites/${product.id}`, {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error('Ошибка при обновлении избранного:', error);
        }
    };

    return (
        <Card className="card mt-5">
            <Card.Img variant="top" src={product.image_url} alt="productImage" />
            <Card.Body className="cardBody d-flex justify-content-between">
                <p className="cardTitle">{product.name}</p>
                <div>
                    <p className="cardText">
                        {product.price}₽/кг
                    </p>
                    <div className="cardActions">
                        <BtnSmall className="cardBtn" onClick={handleDetailsClick}>
                            Подробнее
                        </BtnSmall>
                        <img
                            alt="like"
                            src={isFavorite ? LikeRed : Like}
                            onClick={handleLikeClick}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </div>


            </Card.Body>
        </Card>
    );
}