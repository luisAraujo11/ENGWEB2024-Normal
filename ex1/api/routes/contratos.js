var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos');

//  Get all Contratos and Get Contratos by query parameters (especie or imContratocao)
router.get('/', (req, res) => {
  const { entidade, tipo } = req.query;
  if (entidade) {
    console.log(entidade);
    Contrato.getContratosByEntidade(entidade)
      .then(Contratos => res.json(Contratos))
      .catch(err => res.status(400).json('Error: ' + err));
  } else if (tipo) {
    Contrato.getContratosByTipo(tipo)
      .then(Contratos => res.json(Contratos))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
    Contrato.getAllContratos()
      .then(Contratos => res.json(Contratos))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

// Get list of unique freguesias
router.get('/entidades', (req, res) => {
  Contrato.getEntidades()
    .then(entidades => res.json(entidades.sort()))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get list of unique espécies
router.get('/tipos', (req, res) => {
  Contrato.getTipos()
    .then(tipos => res.json(tipos.sort()))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Contrato by ID
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Contrato.findById(req.params.id)
    .then(Contrato => res.json(Contrato))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Post a new Contrato
router.post('/', (req, res) => {
  Contrato.addNewContrato(req.body)
    .then(() => res.json('Contrato added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a Contrato by ID
router.delete('/:id', (req, res) => {
  Contrato.deleteContratoById(req.params.id)
    .then(() => res.json('Contrato deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* Alterar um Contrato */
router.put('/:id', function(req, res) {
  Contrato.update(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });

module.exports = router;