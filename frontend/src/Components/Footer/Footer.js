import React, { useEffect } from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

// Иконки
import logo from '../../assets/images/logo.svg';
import Instagram from '../../assets/images/InstagramLight.svg';
import Whatsapp from '../../assets/images/WhatsappLight.svg';

export default function Footer() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const element = document.getElementById(location.hash.slice(1));
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location]);

	return (
		<footer className="footer">
			<Container className="footer-container">
				<Nav className="footerContent">
					{/* Логотип */}
					<Nav.Link as={Link} to="/" className="navLink logo-link">
						<img src={logo} alt="Logo" />
					</Nav.Link>

					{/* Контакты */}
					<div className="footerNav">
						{/* Ссылка на контакты */}
						<Nav.Link as={Link} to="/#contacts" className="navLink">
							КОНТАКТЫ
						</Nav.Link>
						<div className="footer-contact-item">
							<Nav.Link
								as="a"
								href="https://wa.me/your-number"
								target="_blank"
								rel="noopener noreferrer"
								className="navLink footer-contact-link"
								onClick={(e) => {
									e.preventDefault();
									window.open('https://wa.me/your-number', '_blank');
								}}
							>
								<img src={Whatsapp} alt="Whatsapp" />
								<p className="footer-contact-text ms-3">+7(926)210-66-39</p>
							</Nav.Link>
						</div>
						<div className="footer-contact-item">
							<Nav.Link
								as="a"
								href="https://instagram.com/your-profile"
								target="_blank"
								rel="noopener noreferrer"
								className="navLink footer-contact-link"
								onClick={(e) => {
									e.preventDefault();
									window.open('https://instagram.com/your-profile', '_blank');
								}}
							>
								<img src={Instagram} alt="Instagram" className="me-3" />
								<p className="footer-contact-text">cheese_farm</p>
							</Nav.Link>
						</div>
					</div>

					<div className="footerNav">
						<Nav.Link
							as="a"
							href="#"
							rel="noopener noreferrer"
							className="navLink footer-contact-link"
						>
							<p className="text-start">
								АДРЕС СЫРОВАРНИ:<br />
								Московская область, Щёлково, Любимая 61<br />
								Можно добраться на машине.
							</p>
						</Nav.Link>
					</div>

					{/* Каталог и часы работы */}
					<div className="footerNav footer-catalog">
						<Nav.Link as={Link} to="/catalog" className="navLink text-start">
							ПЕРЕЙТИ В КАТАЛОГ
						</Nav.Link>
						<p className="text-start">
							ЧАСЫ РАБОТЫ:<br></br>
							пн-вс: 9:00 - 19:00
						</p>
					</div>
				</Nav>
			</Container>
			{/* Копирайт */}
			<div className="footer-copyright">
				<Container>
					<p className="m-0">© 2025 All Rights Reserved</p>
				</Container>
			</div>
		</footer>
	);
}