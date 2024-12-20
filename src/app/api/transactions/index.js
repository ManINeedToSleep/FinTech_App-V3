import { Transaction, Account } from '../../../../models/DatabaseCreation';

export async function GET(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const transactions = await Transaction.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ transactions });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    return res.status(500).json({ error: 'Error fetching transactions' });
  }
}

export async function POST(req, res) {
  try {
    const { userId, type, amount, description } = await req.json();

    if (!userId || !type || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user's account balance
    const account = await Account.findOne({
      where: { userId },
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found for user' });
    }

    // Check if withdrawal is possible
    if (type === 'withdraw' && parseFloat(amount) > parseFloat(account.balance)) {
      return res.status(400).json({ error: 'Insufficient balance for withdrawal' });
    }

    // Update account balance
    const updatedBalance =
      type === 'income'
        ? parseFloat(account.balance) + parseFloat(amount)
        : parseFloat(account.balance) - parseFloat(amount);

    await account.update({ balance: updatedBalance });

    // Create the transaction
    const newTransaction = await Transaction.create({
      type,
      amount: parseFloat(amount),
      description,
      userId,
    });

    return res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (err) {
    console.error('Error creating transaction:', err);
    return res.status(500).json({ error: 'Error creating transaction' });
  }
}
