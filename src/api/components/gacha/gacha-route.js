const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/roll', gachaController.gachakikir);
  route.get('/history', gachaController.riwayat);
  route.get('/prizes', gachaController.sisakuota);
  route.get('/winners', gachaController.daftarwin);
};
