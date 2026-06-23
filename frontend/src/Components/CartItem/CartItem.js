import React from "react";
import Card from 'react-bootstrap/Card';
import './CartItem.css';
import Trash from '../../assets/images/Trash.svg';
import Minus from '../../assets/images/Minus.svg';
import Plus from '../../assets/images/Plus.svg';

export default function CartItem({ product, onQuantityChange, onRemove }) {
    return (
        <Card className="cartCard mt-3">
            <div className="cartItemContainer">
                <Card.Img variant="top" src={product.image_url} alt="productImage" className="cartImage" />
                <Card.Body className="cartBody d-flex flex-column">
                    <div className="cartTextGroup">
                        <p className="cartTitle text-start">{product.name}</p>
                        <p className="cartText text-start">{product.price}₽/кг</p>
                    </div>

                    <div className="cartActions">
                        <div className="quantityControl">
                            <button
                                onClick={() => onQuantityChange(product.product_id, product.quantity - 1)}
                                disabled={product.quantity <= 1}
                            >
                                <img src={Minus} alt="Уменьшить количество" />
                            </button>
                            <span>{product.quantity}</span>
                            <button onClick={() => onQuantityChange(product.product_id, product.quantity + 1)}>
                                <img src={Plus} alt="Увеличить количество" />
                            </button>
                        </div>
                        <button onClick={() => onRemove(product.product_id)} className="removeButton">
                            <img src={Trash} alt="Удалить товар" />
                        </button>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
}