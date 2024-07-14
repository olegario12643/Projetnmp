const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
