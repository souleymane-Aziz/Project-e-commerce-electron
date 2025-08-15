const categoryModel = require('../models/category.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.createCategory = async (req, res) => {
  const { nom, description, image } = req.body;

  try {
    const category = await categoryModel.create({
      nom,
      description,
      image
    });
    res.status(201).json({ category: category._id });
  } catch (err) {
    console.error('Erreur lors de la création de la catégorie:', err);
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
  }
}
module.exports.updateCategory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const categoryData = {
      nom: req.body.nom,
      description: req.body.description,
      image: req.body.image
    };

    const id = req.params.id;

    const updateCategory = await categoryModel.findOneAndUpdate(
      { _id: id },
      { $set: categoryData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!updateCategory) {
      return res.status(404).send('Catégorie non trouvée');
    }

    return res.send(updateCategory);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports.getCategoryInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const category = await categoryModel.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      console.log('ID inconnu');
      res.status(404).send('Catégorie non trouvée');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération de la catégorie:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie' });
  }
};
module.exports.deleteCategory = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.send({ message: 'Catégorie supprimée avec succès' });
    } else {
      res.status(404).send('Catégorie non trouvée');
    }
  } catch (err) {
    console.error('Erreur lors de la suppression de la catégorie:', err);
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
  }
};
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.send(categories);
  } catch (err) {
    console.error('Erreur lors de la récupération des catégories:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
};
