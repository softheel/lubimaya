import React, { useState } from 'react';
import './OrderForm.css';
import BtnSmall from '../BtnSmall/BtnSmall';

export default function OrderForm({ onSubmit, cartItems = [], totalPrice, onClose }) {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Очищаем ошибку при вводе
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Введите email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Введите номер телефона';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Введите корректный номер телефона';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Введите адрес доставки';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                delivery_address: formData.address, 
                delivery_phone: formData.phone,
                delivery_email: formData.email
            });
        }
    };

    return (
        <div className="modal-overlay">
            {/* <div className="modal-content"> */}
            <div className="order-form">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Оформление заказа</h2>

                <div className="order-summary">
                    <h3>Состав заказа</h3>
                    {cartItems.map(item => (
                        <p key={item.id} className="text16">
                            {item.name} x {item.quantity}кг - {item.price * item.quantity}₽
                        </p>
                    ))}
                    <p className="total text16">Итого: {totalPrice}₽</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className="text16">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Введите ваш email"
                        />
                        {errors.email && <span className="error-message text16">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="text16">Телефон</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={errors.phone ? 'error' : ''}
                            placeholder="Введите ваш номер телефона"
                        />
                        {errors.phone && <span className="error-message text16">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="text16">Адрес доставки</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={errors.address ? 'error' : ''}
                            placeholder="Введите адрес доставки"
                        />
                        {errors.address && <span className="error-message text16">{errors.address}</span>}
                    </div>

                    <div className="form-actions">
                        <BtnSmall type="button" onClick={onClose}>
                            Отмена
                        </BtnSmall>
                        <BtnSmall type="submit" className="OrderBtn">
                            Оформить заказ
                        </BtnSmall>
                    </div>
                </form>
            </div>
            {/* </div> */}
        </div>
    );
} 