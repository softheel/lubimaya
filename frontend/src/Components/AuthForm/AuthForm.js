import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AuthForm.css';
import BtnSmall from "../BtnSmall/BtnSmall";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); // Переключатель между входом и регистрацией
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin
            ? { username, password }
            : { username, email, password, first_name: firstName, last_name: lastName };
    
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (isLogin) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userId", data.user.id);
                    localStorage.setItem("userData", JSON.stringify(data.user));

                    // Если зашел администратор — перенаправляем сразу в админ‑панель
                    if (data.user.is_admin === true || data.user.is_admin === 1) {
                        navigate("/admin");
                    } else {
                        navigate("/profile");
                    }
                } else {
                    const loginResponse = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password }),
                    });
    
                    if (loginResponse.ok) {
                        const loginData = await loginResponse.json();
                        localStorage.setItem("token", loginData.token);
                        localStorage.setItem("userId", loginData.user.id);
                        localStorage.setItem("userData", JSON.stringify(loginData.user));

                        if (loginData.user.is_admin === true || loginData.user.is_admin === 1) {
                            navigate("/admin");
                        } else {
                            navigate("/profile");
                        }
                    } else {
                        setError("Ошибка при автоматической авторизации");
                    }
                }
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Ошибка при выполнении запроса");
            }
        } catch (error) {
            setError("Ошибка сети. Попробуйте снова.");
        }
    };

    return (
        <div className="main auth-page">
            <div className="section container">
                <div className="auth-form">
                    <h2>{isLogin ? "Вход в личный кабинет" : "Регистрация"}</h2>
                    <p className="form-p text16">
                        {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-link"
                        >
                            {isLogin ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "ВОЙТИ"}
                        </span>
                    </p>
                    {error && <p className="error text16">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username" className="text16">Введите имя пользователя</label>
                            <input
                                className="input-group-input"
                                type="text"
                                id="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div className="input-group">
                                    <label htmlFor="email" className="text16">Введите свой email</label>
                                    <input
                                        className="input-group-input"
                                        type="email"
                                        id="email"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="input-group col-lg-6">
                                        <label htmlFor="firstName" className="text16">Введите свое имя</label>
                                        <input
                                            className="input-group-input"
                                            type="text"
                                            id="firstName"
                                            placeholder="first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-group col-lg-6">
                                        <label htmlFor="lastName" className="text16">Введите свою фамилию</label>
                                        <input
                                            className="input-group-input"
                                            type="text"
                                            id="lastName"
                                            placeholder="last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="input-group">
                            <label htmlFor="password" className="text16">Введите пароль</label>
                            <input
                                className="input-group-input"
                                type="password"
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <BtnSmall type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</BtnSmall>
                    </form>
                </div>
            </div>
        </div>
    );
}