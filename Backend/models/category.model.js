const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String, // URL de l'image de la catégorie
      default: ""
    },
    dateCreation: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model("Category", categorySchema);
