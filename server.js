import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import { models, syncDatabase } from './models/index.js'; // Your Sequelize models
import authRoutes from './api/authenticate/auth.js'; // Authentication routes
import transactionRoutes from './api/transactions/transactions.js'; // Transactions routes
import { authenticateToken } from './middleware/auth.js'; // Middleware for protected routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session and Flash Messages
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);
app.use(flash());

// Flash message middleware for global templates
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Basic public route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FinTech Banking API' });
});

// Protected Dashboard Route (if SSR is needed)
app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const transactions = await models.Transaction.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
    });
    res.json({ message: 'Dashboard data', transactions });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).json({ error: 'Error loading dashboard' });
  }
});

// Auth routes
app.use('/auth', authRoutes);

// Transactions API routes (protected)
app.use('/transactions', authenticateToken, transactionRoutes);

// User routes
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Account routes
app.get('/accounts', authenticateToken, async (req, res) => {
  try {
    const accounts = await models.Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accounts', error: error.message });
  }
});

// Transactions routes (unprotected sample for debugging)
app.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await models.Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server after syncing database
syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });
