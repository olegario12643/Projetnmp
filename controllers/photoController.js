const Photo = require('../models/photoModel');
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker les images téléchargées
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
    }
});

const upload = multer({ storage: storage });

// Exporter l'instance Multer
exports.upload = upload;

// Contrôleur pour afficher toutes les photos
exports.getAllPhotos = (req, res) => {
    Photo.find({}, (err, photos) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.render('photos', { photos: photos });
        }
    });
};

// Contrôleur pour ajouter une nouvelle photo
exports.addPhoto = (req, res) => {
    const newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        imagePath: '/uploads/' + req.file.filename // Chemin de l'image téléchargée
    });

    newPhoto.save(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.redirect('/photos');
        }
    });
};

// Contrôleur pour afficher le formulaire de modification d'une photo
exports.getPhotoById = (req, res) => {
    Photo.findById(req.params.id, (err, photo) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.render('editPhoto', { photo: photo });
        }
    });
};

// Contrôleur pour mettre à jour une photo
exports.updatePhoto = (req, res) => {
    const updatedData = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    };
    if (req.file) {
        updatedData.imagePath = '/uploads/' + req.file.filename;
    }

    Photo.findByIdAndUpdate(req.params.id, updatedData, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.redirect('/photos');
        }
    });
};

// Contrôleur pour supprimer une photo
exports.deletePhoto = (req, res) => {
    Photo.findByIdAndDelete(req.params.id, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.redirect('/photos');
        }
    });
};
