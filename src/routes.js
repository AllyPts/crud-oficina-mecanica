const { Router } = require("express");
const FuncionarioController = require("./controllers/FuncionarioController");

const routes = Router();

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.post('/funcionarios', FuncionarioController.criar);
routes.get('/funcionarios', FuncionarioController.listar);
routes.get('/funcionarios/:id', FuncionarioController.buscarPorId);
routes.put('/funcionarios/:id', FuncionarioController.atualizar);
routes.delete('/funcionarios/:id', FuncionarioController.deletar);

module.exports = routes;
