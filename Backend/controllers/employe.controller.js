const employeModel = require('../models/employe.model');


const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.EMPLYE_TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signInEmploye = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employe = await employeModel.findOne({ email });
    if (employe) {
      const isPasswordCorrect = await employe.comparePassword(password);
      if (isPasswordCorrect) {
        const token = createToken(employe._id);
        res.cookie('employe_jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: employe._id });
      } else {
        res.status(401).json({ error: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports.createEmploye =async (req , res)=>{
 const {nom , prenom, email , password, adresse,role, telephone} = req.body;
  try {
     const user = await employeModel.create({nom,prenom,email,password,adresse,role,telephone});
    res.status(201).json({user : user._id})

  }catch(err){
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};

module.exports.ClientInfo = async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu ' + req.params.id);

    try {
        const docs = await employeModel.findById(req.params.id).select('-password');
        if (docs) {
            res.send(docs);
        } else {
            console.log('ID inconnu');
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports.updateClient = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu ' + req.params.id);
    try {
        const userData = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: req.body.password,
            telephone: req.body.telephone,
            adresse: req.body.adresse,

            // Ajoutez d'autres champs facultatifs ici si nécessaire
        };

        const id = req.params.id;

        const updateUser = await employeModel.findOneAndUpdate(
            { _id: id },
            { $set: userData }, // Utilisation de $set pour mettre à jour uniquement les champs spécifiés
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).select('-password');

        if (!updateUser) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        return res.send(updateUser);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
module.exports.getAllClients = async (req, res) => {
    const users = await employeModel.find().select('-password');
    res.status(200).json(users);
}
