const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');

// Route pour afficher toutes les photos
router.get('/', photoController.getAllPhotos);

// Route pour afficher le formulaire d'ajout de photo
router.get('/add', (req, res) => {
    res.render('addPhoto');
});

// Route pour gérer l'ajout de photo
router.post('/add', photoController.upload.single('photo'), photoController.addPhoto);

// Route pour afficher le formulaire de modification d'une photo
router.get('/edit/:id', photoController.getPhotoById);

// Route pour mettre à jour une photo
router.post('/edit/:id', photoController.upload.single('photo'), photoController.updatePhoto);

// Route pour supprimer une photo
router.delete('/:id', photoController.deletePhoto);

module.exports = router;


