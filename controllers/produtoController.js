const Produto = require('../models/produto');

exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;
    const produto = await Produto.create({ nome, descricao, preco, estoque });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buscarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.produtoId);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.produtoId);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    const { nome, descricao, preco, estoque } = req.body;
    await produto.update({ nome, descricao, preco, estoque });
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.produtoId);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    await produto.destroy();
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
