const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();     // Charge les variables d'environnement
connectDB();         // Connexion à MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
console.log('📍 Registering routes...');
app.use('/api/auth', require('./routes/authRoutes'));
console.log('   ✅ /api/auth loaded');

app.use('/api/station', require('./routes/stationRoutes'));
console.log('   ✅ /api/station loaded');

app.use('/api/transmission', require('./routes/transmissionRoutes'));
console.log('   ✅ /api/transmission loaded');

app.use('/api/antenne', require('./routes/antenneRoutes'));
console.log('   ✅ /api/antenne loaded');

app.use('/api/derangement', require('./routes/derangementRoutes'));
console.log('   ✅ /api/derangement loaded');

app.use('/api/dashboard', require('./routes/dashboardRoutes'));
console.log('   ✅ /api/dashboard loaded');

console.log('📍 All routes registered successfully!');


// Route par défaut (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5273;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
