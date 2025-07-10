const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  console.log('=== AUTHENTICATION DEBUG ===');
  console.log('Auth header:', req.headers.authorization);
  
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Extracted token:', token);
  console.log('Token length:', token?.length);
  
  if (!token) {
    console.log('❌ No token - 401');
    return res.status(401).json({ error: 'No token provided' });
  }
  
  console.log('🔍 Attempting to verify token...');
  console.log('JWT Secret being used:', 'secret'); // Make sure this matches!
  
  jwt.verify(token, 'secret', (err, user) => {
    if (err) {
      console.log('❌ JWT verification failed!');
      console.log('Error name:', err.name);
      console.log('Error message:', err.message);
      console.log('Full error:', err);
      
      // More specific error handling
      if (err.name === 'TokenExpiredError') {
        console.log('⏰ Token has expired');
        return res.status(401).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        console.log('🔒 Invalid token structure');
        return res.status(401).json({ error: 'Invalid token' });
      } else if (err.name === 'NotBeforeError') {
        console.log('⏰ Token not active yet');
        return res.status(401).json({ error: 'Token not active' });
      }
      
      return res.status(403).json({ error: 'Token verification failed', details: err.message });
    }
    
    console.log('✅ JWT verified successfully:', user);
    req.user = user;
    next();
  });
}

// Test function to generate a valid token
function generateTestToken() {
  const testPayload = {
    id: 1,
    email: 'test@example.com',
    role: 'user'
  };
  
  const token = jwt.sign(testPayload, 'secret', { expiresIn: '24h' });
  console.log('Generated test token:', token);
  return token;
}

function authorizeRole(role) {
  return (req, res, next) => {
    console.log('=== ROLE AUTHORIZATION ===');
    console.log('Required role:', role);
    console.log('User role:', req.user?.role);
    
    if (req.user.role !== role) {
      console.log('❌ Role mismatch - 403');
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    console.log('✅ Role authorized');
    next();
  };
}

module.exports = { authenticate, authorizeRole, generateTestToken };