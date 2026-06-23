// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import './Product.css';

// // components
// import BtnSmall from "../../Components/BtnSmall/BtnSmall";
// // icons
// import Like from '../../assets/images/Like.svg';
// import LikeRed from '../../assets/images/LikeRed.svg';

// export default function Product() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isFavorite, setIsFavorite] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`/api/products/${id}`);
//                 const data = await response.json();
//                 setProduct(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const checkFavorite = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) return;

//                 const response = await fetch(`/api/favorites/check/${id}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Ошибка при проверке избранного');
//                 }

//                 const data = await response.json();
//                 setIsFavorite(data.isFavorite);
//             } catch (error) {
//                 console.error('Ошибка:', error);
//             }
//         };

//         fetchProduct();
//         checkFavorite();
//     }, [id]);

//     const handleAddToCart = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             navigate('/auth');
//             return;
//         }

//         if (!product.stock) {
//             alert("Товара нет в наличии");
//             return;
//         }

//         try {
//             const response = await fetch("/api/cart", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ product_id: id, quantity: 1 }),
//             });

//             if (!response.ok) {
//                 throw new Error("Ошибка при добавлении товара в корзину");
//             }

//             alert("Товар добавлен в корзину");
//         } catch (error) {
//             console.error(error);
//             alert("Ошибка при добавлении товара в корзину");
//         }
//     };

//     const handleLikeClick = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 navigate('/auth');
//                 return;
//             }

//             const method = isFavorite ? "DELETE" : "POST";
//             const response = await fetch(`/api/favorites/${id}`, {
//                 method,
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Ошибка при обновлении избранного');
//             }

//             setIsFavorite(!isFavorite);
//         } catch (error) {
//             console.error('Ошибка:', error);
//             alert('Ошибка при обновлении избранного');
//         }
//     };

//     if (loading) {
//         return <div>Загрузка...</div>;
//     }

//     if (error) {
//         return <div>Ошибка: {error}</div>;
//     }

//     if (!product) {
//         return <div>Товар не найден</div>;
//     }

//     return (
//         <div className="product dark main">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-6 col-sm-12">
//                         <img className="productImg" src={product.image_url} alt={product.name} />
//                     </div>
//                     <div className="col-lg-6 col-sm-12 productContent">
//                         <h2>{product.name}</h2>
//                         <p className="description">{product.description}</p>
//                         <p className={product.stock ? "inStock" : "outOfStock"}>
//                             {product.stock ? "В наличии" : "Нет в наличии"}
//                         </p>
//                         <p className="">{product.price}₽</p>
//                         <div className="actions">
//                             <BtnSmall
//                                 className="basketBtn" 
//                                 disabled={loading || !product.stock}
//                                 onClick={handleAddToCart}
//                             >
//                                 {loading ? "Загрузка..." : (product.stock ? "В корзину" : "Товара нет в наличии")}
//                             </BtnSmall>
//                             <img 
//                                 className="secondary ps-4" 
//                                 src={isFavorite ? LikeRed : Like} 
//                                 alt="likeIcon"
//                                 onClick={handleLikeClick}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Product.css';

// components
import BtnSmall from "../../Components/BtnSmall/BtnSmall";
// icons
import Like from '../../assets/images/Like.svg';
import LikeRed from '../../assets/images/LikeRed.svg';

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const checkFavorite = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch(`/api/favorites/check/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при проверке избранного');
                }

                const data = await response.json();
                setIsFavorite(data.isFavorite);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchProduct();
        checkFavorite();
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/auth');
            return;
        }

        if (!product.stock) {
            alert("Товара нет в наличии");
            return;
        }

        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product_id: id, quantity: 1 }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при добавлении товара в корзину");
            }

            alert("Товар добавлен в корзину");
        } catch (error) {
            console.error(error);
            alert("Ошибка при добавлении товара в корзину");
        }
    };

    const handleLikeClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/auth');
                return;
            }

            const method = isFavorite ? "DELETE" : "POST";
            const response = await fetch(`/api/favorites/${id}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении избранного');
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при обновлении избранного');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!product) {
        return <div>Товар не найден</div>;
    }

    return (
        <div className="product dark main">
            <div className="container">
                <div className="row">
                    {/* На мобильных: фотография сверху, контент снизу */}
                    {/* На больших экранах: фотография слева, контент справа */}
                    <div className="col-lg-6">
                        <img className="productImg" src={product.image_url} alt={product.name} />
                    </div>
                    
                    <div className="col-lg-6 productContent">
                        <h2>{product.name}</h2>
                        <p className="description">{product.description}</p>
                        <p className={product.stock ? "inStock" : "outOfStock"}>
                            {product.stock ? "В наличии" : "Нет в наличии"}
                        </p>
                        <p className="">{product.price}₽</p>
                        <div className="actions">
                            <BtnSmall
                                className="basketBtn" 
                                disabled={loading || !product.stock}
                                onClick={handleAddToCart}
                            >
                                {loading ? "Загрузка..." : (product.stock ? "В корзину" : "Товара нет в наличии")}
                            </BtnSmall>
                            <img 
                                className="secondary" 
                                src={isFavorite ? LikeRed : Like} 
                                alt="likeIcon"
                                onClick={handleLikeClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}