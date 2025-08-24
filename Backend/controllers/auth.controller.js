const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp =async (req , res)=>{
 const {nom , prenom, email , password, adresse, telephone} = req.body;
  try {
     const user = await userModel.create({nom,prenom,email,password,adresse,telephone});
    res.status(201).json({user : user._id})

  }catch(err){
    console.error('Erreur lors de la création de l\'utilisateur:', err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
  }
};
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id , role: user.role,token: token})
  } catch (err){
    console.error('Erreur lors de la connexion:', err);
    res.status(200).json({ errors });
  }
};
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}