const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
  adresse: {
    rue: { type: String, trim: true },
    ville: { type: String, trim: true },
    codePostal: { type: String, trim: true },
    pays: { type: String, trim: true }
  },
  telephone: {
    type: String,
    trim: true
  },
  picture: {
      type: String,
      default: "/profil/myprofil.jpg"
    },
  role: {
    type: String,
    enum: ['client', 'admin','employe'],
    default: 'client'
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});
// Hash du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode de connexion
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Mot de passe incorrect');
  }
  throw Error('Email incorrect');
};
module.exports = mongoose.model('User', userSchema);
