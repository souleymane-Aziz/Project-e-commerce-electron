const orderModel = require('../models/order.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.createOrder = async (req, res) => {
  const { utilisateur, produits, montantTotal, adresseLivraison } = req.body;

  try {
    const order = await orderModel.create({
      utilisateur,
      produits,
      montantTotal,
      adresseLivraison
    });
    res.status(201).json({ order: order._id });
  } catch (err) {
    console.error('Erreur lors de la création de la commande:', err);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

module.exports.updateOrder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const orderData = {
      utilisateur: req.body.utilisateur,
      produits: req.body.produits,
      montantTotal: req.body.montantTotal,
      adresseLivraison: req.body.adresseLivraison
    };

    const id = req.params.id;

    const updateOrder = await orderModel.findOneAndUpdate(
      { _id: id },
      { $set: orderData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!updateOrder) {
      return res.status(404).send('Commande non trouvée');
    }

    return res.send(updateOrder);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports.getOrderInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      console.log('ID inconnu');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteOrder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    await orderModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Commande effacée avec succès" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.getAllOrders = async (req, res) => {
  const orders = await orderModel.find();
  res.status(200).json(orders);
};
module.exports.getUserOrders = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const orders = await orderModel.find({ utilisateur: req.params.id });
    if (orders.length > 0) {
      res.send(orders);
    } else {
      res.status(404).send('Aucune commande trouvée pour cet utilisateur');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};