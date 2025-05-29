const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const partidaRoutes = require('./routes/partida');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/partidas', partidaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
