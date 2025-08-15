const AdminModel = require('../models/admin.model');
const userModel = require('../models/user.model');

const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signInAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      const isPasswordCorrect = await admin.comparePassword(password);
      if (isPasswordCorrect) {
        const token = createToken(admin._id);
        res.cookie('admin_jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: admin._id });
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

module.exports.logoutAdmin = (req, res) => {
  res.cookie('admin_jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports.createAdmin =async (req , res)=>{
 const {nom , prenom, email , password, adresse,role, telephone} = req.body;
  try {
     const user = await userModel.create({nom,prenom,email,password,adresse,role,telephone});
    res.status(201).json({user : user._id})

  }catch(err){
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};



