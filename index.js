const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour analyser le corps des requêtes
app.use(express.urlencoded({ extended: true }));

// Import des routes
const photoRoutes = require('./routes/photoRoutes');

// Utilisation des routes
app.use('/photos', photoRoutes);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.render('index'); // Rendre le fichier views/index.ejs
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connexion à MongoDB (ajustez l'URI de connexion selon votre configuration)
mongoose.connect('mongodb://localhost:27017/phototheque', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

