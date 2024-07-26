import jwt from 'jsonwebtoken';
import pool from '../db.js';

const SECRET_KEY = 'your_secret_key'; // Cambia esto por una clave secreta real

export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ message: "No token provided" });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT r.name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
      [req.userId]
    );
    if (rows.length === 0 || rows[0].name !== 'admin') {
      return res.status(403).json({ message: "Require Admin Role!" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error checking user role" });
  }
};