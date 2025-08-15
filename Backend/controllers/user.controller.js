const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.updateUser = async (req, res) => {
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

        const updateUser = await userModel.findOneAndUpdate(
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
module.exports.UserInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu ' + req.params.id);

    try {
        const docs = await userModel.findById(req.params.id).select('-password');
        if (docs) {
            res.send(docs);
        } else {
            console.log('ID inconnu');
        }
    } catch (err) {
        console.log(err);
    }
};
module.exports.deleteUser = async (req , res) =>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu ' + req.params.id);

 try{
    await userModel.deleteOne({_id : req.params.id}).exec();
    res.status(200).json({message : "effacer avec succès"});
 }catch(err){
    return res.status(500).json({ message: err });
 }

}
module.exports.getAllUsers = async (req , res)=>{
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}