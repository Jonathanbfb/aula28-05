const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { vencedorId, perdedorId, empate, jogadas } = req.body;
  try {
    const partida = await prisma.partida.create({
      data: {
        vencedorId: empate ? null : vencedorId,
        perdedorId: empate ? null : perdedorId,
        empate,
        jogadas,
      },
    });
    res.json(partida);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar partida', detail: error });
  }
});

router.get('/', async (req, res) => {
  try {
    const partidas = await prisma.partida.findMany({
      include: {
        vencedor: true,
        perdedor: true,
      },
    });
    res.json(partidas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar partidas' });
  }
});

module.exports = router;
