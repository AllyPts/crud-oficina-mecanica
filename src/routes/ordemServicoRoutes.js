const express = require("express");

const router = express.Router();

const ordemServicoController = require("../controllers/ordemServicoController");

router.get("/", ordemServicoController.listar);

router.get("/:id", ordemServicoController.buscarPorId);

router.post("/", ordemServicoController.criar);

router.put("/:id", ordemServicoController.atualizar);

router.delete("/:id", ordemServicoController.deletar);

module.exports = router;
