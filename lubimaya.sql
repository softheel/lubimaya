-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 23 2026 г., 18:46
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lubimaya`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 1, 2, 1),
(3, 2, 3, 1),
(9, 4, 3, 2),
(10, 4, 2, 1),
(52, 27, 5, 1),
(53, 27, 6, 1),
(64, 6, 3, 2),
(71, 59, 4, 1),
(74, 60, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Сыры', 'Натуральные сыры ручного производства', '2025-03-12 14:58:55'),
(2, 'Молочная продукция', 'Натуральная фермерская молочная продукция', '2025-03-12 14:58:55');

-- --------------------------------------------------------

--
-- Структура таблицы `favorites`
--

CREATE TABLE `favorites` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(1, 1, 3, '2025-03-12 15:30:29'),
(2, 2, 1, '2025-03-12 15:30:29'),
(3, 3, 2, '2025-03-12 15:30:29'),
(36, 25, 2, '2025-04-01 18:11:34'),
(37, 26, 7, '2025-04-03 11:07:26'),
(38, 26, 5, '2025-04-03 11:07:29'),
(39, 26, 8, '2025-04-03 11:07:31'),
(40, 26, 2, '2025-04-03 12:16:22'),
(42, 27, 5, '2025-04-03 12:34:31'),
(45, 5, 5, '2025-11-22 18:07:29'),
(55, 6, 2, '2025-12-15 09:08:49'),
(57, 6, 1, '2025-12-15 21:02:34'),
(61, 5, 3, '2026-03-03 11:12:47'),
(62, 35, 3, '2026-05-15 08:25:03'),
(63, 58, 1, '2026-05-21 11:40:04'),
(64, 58, 8, '2026-05-21 11:40:16'),
(66, 59, 4, '2026-05-21 11:55:58'),
(67, 60, 2, '2026-06-23 13:34:53'),
(68, 60, 5, '2026-06-23 13:34:56'),
(69, 60, 1, '2026-06-23 13:35:01'),
(70, 60, 3, '2026-06-23 13:37:05');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `delivery_phone` varchar(20) NOT NULL,
  `delivery_email` varchar(100) NOT NULL,
  `status` varchar(50) DEFAULT 'В обработке',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `delivery_address`, `delivery_phone`, `delivery_email`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '14000.00', '', '', '', 'В обработке', '2025-03-12 15:30:29', '2025-03-12 15:30:29'),
(2, 2, '5000.00', '', '', '', 'Доставлен', '2025-03-12 15:30:29', '2025-03-12 15:30:29'),
(3, 1, '14000.00', '', '', '', 'В обработке', '2025-03-12 18:56:49', '2025-03-12 18:56:49'),
(8, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:51:32', '2025-03-24 11:51:32'),
(9, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:53:37', '2025-03-24 11:53:37'),
(10, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:53:51', '2025-03-24 11:53:51'),
(11, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:54:59', '2025-03-24 11:54:59'),
(12, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:55:21', '2025-03-24 11:55:21'),
(13, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:56:30', '2025-03-24 11:56:30'),
(14, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:58:16', '2025-03-24 11:58:16'),
(15, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 11:58:32', '2025-03-24 11:58:32'),
(16, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 12:02:01', '2025-03-24 12:02:01'),
(17, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 12:03:23', '2025-03-24 12:03:23'),
(18, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 12:06:04', '2025-03-24 12:06:04'),
(19, 6, '22000.00', '', '', '', 'В обработке', '2025-03-24 12:08:23', '2025-03-24 12:08:23'),
(20, 6, '27500.00', 'dzmjftgxm', '89268448505', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:07:09', '2025-03-27 12:07:09'),
(21, 6, '16000.00', 'dzmjftgxm', '89268448505', '123@gmail.com', 'В обработке', '2025-03-27 12:10:32', '2025-03-27 12:10:32'),
(22, 6, '22000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:11:05', '2025-03-27 12:11:05'),
(23, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:12:15', '2025-03-27 12:12:15'),
(24, 6, '4000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:18:19', '2025-03-27 12:18:19'),
(25, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:20:49', '2025-03-27 12:20:49'),
(26, 6, '11000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:25:22', '2025-03-27 12:25:22'),
(27, 6, '6000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:27:25', '2025-03-27 12:27:25'),
(28, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:28:18', '2025-03-27 12:28:18'),
(29, 6, '12000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-27 12:31:18', '2025-03-27 12:31:18'),
(30, 5, '27000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 11:04:16', '2025-03-28 11:04:16'),
(31, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:45:27', '2025-03-28 13:45:27'),
(32, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:46:45', '2025-03-28 13:46:45'),
(33, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:47:59', '2025-03-28 13:47:59'),
(34, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:49:51', '2025-03-28 13:49:51'),
(35, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:50:19', '2025-03-28 13:50:19'),
(36, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:51:52', '2025-03-28 13:51:52'),
(37, 6, '22000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 13:55:01', '2025-03-28 13:55:01'),
(38, 6, '4000.00', 'xchjkjhgvc', 'dgxfmft', 'aaa@gmail.com', 'В обработке', '2025-03-28 14:07:01', '2025-03-28 14:07:01'),
(39, 6, '6000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 14:31:23', '2025-03-28 14:31:23'),
(40, 6, '15500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 14:53:41', '2025-03-28 14:53:41'),
(41, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 14:57:45', '2025-03-28 14:57:45'),
(42, 6, '4000.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 15:02:55', '2025-03-28 15:02:55'),
(43, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 15:05:23', '2025-03-28 15:05:23'),
(44, 6, '5500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-28 15:10:49', '2025-03-28 15:10:49'),
(45, 6, '28500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-03-30 11:28:53', '2025-03-30 11:28:53'),
(46, 25, '5500.00', 'dzmjftgxm', '89261111111', 'ab@gmail.com', 'В обработке', '2025-04-01 18:12:53', '2025-04-01 18:12:53'),
(47, 6, '37000.00', 'dzmjftgxm', '89261111111', 'ab@gmail.com', 'В обработке', '2025-04-01 18:23:04', '2025-04-01 18:23:04'),
(48, 26, '47500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-04-03 12:32:42', '2025-04-03 12:32:42'),
(49, 6, '19600.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-12-14 15:20:25', '2025-12-14 15:20:25'),
(50, 6, '11500.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-12-14 17:42:36', '2025-12-14 17:42:36'),
(51, 6, '20500.00', 'dzmjftgxm', '89261111111', 'abcd@gmail.com', 'В доставке', '2025-12-14 17:51:47', '2026-02-24 11:11:07'),
(52, 6, '8800.00', 'dzmjftgxm', '89261111111', 'aaa@gmail.com', 'В обработке', '2025-12-15 09:11:47', '2025-12-15 09:11:47'),
(53, 34, '5500.00', 'dzmjftgxm', '8 926 844-85-05', 'aaadmin@gmail.com', 'Доставлен', '2026-02-24 11:57:33', '2026-02-27 12:29:11'),
(54, 5, '17500.00', 'dzmjftgxm', '8 926 844-85-05', 'aaa@gmail.com', 'В обработке', '2026-03-03 11:46:09', '2026-03-03 11:46:09'),
(55, 35, '9900.00', 'dzmjftgxm', '8 926 844-85-05', 'abiruk06@gmail.com', 'Доставлен', '2026-05-15 08:25:39', '2026-05-15 08:26:52'),
(56, 58, '12500.00', 'улица Дубравная дом 5', '8(926)844-85-07', 'aaanastasiaa@gmail.com', 'В обработке', '2026-05-21 11:41:32', '2026-05-21 11:41:32'),
(57, 60, '2500.00', 'улица Дубравная дом 5', '8(926)844-85-07', 'aaa@gmail.com', 'В обработке', '2026-06-23 13:38:58', '2026-06-23 13:38:58');

-- --------------------------------------------------------

--
-- Структура таблицы `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 2, '4000.00'),
(2, 1, 2, 1, '6000.00'),
(3, 2, 3, 1, '5000.00'),
(4, 3, 1, 2, '4000.00'),
(5, 3, 2, 1, '6000.00'),
(10, 8, 4, 4, '5500.00'),
(11, 9, 4, 4, '5500.00'),
(12, 10, 4, 4, '5500.00'),
(13, 11, 4, 4, '5500.00'),
(14, 12, 4, 4, '5500.00'),
(15, 13, 4, 4, '5500.00'),
(16, 14, 4, 4, '5500.00'),
(17, 15, 4, 4, '5500.00'),
(18, 16, 4, 4, '5500.00'),
(19, 17, 4, 4, '5500.00'),
(20, 18, 4, 4, '5500.00'),
(21, 19, 4, 4, '5500.00'),
(22, 20, 1, 4, '4000.00'),
(23, 20, 2, 1, '6000.00'),
(24, 20, 4, 1, '5500.00'),
(25, 21, 1, 4, '4000.00'),
(26, 22, 4, 4, '5500.00'),
(27, 23, 4, 1, '5500.00'),
(28, 24, 1, 1, '4000.00'),
(29, 25, 4, 1, '5500.00'),
(30, 26, 4, 2, '5500.00'),
(31, 27, 2, 1, '6000.00'),
(32, 28, 4, 1, '5500.00'),
(33, 29, 1, 3, '4000.00'),
(34, 30, 2, 2, '6000.00'),
(35, 30, 1, 1, '4000.00'),
(36, 30, 4, 2, '5500.00'),
(37, 31, 4, 4, '5500.00'),
(38, 32, 4, 4, '5500.00'),
(39, 33, 4, 4, '5500.00'),
(40, 34, 4, 4, '5500.00'),
(41, 35, 4, 4, '5500.00'),
(42, 36, 4, 4, '5500.00'),
(43, 37, 4, 4, '5500.00'),
(44, 38, 1, 1, '4000.00'),
(45, 39, 2, 1, '6000.00'),
(46, 40, 1, 1, '4000.00'),
(47, 40, 2, 1, '6000.00'),
(48, 40, 4, 1, '5500.00'),
(49, 41, 4, 1, '5500.00'),
(50, 42, 1, 1, '4000.00'),
(63, 50, 3, 1, '5000.00'),
(64, 50, 5, 1, '6500.00'),
(65, 51, 8, 1, '7500.00'),
(66, 51, 5, 2, '6500.00'),
(67, 52, 1, 1, '4000.00'),
(68, 52, 6, 1, '4800.00'),
(69, 53, 4, 1, '5500.00'),
(70, 54, 2, 1, '6000.00'),
(71, 54, 3, 1, '5000.00'),
(72, 54, 5, 1, '6500.00'),
(73, 55, 3, 3, '3300.00'),
(74, 56, 1, 5, '2500.00'),
(75, 57, 1, 1, '2500.00');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `stock` tinyint(1) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image_url`, `stock`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Сыр «Гауда» молодой', 'На нашей сыроварне можно приобрести экологически чистый сыр сорта «Гауда», при изготовлении которого используется только цельное коровье молоко. В качестве консерванта у нас идёт соль, когда как многие другие производители добавляют натрий азотнокислый (селитра)Е251.\r\n\r\nСыр Гауда молодой выдерживается до 6 месяцев', '2500.00', '/images/cheese_gauda.png', 1, 1, '2025-03-12 14:59:04', '2026-05-14 22:25:16'),
(2, 'Сыр «Гауда» зрелый', 'На нашей сыроварне можно приобрести экологически чистый сыр сорта «Гауда», при изготовлении которого используется только цельное коровье молоко. В качестве консерванта у нас идёт соль, когда как многие другие производители добавляют натрий азотнокислый (селитра)Е251.\r\n\r\nСыр Гауда молодой выдерживается до 6 месяцев', '3000.00', '/images/cheese_gauda.png', 0, 1, '2025-03-12 14:59:04', '2026-05-14 22:25:24'),
(3, 'Сыр «Гауда» с пажитником', 'На нашей сыроварне можно приобрести экологически чистый сыр сорта «Гауда», при изготовлении которого используется только цельное коровье молоко. В качестве консерванта у нас идёт соль, когда как многие другие производители добавляют натрий азотнокислый (селитра)Е251.\r\n\r\nСыр Гауда молодой выдерживается до 6 месяцев', '3300.00', '/images/cheese_gauda.png', 1, 1, '2025-03-12 14:59:04', '2026-05-14 22:25:31'),
(4, '«Гауда» с прованскими травами', 'На нашей сыроварне можно приобрести экологически чистый сыр сорта «Гауда», при изготовлении которого используется только цельное коровье молоко. В качестве консерванта у нас идёт соль, когда как многие другие производители добавляют натрий азотнокислый (селитра)Е251.\r\n\r\nСыр Гауда молодой выдерживается до 6 месяцев', '3300.00', '/images/cheese_gauda.png', 1, 1, '2025-03-14 10:37:05', '2026-05-14 22:25:37'),
(5, 'Сыр «Сулугуни»', 'Эта керамическая тарелка ручной работы в форме черного бильярдного шара с номером 8 сочетает в себе элегантность и стиль. Идеальный акцент для современного интерьера или оригинальный подарок для любителей бильярда. Изготовлена из высококачественной керамики с тщательной проработкой деталей. Подходит для сервировки или как самостоятельный декоративный элемент.', '2400.00', '/images/cheese_suluguni.png', 1, 1, '2025-04-03 04:23:00', '2026-05-14 22:25:47'),
(6, 'Молоко', 'Очаровательная кружка ручной работы с рельефным сердечком - символ любви и тепла. Нежный розовый оттенок и гладкая текстура делают её идеальной для уютных чаепитий. Удобная ручка и оптимальный объем (300 мл) обеспечивают комфортное использование. Прекрасный подарок для близкого человека или стильный аксессуар для вашей кухни.', '600.00', '/images/milk.png', 1, 2, '2025-04-03 04:23:00', '2026-05-14 22:25:58'),
(7, 'Ряженка', 'Эксклюзивная керамическая тарелка с изображением культового персонажа Hello Kitty, выполненная в нежно-розовых тонах. Идеальный выбор для поклонников японской культуры и коллекционеров. Яркий дизайн и высокое качество исполнения делают эту тарелку не только функциональной посудой, но и стильным элементом декора. Подходит для сервировки десертов или как украшение интерьера.', '700.00', '/images/ryazhenka.png', 0, 2, '2025-04-03 04:23:00', '2026-05-14 22:26:09'),
(8, 'Сметана', 'Уникальная керамическая палитра с использованием морских ракушек - идеальный инструмент для художников и творческих натур. Необычный дизайн сочетает в себе функциональность и эстетику, вдохновленную морской тематикой. Гладкие углубления для красок и удобная форма делают процесс творчества еще более приятным. Отличный подарок для творческих личностей.', '750.00', '/images/smetana.png', 1, 2, '2025-04-03 04:23:00', '2026-05-14 22:26:13');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `is_admin`, `created_at`, `updated_at`) VALUES
(1, 'user1', 'user1@example.com', 'password1', 'Иван', 'Иванов', 0, '2025-03-12 15:30:29', '2025-03-12 15:30:29'),
(2, 'user2', 'user2@example.com', 'password2', 'Петр', 'Петров', 0, '2025-03-12 15:30:29', '2025-03-12 15:30:29'),
(3, 'user3', 'user3@example.com', 'password3', 'Сергей', 'Сергеев', 0, '2025-03-12 15:30:29', '2025-03-12 15:30:29'),
(4, 'alena', 'a@gmail.com', '$2b$10$46d043oRCtIvNlMcIzgfjuon00sJry9C2pQpQZycgdGQQa.iIWAIq', 'Alena', 'Afanasieva', 0, '2025-03-20 15:47:15', '2026-05-14 22:18:09'),
(5, 'ivan', 'aa@gmail.com', '$2b$10$l37cWu1f.T0Q9ViG9tbcDuoxMAed/Ulj9Ty5aQ5GCeUg1ovTurljC', 'Иван', 'Иванов', 0, '2025-03-20 15:53:01', '2026-05-14 22:18:32'),
(6, 'alex', '12234@gmail.com', '$2b$10$U4rlP/jVv06.tixd6sc02.N1W4BzIUHkx8DNmJABAykMT/9CgFBYC', 'Алексей', 'Алексеев', 0, '2025-03-21 14:40:09', '2026-05-14 22:18:59'),
(7, 'sveta', 'aaa@gmail.com', '$2b$10$ZIC4FKYNtqNeQ.IY0TLVne5A/YMnZeO5ymjIO71xQkv90Clg7bDGy', 'Светлана', 'Алексеевна', 0, '2025-03-24 14:58:37', '2026-05-14 22:19:31'),
(8, 'julia', 'tralalelotralala.official@gmail.com', '$2b$10$sgcdKAVW35.jHu0v8K0yQe.2kzpbi2xkd8MEEWo1OSuhwG0.4RxRS', 'Юлия', 'Юриевна', 0, '2025-03-30 21:01:58', '2026-05-14 22:20:07'),
(9, 'boris', '123@gmail.com', '$2b$10$ct.uuanWbqWaYSbzCGN9yu9h.DC.8NzIU3heov//tyFSVouM73Why', 'Борис', 'Борисов', 0, '2025-03-30 21:15:03', '2026-05-14 22:20:48'),
(20, 'elena', '1@ail.com', '$2b$10$ETSCL5TDA6D9MifhEPaBv.RJLUiMG7TGAw4wfhdZOTMG0exvI6ELK', 'Елена', 'Елова', 0, '2025-03-30 21:16:03', '2026-05-14 22:21:18'),
(22, 'alina', 'alina@gmail.com', '$2b$10$uf3Pd0btD2SRaOjEu2ndbuEqsor3sVO3X1ukmNSImebtwZYgCO0SS', 'Алина', 'Федоровна', 0, '2025-04-01 18:10:05', '2026-05-14 22:22:48'),
(25, 'fedor', 'ab@gmail.com', '$2b$10$0i4JiMykP/81obTdlvymluswI.HSaco7aWhdo4LZi9dx/uJCEvsoW', 'Федор', 'Федоров', 0, '2025-04-01 18:10:42', '2026-05-14 22:23:13'),
(26, 'nastya', 'abcd@gmail.com', '$2b$10$TXh3.YNKUrUdLya62CGcZ.R0o15xm1YmvpCHv88KLdMwgqjG5x65W', 'Анастасия', 'Бирюкова', 0, '2025-04-03 07:34:43', '2026-05-14 22:23:30'),
(27, 'nastya', 'abcde@gmail.com', '$2b$10$72nL7h9OETBWF1syh1qn8.BHY2h1WImnTNXtMV2cNunwE3QOIp/Pi', 'Анастасия', 'Бирюкова', 0, '2025-04-03 12:33:29', '2025-04-03 12:33:29'),
(28, 'testuser', 'test@example.com', '$2b$10$gDqHtqIzt3vhzAhdMzR0aOkgGX7CloYBoFGjklSd0ifZxD3l38zx2', 'Тестовый', 'Пользователь', 0, '2025-04-13 20:07:43', '2026-05-14 22:23:54'),
(34, 'admin', 'aaadmin@gmail.com', '$2b$10$Ly6cC9R3wqh1lPuahEOzGuGQe9.jSABAYxKetpWycGhdGYYrrXHB.', 'Администратор', 'Сайта', 0, '2026-02-24 11:03:50', '2026-05-14 22:44:31'),
(35, 'anastasia', 'abiruk06@gmail.com', '$2b$10$3iqxA/FyDMTZ0unRv.Myj.EkAFC8GCTc/cDaLWlCEwn.XiQ1ODs4u', 'Анастасия', 'Бирюковаa', 0, '2026-05-09 15:22:16', '2026-05-15 08:24:54'),
(36, 'admin', 'admin@gmail.com', '$2b$10$s8rN06GBsT1KuNKNqoccYOfkN0TfUyFIf4VLgpHa2w6nnBeTvj3ka', 'Администратор', 'Сайта', 0, '2026-05-14 22:45:07', '2026-05-14 22:45:07'),
(40, 'admin', 'aaaadmin@gmail.com', '$2b$10$L7psoah0NB8B6AwhSLNZheXab4by/RTwTlZShnji.yVNahEqqjZSG', 'Администратор', 'Сайта', 0, '2026-05-14 22:46:41', '2026-05-14 22:46:41'),
(52, 'administrator', 'abiruk07@gmail.com', '$2b$10$GYrLHc2D7.v/grMhVmy.L.PyGFUREG9lwDxXpGMPoZhcx9IQTDyxO', 'Анастасия', 'Бирюкова', 1, '2026-05-14 22:51:28', '2026-05-14 22:51:48'),
(53, 'Nastya', 'aanastasia@gmail.com', '$2b$10$fpDpPoX0LlVkWmSSFcYRXueK.CMG5KO09iBYgB4eIFB2DXNW9EZpC', 'Анастасия', 'Бирюкова', 0, '2026-05-21 11:37:23', '2026-05-21 11:37:23'),
(58, 'Anastasia225', 'aaanastasiaa@gmail.com', '$2b$10$yanvl3QbrwoBW/hTAQmy2OojIC3bpF4J7tdMZMoIYf5O5PlUiQ/aW', 'Олеся', 'Бирюкова', 0, '2026-05-21 11:39:39', '2026-05-21 11:39:52'),
(59, 'biryukova', 'abiryukova@gmail.com', '$2b$10$5uavwLs4oF9.7LGGvGt2Cen4bQ1jDyFjgin74oRXWIR.pQIEEvQIy', 'Анастасия', 'Бирюкова', 0, '2026-05-21 11:55:32', '2026-05-21 11:55:41'),
(60, 'anna', 'anna@gmail.com', '$2b$10$6OhogS.zlqOd6kdK4tRmm.pvXNg4Iv.bVlCOCg1iByMPYPprJC6Zm', 'Анна', 'Анатольева', 0, '2026-06-23 13:34:13', '2026-06-23 13:34:13');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT для таблицы `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ограничения внешнего ключа таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
