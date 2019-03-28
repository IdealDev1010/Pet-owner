const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "customer"
  },
  items: {
    type: Object,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  shipAddress: {
    type: Schema.Types.ObjectId,
    required: true
  },
  delivery: {
    type: String,
    default: "Pending"
  }
});

const validateOrder = {
  order: Joi.object().keys({
    _id: Joi.objectId(),
    customer: Joi.objectId(),
    items: Joi.object().required(),
    paymentId: Joi.string().required(),
    shipAddress: Joi.objectId().required()
  })
};

const Order = new mongoose.model("order", orderSchema);

exports.Order = Order;
exports.validateOrder = validateOrder;
