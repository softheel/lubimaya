import React, { useState, useEffect } from 'react';
import './Cart.css';
import { Link } from "react-router-dom";
import BtnLarge from '../../Components/BtnLarge/BtnLarge';
import CartItem from "../../Components/CartItem/CartItem";
import OrderForm from "../../Components/OrderForm/OrderForm";
import SuccessModal from "../../Components/Modal/SuccessModal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Пользователь не авторизован');
      }

      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки корзины');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      const response = await fetch(`/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при изменении количества');
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при изменении количества');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления товара');
      }

      setCartItems(prevItems =>
        prevItems.filter(item => item.product_id !== productId)
      );
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка удаления товара');
    }
  };

  const handleOrderSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const totalPrice = calculateTotal();

      // Создаем заказ
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          total_price: totalPrice,
          delivery_address: formData.delivery_address,
          delivery_phone: formData.delivery_phone,
          delivery_email: formData.delivery_email,
          items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Ошибка при создании заказа');
      }

      // Закрываем форму заказа и показываем модальное окно успеха
      setShowOrderModal(false);
      setShowSuccessModal(true);

      // Очищаем корзину на клиенте
      setCartItems([]);

      // Автоматическое закрытие модального окна через 3 секунды
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error in handleOrderSubmit:', error);
      alert(error.message || 'Ошибка при оформлении заказа');
    }
  };

  if (loading) {
    return <div className="cart dark">Загрузка...</div>;
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart main">
      <div className="container section">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Ваша корзина пуста!</h2>
            <Link to="/catalog" className="">
              <BtnLarge className="mt-5 basicBtn">К покупкам</BtnLarge>
            </Link>
          </div>
        ) : (
          <>
            <h2>Корзина</h2>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                product={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
            <div className="cart-footer">
              <p>Итого: {calculateTotal()}₽</p>
              <BtnLarge className="basicBtn-light" onClick={() => setShowOrderModal(true)}>
                Оформить заказ
              </BtnLarge>
            </div>
          </>
        )}
      </div>

      {showOrderModal && (
        <OrderForm
          onClose={() => setShowOrderModal(false)}
          onSubmit={handleOrderSubmit}
          totalPrice={calculateTotal()}
          cartItems={cartItems}
        />
      )}

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

export default Cart;