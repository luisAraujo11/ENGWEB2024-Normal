var express = require('express');
var router = express.Router();
var axios = require('axios')

var d = new Date().toISOString().substring(0, 16)

/* ---------- GET ----------*/

/* Contratos home page */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:16000/contratos')
    .then(resposta => {
      console.log(resposta.data)
      res.render('index', {contratos : resposta.data, data: d, titulo: "Lista de Contratos"})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os contratos"})
    })
});

/* Contratos GET by ID */
router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:16000/contratos/' + req.params.id)
    .then(resposta => {
      console.log(resposta.data)
      res.render('contrato', {contrato : resposta.data, data: d, titulo: "Contrato " })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao recuperar os contratos"})
    })
});

/* endidades GET by Name or ID */
router.get('/entidades/:id', function(req, res, next) {
  axios.get('http://localhost:16000/contratos?entidade=' + req.params.id)
    .then(response => {
      console.log(response.data);
      const entidade = response.data;

      // Calcular o total dos valores dos contratos
      const totalValor = entidade.reduce((sum, contrato) => sum + parseFloat(contrato.precoContratual.replace(',', '.')), 0);

      res.render('nipc', {  
        nipc: req.params.id,
        entidadeNome: entidade[0].NIPC_entidade_comunicante, 
        contratos: entidade, 
        totalValor: totalValor,  // Formatado para duas casas decimais
        titulo: "Detalhe da Entidade " + req.params.id
      });
    })
    .catch(error => {
      res.render('error', { error: error, message: "Erro ao recuperar detalhes da entidade" });
    });
});

module.exports = router;