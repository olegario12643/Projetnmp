const Album = require('../models/albumModel');
const Photo = require('../models/photoModel');

const albumController = {
  // Récupérer tous les albums
  getAllAlbums: async (req, res) => {
    try {
      const albums = await Album.find().populate('photos');
      res.json(albums);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Créer un nouvel album
  createAlbum: async (req, res) => {
    const { name, description } = req.body;
    try {
      const newAlbum = new Album({ name, description });
      await newAlbum.save();
      res.status(201).json(newAlbum);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Récupérer un album spécifique par son ID
  getAlbumById: async (req, res) => {
    const albumId = req.params.id;
    try {
      const album = await Album.findById(albumId).populate('photos');
      if (!album) {
        return res.status(404).json({ message: 'Album not found' });
      }
      res.json(album);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Ajouter une photo à un album
  addPhotoToAlbum: async (req, res) => {
    const albumId = req.params.id;
    const { photoId } = req.body;
    try {
      const album = await Album.findById(albumId);
      if (!album) {
        return res.status(404).json({ message: 'Album not found' });
      }
      // Ajouter la photo à l'album
      album.photos.push(photoId);
      await album.save();
      res.json(album);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Supprimer un album
  deleteAlbum: async (req, res) => {
    const albumId = req.params.id;
    try {
      const deletedAlbum = await Album.findByIdAndDelete(albumId);
      if (!deletedAlbum) {
        return res.status(404).json({ message: 'Album not found' });
      }
      res.json({ message: 'Album deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = albumController;
