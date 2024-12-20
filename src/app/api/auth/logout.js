export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      res.setHeader('Set-Cookie', [
        'token=; Path=/; HttpOnly; Max-Age=0', // Clear the token
      ]);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Error logging out' });
    }
  }
  