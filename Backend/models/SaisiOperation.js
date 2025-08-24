const mongoose = require("mongoose");

const SaisieOperationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["vente", "achat","depense"], // exemple, tu peux adapter selon ton app
    default: "",
  },
  montant: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split("T")[0], // format YYYY-MM-DD
  },
}, { timestamps: true }); // ajoute createdAt et updatedAt automatiquement

module.exports = mongoose.model("SaisieOperation", SaisieOperationSchema);
