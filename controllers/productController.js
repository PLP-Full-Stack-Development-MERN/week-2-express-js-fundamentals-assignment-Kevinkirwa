let products = []; // In-memory storage

exports.getProducts = (req, res) => {
  res.json({ success: true, data: products });
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
};

exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
};

exports.updateProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id == req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  products[productIndex] = { id: Number(req.params.id), ...req.body };
  res.json({ success: true, data: products[productIndex] });
};

exports.deleteProduct = (req, res) => {
  const productIndex = products.findIndex(p => p.id == req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const removedProduct = products.splice(productIndex, 1);
  res.json({ success: true, data: removedProduct });
};
