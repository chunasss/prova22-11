const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

exports.criarPedido = async (req, res) => {
  try {
    const { clienteId, itens } = req.body;
    let total = 0;
    
    for (const item of itens) {
      const produto = await Produto.findByPk(item.produtoId);
      if (!produto || produto.estoque < item.quantidade) {
        return res.status(400).json({ error: 'Produto não disponível em estoque' });
      }
      total += produto.preco * item.quantidade;
    }

    const pedido = await Pedido.create({ clienteId, status: 'em andamento', dataPedido: new Date() });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.atualizarStatusPedido = async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findByPk(req.params.pedidoId);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    await pedido.update({ status });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
