import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lubimaya',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, first_name, last_name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, first_name || null, last_name || null]
        );

        res.status(201).json({
            message: 'User registered successfully', userId: result.insertId
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        console.log('Attempting login for username:', username);

        const [users] = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        console.log('Found users:', users.length);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // проверка, является ли пароль хешированным (начинается с $2b$)
        const isHashedPassword = user.password.startsWith('$2b$');

        let validPassword;
        if (isHashedPassword) {
            validPassword = await bcrypt.compare(password, user.password);
        } else {
            // Для тестовых пользователей с простыми паролями
            validPassword = password === user.password;
        }

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            jwtSecret,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                is_admin: user.is_admin || false
            }
        });

    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            sqlMessage: error.sqlMessage
        });
        res.status(500).json({
            error: 'Error logging in',
            details: error.message
        });
    }
});

app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, username, email, first_name, last_name, is_admin, created_at FROM users WHERE id = ?',
            [req.user.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const [categories] = await pool.execute('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        console.error('Categories error:', error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const [products] = await pool.execute('SELECT * FROM products');
        res.json(products);
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const [products] = await pool.execute(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(products[0]);
    } catch (error) {
        console.error('Product details error:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
});

// Cart routes
app.get('/api/cart', authenticateToken, async (req, res) => {
    try {
        const [cartItems] = await pool.execute(
            `SELECT c.*, p.name, p.price, p.image_url, p.id as product_id 
             FROM cart c 
             JOIN products p ON c.product_id = p.id 
             WHERE c.user_id = ?`,
            [req.user.userId]
        );
        res.json(cartItems);
    } catch (error) {
        console.error('Cart error:', error);
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        const [existingItems] = await pool.execute(
            'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
            [req.user.userId, product_id]
        );

        if (existingItems.length > 0) {
            await pool.execute(
                'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
                [quantity, req.user.userId, product_id]
            );
        } else {
            await pool.execute(
                'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [req.user.userId, product_id, quantity]
            );
        }

        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Error adding item to cart' });
    }
});

app.put('/api/cart', authenticateToken, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        const [result] = await pool.execute(
            'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
            [quantity, req.user.userId, product_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ error: 'Error updating cart' });
    }
});

app.delete('/api/cart/:product_id', authenticateToken, async (req, res) => {
    try {
        const { product_id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
            [req.user.userId, product_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ error: 'Error removing item from cart' });
    }
});

app.delete('/api/cart/clear', authenticateToken, async (req, res) => {
    const connection = await pool.getConnection();
    try {
        // проверка, есть ли товары в корзине
        const [cartItems] = await connection.execute(
            'SELECT COUNT(*) as count FROM cart WHERE user_id = ?',
            [req.user.userId]
        );

        if (cartItems[0].count === 0) {
            return res.json({
                message: 'Cart is already empty',
                deletedItems: 0
            });
        }

        // очистка корзины
        await connection.execute(
            'DELETE FROM cart WHERE user_id = ?',
            [req.user.userId]
        );

        res.json({
            message: 'Cart cleared successfully',
            deletedItems: cartItems[0].count
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            error: 'Error clearing cart',
            details: error.message
        });
    } finally {
        connection.release();
    }
});

// Order routes
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        console.log('Received order data:', req.body);
        console.log('User ID:', req.user.userId);

        const { total_price, delivery_address, delivery_phone, delivery_email, items } = req.body;

        if (!total_price || !delivery_address || !delivery_phone || !delivery_email || !items || items.length === 0) {
            console.error('Missing required fields:', {
                total_price,
                delivery_address,
                delivery_phone,
                delivery_email,
                items
            });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // начало транзакции
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            console.log('Creating order with data:', {
                user_id: req.user.userId,
                total_price,
                delivery_address,
                delivery_phone,
                delivery_email
            });

            // создание заказа
            const [orderResult] = await connection.execute(
                'INSERT INTO orders (user_id, total_price, delivery_address, delivery_phone, delivery_email, status) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.userId, total_price, delivery_address, delivery_phone, delivery_email, 'В обработке']
            );

            const orderId = orderResult.insertId;
            console.log('Order created with ID:', orderId);

            // добавление товаров в заказ
            for (const item of items) {
                console.log('Adding order item:', item);
                await connection.execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, item.price]
                );
            }

            // очистка корзины
            await connection.execute(
                'DELETE FROM cart WHERE user_id = ?',
                [req.user.userId]
            );

            // подтверждение транзакции
            await connection.commit();
            console.log('Order transaction committed successfully');

            res.status(201).json({
                message: 'Order created successfully',
                orderId: orderId
            });
        } catch (error) {
            console.error('Error in order transaction:', error);
            // Откат транзакции в случае ошибки
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            error: 'Error creating order',
            details: error.message
        });
    }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const { username, email, first_name, last_name } = req.body;

        // проверка, не занят ли email другим пользователем
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ? AND id != ?',
            [email, req.user.userId]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email уже используется другим пользователем' });
        }

        // обновление данных пользователя
        const [result] = await pool.execute(
            'UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ? WHERE id = ?',
            [username, email, first_name, last_name, req.user.userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // получение обновленных данных  пользователя
        const [users] = await pool.execute(
            'SELECT id, username, email, first_name, last_name, is_admin, created_at FROM users WHERE id = ?',
            [req.user.userId]
        );

        res.json(users[0]);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Ошибка при обновлении профиля' });
    }
});

// Favorites routes
app.get('/api/favorites/check/:productId', authenticateToken, async (req, res) => {
    try {
        const [favorites] = await pool.execute(
            'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.userId, req.params.productId]
        );

        res.json({ isFavorite: favorites.length > 0 });
    } catch (error) {
        console.error('Check favorite error:', error);
        res.status(500).json({ error: 'Error checking favorite status' });
    }
});

app.post('/api/favorites/:productId', authenticateToken, async (req, res) => {
    try {
        await pool.execute(
            'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
            [req.user.userId, req.params.productId]
        );

        res.json({ message: 'Item added to favorites' });
    } catch (error) {
        console.error('Add to favorites error:', error);
        res.status(500).json({ error: 'Error adding item to favorites' });
    }
});

app.delete('/api/favorites/:productId', authenticateToken, async (req, res) => {
    try {
        const [result] = await pool.execute(
            'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
            [req.user.userId, req.params.productId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found in favorites' });
        }

        res.json({ message: 'Item removed from favorites' });
    } catch (error) {
        console.error('Remove from favorites error:', error);
        res.status(500).json({ error: 'Error removing item from favorites' });
    }
});

// Get all favorites for user
app.get('/api/favorites', authenticateToken, async (req, res) => {
    try {
        const [favorites] = await pool.execute(
            `SELECT f.*, p.name, p.price, p.image_url, p.description, p.stock 
             FROM favorites f 
             JOIN products p ON f.product_id = p.id 
             WHERE f.user_id = ?`,
            [req.user.userId]
        );

        res.json(favorites);
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ error: 'Error fetching favorites' });
    }
});

// ==================== ADMIN ROUTES ====================

// Admin: Get all users
app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, username, email, first_name, last_name, is_admin, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(users);
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Admin: Get all orders
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
    try {
        const [orders] = await pool.execute(
            `SELECT o.*, u.username, u.email, u.first_name, u.last_name 
             FROM orders o 
             JOIN users u ON o.user_id = u.id 
             ORDER BY o.created_at DESC`
        );

        // Получаем товары для каждого заказа
        for (let order of orders) {
            const [items] = await pool.execute(
                `SELECT oi.*, p.name, p.image_url 
                 FROM order_items oi 
                 JOIN products p ON oi.product_id = p.id 
                 WHERE oi.order_id = ?`,
                [order.id]
            );
            order.items = items;
        }

        res.json(orders);
    } catch (error) {
        console.error('Admin get orders error:', error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Admin: Update order status
app.put('/api/admin/orders/:id', authenticateAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const [result] = await pool.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Admin update order error:', error);
        res.status(500).json({ error: 'Error updating order status' });
    }
});

// Admin: Create product
app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
    try {
        const { name, description, price, image_url, stock, category_id } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        const [result] = await pool.execute(
            'INSERT INTO products (name, description, price, image_url, stock, category_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description || null, price, image_url || null, stock || 0, category_id || null]
        );

        res.status(201).json({
            message: 'Product created successfully',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Admin create product error:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
});

// Admin: Update product
app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image_url, stock, category_id } = req.body;

        const [result] = await pool.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, stock = ?, category_id = ? WHERE id = ?',
            [name, description, price, image_url, stock, category_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Admin update product error:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Admin: Delete product
app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Admin delete product error:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
});

// Admin: Get all categories (for product form)
app.get('/api/admin/categories', authenticateAdmin, async (req, res) => {
    try {
        const [categories] = await pool.execute('SELECT * FROM categories');
        res.json(categories);
    } catch (error) {
        console.error('Admin get categories error:', error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
});

// Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Admin middleware
async function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        jwt.verify(token, jwtSecret, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            // Проверка прав администратора
            const [users] = await pool.execute(
                'SELECT is_admin FROM users WHERE id = ?',
                [user.userId]
            );

            if (users.length === 0 || !users[0].is_admin) {
                return res.status(403).json({ error: 'Admin access required' });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Admin auth error:', error);
        res.status(500).json({ error: 'Error authenticating admin' });
    }
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});