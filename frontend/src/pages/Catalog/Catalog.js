// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
// // css
// import './Catalog.css';
// // components
// import ProductCard from "../../Components/Card/Card";
// import BtnGroup from "../../Components/BtnGroup/BtnGroup";
// // bootstrap
// import { Form, InputGroup } from 'react-bootstrap';
// import Search from '../../assets/images/Search.svg';

// export default function Catalog() {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]); // Состояние для категорий
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Состояние для выбранной категории

//     const navigate = useNavigate(); // Хук для навигации

//     // Загрузка товаров с бэкенда
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/api/products');
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     // Загрузка категорий с бэкенда
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('/api/categories');
//                 const data = await response.json();
//                 setCategories(data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     // Функция для перехода к карточке товара
//     const handleDetailsClick = (productId) => {
//         console.log('Navigating to product:', productId); // Логирование
//         navigate(`/product/${productId}`); // Переход на страницу товара
//     };

//     // Обработчик выбора категории
//     const handleCategoryChange = (categoryId) => {
//         console.log("Выбранная категория:", categoryId); // ОтладкаВ
//         setSelectedCategoryId(categoryId);
//     };

//     // Фильтрация товаров
//     const filteredProducts = products.filter(product => {
//         // Фильтрация по поисковому запросу
//         const matchesSearch = product.name.toLowerCase()
//             .includes(searchQuery.toLowerCase());

//         // Фильтрация по категории
//         const matchesCategory = selectedCategoryId === null
//             || selectedCategoryId === "Все товары"
//             || product.category_id === selectedCategoryId;

//         return matchesSearch && matchesCategory;
//     });

//     return (
//         <div className="catalog">
//             <div className="container">
//                 <h2 className="catalogTitle">Товары</h2>
//                 <div className="sort-container row">
//                     <div className="col-lg-6 col-sm-12 col-12 text-start">
//                         <BtnGroup
//                             categories={categories}
//                             selectedCategoryId={selectedCategoryId}
//                             onCategoryChange={handleCategoryChange}
//                         />
//                     </div>
//                     <div className="col-lg-6 col-sm-12 col-12 d-flex justify-content-end">
//                         <InputGroup className="inputContainer">
//                             <InputGroup.Text>
//                                 <img src={Search} alt="Search" className="search-icon" />
//                             </InputGroup.Text>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Поиск"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="search-input"
//                             />
//                         </InputGroup>
//                     </div>
//                 </div>
//                 <div className="cardItems row">
//                     {filteredProducts.map(product => (
//                         <div className="col-lg-3 col-sm-6 col-12 mb-4 cardContainer" key={product.id}>
//                             <ProductCard
//                                 product={product}
//                                 onDetailsClick={() => handleDetailsClick(product.id)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// css
import './Catalog.css';
// components
import ProductCard from "../../Components/Card/Card";
import BtnGroup from "../../Components/BtnGroup/BtnGroup";
// bootstrap
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import Search from '../../assets/images/Search.svg';

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const navigate = useNavigate();

    // Загрузка товаров с бэкенда
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Загрузка категорий с бэкенда
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Функция для перехода к карточке товара
    const handleDetailsClick = (productId) => {
        console.log('Navigating to product:', productId);
        navigate(`/product/${productId}`);
    };

    // Обработчик выбора категории
    const handleCategoryChange = (categoryId) => {
        console.log("Выбранная категория:", categoryId);
        setSelectedCategoryId(categoryId);
    };

    // Фильтрация товаров
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategoryId === null
            || selectedCategoryId === "Все товары"
            || product.category_id === selectedCategoryId;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="catalog">
            <div className="container">
                <h2 className="catalogTitle">Товары</h2>
                
                {/* Адаптивная сетка с сохранением поведения на больших экранах */}
                <div className="sort-container">
                    <Row className="align-items-center">
                        {/* Кнопки категорий - занимают 8 колонок на lg, всю ширину на меньших экранах */}
                        <Col lg={8} md={12} sm={12} xs={12} className="mb-3 mb-lg-0">
                            <div className="d-flex justify-content-start">
                                <BtnGroup
                                    categories={categories}
                                    selectedCategoryId={selectedCategoryId}
                                    onCategoryChange={handleCategoryChange}
                                />
                            </div>
                        </Col>
                        
                        {/* Поиск - занимает 4 колонки на lg, всю ширину на меньших экранах */}
                        <Col lg={4} md={12} sm={12} xs={12}>
                            <div className="d-flex justify-content-lg-end justify-content-md-start justify-content-sm-start justify-content-start">
                                <InputGroup className="inputContainer">
                                    <InputGroup.Text>
                                        <img src={Search} alt="Search" className="search-icon" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Поиск"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input"
                                    />
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                </div>
                
                <div className="cardItems mt-4">
                    {filteredProducts.map(product => (
                        <div className="catalog-card mb-4" key={product.id}>
                            <ProductCard
                                product={product}
                                onDetailsClick={() => handleDetailsClick(product.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}