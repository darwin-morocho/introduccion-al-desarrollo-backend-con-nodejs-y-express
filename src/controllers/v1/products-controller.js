const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;
    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('createProduct error:', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const deleteProduct = (req, res) => {};

const getProducs = async (req, res) => {
  try {
    const products = await Products.find({
      price: { $lt: 10 }
    })
      .select('title desc price')
      .populate('user', 'username email data role');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('deleteProduct error:', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

const getProducsByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('deleteProduct error:', e);
    res.status(500).send({ status: 'ERROR', data: e.message });
  }
};

module.exports = { createProduct, deleteProduct, getProducs, getProducsByUser };
