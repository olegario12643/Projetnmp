const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// Route pour afficher tous les albums
router.get('/albums', albumController.getAllAlbums);

// Route pour créer un nouvel album
router.post('/albums', albumController.createAlbum);

// Route pour afficher un album spécifique
router.get('/albums/:id', albumController.getAlbumById);

// Route pour ajouter une photo à un album
router.put('/albums/:id/add-photo', albumController.addPhotoToAlbum);

// Route pour supprimer un album
router.delete('/albums/:id', albumController.deleteAlbum);

module.exports = router;
