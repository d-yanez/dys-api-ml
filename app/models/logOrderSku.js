const mongoose = require('mongoose');

// Definir el esquema
const logOrderSkuSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  order: { type: String, required: true },
});

// Crear el modelo
const LogOrderSku = mongoose.model('LogOrderSku', logOrderSkuSchema);

module.exports = LogOrderSku;
