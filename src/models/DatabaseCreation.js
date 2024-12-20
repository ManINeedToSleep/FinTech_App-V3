import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ensure sequelize instance is configured

// Model Definitions
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    accountType: {
        type: DataTypes.ENUM('checking', 'savings'),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
});

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('deposit', 'withdrawal', 'transfer'),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    fromAccountId: {
        type: DataTypes.UUID,
    },
    toAccountId: {
        type: DataTypes.UUID,
    },
});

// Define Relationships
User.hasMany(Account, { foreignKey: 'userId', as: 'accounts' });
Account.belongsTo(User, { foreignKey: 'userId' });

Account.hasMany(Transaction, {
    foreignKey: 'fromAccountId',
    as: 'outgoingTransactions',
});
Account.hasMany(Transaction, {
    foreignKey: 'toAccountId',
    as: 'incomingTransactions',
});

Transaction.belongsTo(Account, {
    foreignKey: 'fromAccountId',
    as: 'fromAccount',
});
Transaction.belongsTo(Account, {
    foreignKey: 'toAccountId',
    as: 'toAccount',
});

// Create Database Function
const createDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync models and create tables
        await sequelize.sync({ force: false }); // Use force: true to reset tables
        console.log('Database and tables synchronized');

        // Insert sample data if necessary
        // await insertSampleData();
    } catch (error) {
        console.error('Unable to initialize database:', error);
    }
};

// // Optional: Insert Sample Data
// const insertSampleData = async () => {
//     // Add your sample data logic here
//     const user = await User.create({
//         username: 'johndoe',
//         email: 'john@example.com',
//         password: 'hashedpassword',
//     });
//     const account = await Account.create({
//         userId: user.id,
//         accountType: 'checking',
//         balance: 1000,
//     });
//     await Transaction.create({
//         amount: 500,
//         type: 'deposit',
//         toAccountId: account.id,
//         description: 'Initial deposit',
//     });
// };

// Export All
export { createDatabase, User, Account, Transaction };
