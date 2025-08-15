const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  produits: [
    {
      produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantite: {
        type: Number,
        required: true,
        min: 1
      },
      prix: {
        type: Number,
        required: true
      }
    }
  ],
  montantTotal: {
    type: Number,
    required: true
  },
  adresseLivraison: {
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: String, required: true },
    pays: { type: String, required: true }
  },
  statutCommande: {
    type: String,
    enum: ['en attente', 'en préparation', 'expédiée', 'livrée', 'annulée'],
    default: 'en attente'
  },
  dateCommande: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
