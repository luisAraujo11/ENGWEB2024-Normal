const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contratoSchema = new Schema({
  _id: String,  // Transform 'idcontrato' to '_id'
  nAnuncio: String,  // Presumably a string, if not, adjust accordingly
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: String,  // This could be Date if the field contains valid date formats
  dataCelebracaoContrato: String,  // This could be Date if the field contains valid date formats
  precoContratual: String,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: String,  // Assuming NIPC might include non-numeric characters
  entidade_comunicante: String,
  fundamentacao: String
}, {
  versionKey: false,  // Disables the versioning field "__v"
});

const Contrato = mongoose.model('contratos', contratoSchema);

module.exports = Contrato;
