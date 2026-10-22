const express = require('express');
const router = express.Router();
const { cadastrar } = require('../controllers/movimentacaoController');
const auth = require('../middlewares/auth');
router.post('/movimentacoes', auth, cadastrar);

module.exports = router;