const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  categorie: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [
    {
      type: String // URL ou chemin local de l'image
    }
  ],
  vendeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // lien vers le vendeur
    required: true
  },
  dateAjout: {
    type: Date,
    default: Date.now
  },
  enPromotion: {
    type: Boolean,
    default: false
  },
  prixPromo: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
