const SaisieOperation = require('../models/SaisiOperation');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.createOperation = async (req, res) => {
    const { type, montant, description, date } = req.body;

    try {
        const newOperation = new SaisieOperation({
            type,
            montant,
            description,
            date
        });

        await newOperation.save();
        res.status(201).json(newOperation);
    } catch (error) {
        console.error("Erreur lors de la création de l'opération:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
}
module.exports.updateOperation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);
  try {
    const productData = {
      type: req.body.type,
      montant: req.body.montant,
      description: req.body.description,
      date: req.body.date

    };

    const id = req.params.id;

    const updateProduct = await SaisieOperation.findOneAndUpdate(
      { _id: id },
      { $set: productData },
      { new: true, upsert: false, setDefaultsOnInsert: true }
    );

    if (!updateProduct) {
      return res.status(404).send('Operation non trouvée');
    }

    return res.send(updateProduct);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports.getAllOperation = async (req, res) => {
    const users = await SaisieOperation.find().select('-password');
    res.status(200).json(users);
}