import { Transaction } from '../../../../models/DatabaseCreation';

export async function PUT(req, res) {
  try {
    const { id } = req.query;
    const { userId, type, amount, description } = await req.json();

    if (!id || !userId) {
      return res.status(400).json({ error: 'Transaction ID and User ID are required' });
    }

    const transaction = await Transaction.findOne({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Update transaction details
    await transaction.update({ type, amount, description });

    return res.status(200).json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (err) {
    console.error('Error updating transaction:', err);
    return res.status(500).json({ error: 'Error updating transaction' });
  }
}

export async function DELETE(req, res) {
  try {
    const { id } = req.query;
    const { userId } = await req.json();

    if (!id || !userId) {
      return res.status(400).json({ error: 'Transaction ID and User ID are required' });
    }

    const transaction = await Transaction.findOne({
      where: { id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.destroy();

    return res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    return res.status(500).json({ error: 'Error deleting transaction' });
  }
}
