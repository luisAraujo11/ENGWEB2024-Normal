
const mongoose = require("mongoose");
const Contrato = require('../models/contratos'); // Adjust the path as necessary

module.exports.getAllContratos = () => Contrato.find();

module.exports.findById = id => {
  return Contrato
      .findOne({_id : id}) // Finds a single document by its MongoDB ObjectID
      .exec(); // Executes the query
};

module.exports.getContratosByEntidade = (entidade) => Contrato.find({ "entidade_comunicante": entidade });

module.exports.getContratosByTipo = (tipo) => Contrato.find({ "tipoprocedimento": tipo });

module.exports.getEntidades = () => {
  return Contrato.distinct("entidade_comunicante").then(entidades => {
      return entidades.sort();  // Ordena alfabeticamente
  });
};

module.exports.getTipos = () => {
  return Contrato.distinct("tipoprocedimento").then(entidades => {
      return entidades.sort();  // Ordena alfabeticamente
  });
};

module.exports.addNewContrato = (ContratoData) => new Contrato(ContratoData).save();

module.exports.deleteContratoById = (id) => Contrato.findByIdAndDelete(id);

module.exports.update = (id, body) => {
  return Contrato
      .findByIdAndUpdate(id, body, {new : true})
}
