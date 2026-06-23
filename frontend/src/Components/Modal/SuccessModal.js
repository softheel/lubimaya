import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content success-modal">
        <h2>Заказ успешно оформлен!</h2>
        <p>Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
      </div>
    </div>
  );
};

export default SuccessModal; 