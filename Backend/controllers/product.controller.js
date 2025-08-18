const productModel = require('../models/product.model');
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require("multer");
const path = require("path");

// Configuration Multer pour stocker les images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // dossier où stocker les images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// API de création d’un produit
const createProduct = async (req, res) => {
  const { nom, description, prix, categorie, stock, vendeur } = req.body;
  const images = req.file ? [req.file.path] : []; // tableau avec le chemin du fichier uploadé

  try {
    const product = await productModel.create({
      nom,
      description,
      prix,
      categorie,
      stock,
      images,
      vendeur,
    });
    res.status(201).json({ product: product._id });
  } catch (err) {
    console.error("Erreur lors de la création du produit:", err);
    res.status(500).json({ message: "Erreur lors de la création du produit" });
  }
};

// Export du module avec Multer pour l’utiliser dans tes routes
module.exports = {
  createProduct,
  upload, // tu peux utiliser upload.single("image") dans tes routes
};

module.exports.updateProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);
  try {
    const productData = {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      categorie: req.body.categorie,
      stock: req.body.stock,
      images: req.body.images,
      vendeur: req.body.vendeur
    };

    const id = req.params.id;

    const updateProduct = await productModel.findOneAndUpdate(
      { _id: id },
      { $set: productData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!updateProduct) {
      return res.status(404).send('Produit non trouvé');
    }

    return res.send(updateProduct);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports.getProductInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      console.log('ID inconnu');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnu ' + req.params.id);

  try {
    await productModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Produit effacé avec succès" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/* module.exports.getAllProducts = async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(products);
}; */


module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    // Corriger les chemins d'images
    const productsWithImages = products.map((prod) => ({
      ...prod._doc, // garde les autres champs
      images: prod.images.map((imgPath) => {
        // Remplace les backslashs par des slashs et supprime 'public/' si présent
        return imgPath.replace(/\\/g, "/").replace(/^public\//, "");
      }),
    }));

    res.status(200).json(productsWithImages);
  } catch (err) {
    console.error("Erreur lors de la récupération des produits :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};
