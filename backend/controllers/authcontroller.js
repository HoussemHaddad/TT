import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// ➕ Inscription
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà inscrit' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    // Token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error('Erreur d\'inscription :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 🔐 Connexion
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cherche l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifie le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génère le token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error('Erreur de connexion :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
