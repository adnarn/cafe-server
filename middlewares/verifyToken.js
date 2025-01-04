const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../config/jwtConfig');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User associated with token not found' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Authentication token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Authentication token is invalid' });
    } else {
      res.status(500).json({ message: 'An error occurred during authentication' });
    }
  }
};

module.exports = authenticate;
