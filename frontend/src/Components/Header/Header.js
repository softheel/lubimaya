// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Container, Nav, Navbar } from "react-bootstrap";

// // Иконки
// import CartIcon from '../../assets/images/Cart.svg';
// import PersonIcon from '../../assets/images/Person.svg';
// import LogoutIcon from '../../assets/images/Logout.svg';
// import logo from '../../assets/images/logo.svg';

// // CSS
// import './Header.css';

// // Локальные компоненты
// import BtnSmall from "../BtnSmall/BtnSmall";

// export default function Header() {
//     const location = useLocation(); // Получаем текущий путь
//     const navigate = useNavigate(); // Для перенаправления
//     const isHomePage = location.pathname === "/";
//     const isAuthenticated = !!localStorage.getItem("token"); // Проверяем, авторизован ли пользователь

//     // Обработчик выхода из системы
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//         navigate("/"); // Перенаправляем на главную страницу
//     };

//     return (
//         <Navbar className="header">
//             <Container>
//                 <img src={logo} alt="Logo" />
//                 <Nav>
//                     <Nav.Link as={Link} to="/" className="navLink text-16">ГЛАВНАЯ</Nav.Link>
//                     <Nav.Link as={Link} to="/catalog" className="navLink text-16">КАТАЛОГ</Nav.Link>
//                     {isHomePage && (
//                         <>
//                             {/* <Nav.Link as="a" href="#delivery" className="navLink text-16">
//                                 ДОСТАВКА И ОПЛАТА
//                             </Nav.Link> */}
//                             <Nav.Link as="a" href="#contacts" className="navLink text-16">
//                                 КОНТАКТЫ
//                             </Nav.Link> 
//                         </>
//                     )}
//                 </Nav>
//                 {isAuthenticated ? (
//                     <div className="header-icons">
//                         <Nav.Link as={Link} to="/profile" className="navLink">
//                             <img src={PersonIcon} alt="Личный кабинет" className="icon" />
//                         </Nav.Link>
//                         <Nav.Link as={Link} to="/cart" className="navLink">
//                             <img src={CartIcon} alt="Корзина" className="icon" />
//                         </Nav.Link>
//                         <Nav.Link onClick={handleLogout} className="navLink">
//                             <img src={LogoutIcon} alt="Выйти" className="icon" />
//                         </Nav.Link>
//                     </div>
//                 ) : (
//                     <BtnSmall as={Link} to="/auth">ВОЙТИ</BtnSmall>
//                 )}
//             </Container>
//         </Navbar>
//     );
// }

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

// Иконки
import CartIcon from '../../assets/images/Cart.svg';
import PersonIcon from '../../assets/images/Person.svg';
import LogoutIcon from '../../assets/images/Logout.svg';
import logo from '../../assets/images/logo.svg';

// CSS
import './Header.css';

// Локальные компоненты
import BtnSmall from "../BtnSmall/BtnSmall";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";
    const isAuthenticated = !!localStorage.getItem("token");
    const [expanded, setExpanded] = useState(false);
    
    // Проверка прав администратора
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const isAdmin = userData.is_admin === true || userData.is_admin === 1;

    // Обработчик выхода из системы
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
        setExpanded(false);
    };

    return (
        <Navbar 
            className="header"
            expand="lg"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
        >
            <Container>
                <img src={logo} alt="Logo" />
                
                {/* Бургер-кнопка для мобильных */}
                <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggler-custom" />
                
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link 
                            as={Link} 
                            to="/" 
                            className="navLink text-16"
                            onClick={() => setExpanded(false)}
                        >
                            ГЛАВНАЯ
                        </Nav.Link>
                        <Nav.Link 
                            as={Link} 
                            to="/catalog" 
                            className="navLink text-16"
                            onClick={() => setExpanded(false)}
                        >
                            КАТАЛОГ
                        </Nav.Link>
                        {isHomePage && (
                            <>
                                {/* <Nav.Link as="a" href="#delivery" className="navLink text-16">
                                    ДОСТАВКА И ОПЛАТА
                                </Nav.Link> */}
                                <Nav.Link 
                                    as="a" 
                                    href="#contacts" 
                                    className="navLink text-16"
                                    onClick={() => setExpanded(false)}
                                >
                                    КОНТАКТЫ
                                </Nav.Link> 
                            </>
                        )}
                    </Nav>
                    
                    {isAuthenticated ? (
                        <div className="header-icons">
                            {isAdmin && (
                                <Nav.Link 
                                    as={Link} 
                                    to="/admin" 
                                    className="navLink text-16"
                                    onClick={() => setExpanded(false)}
                                >
                                    АДМИН
                                </Nav.Link>
                            )}
                            <Nav.Link 
                                as={Link} 
                                to="/profile" 
                                className="navLink"
                                onClick={() => setExpanded(false)}
                            >
                                <img src={PersonIcon} alt="Личный кабинет" className="icon" />
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/cart" 
                                className="navLink"
                                onClick={() => setExpanded(false)}
                            >
                                <img src={CartIcon} alt="Корзина" className="icon" />
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout} className="navLink">
                                <img src={LogoutIcon} alt="Выйти" className="icon" />
                            </Nav.Link>
                        </div>
                    ) : (
                        <BtnSmall 
                            as={Link} 
                            to="/auth"
                            onClick={() => setExpanded(false)}
                        >
                            ВОЙТИ
                        </BtnSmall>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}