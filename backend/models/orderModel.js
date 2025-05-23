import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Sub-schema for order items
const orderItemSchema = new Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  },
  { _id: false }
);

// Sub-schema for shipping address
const shippingAddressSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

// Sub-schema for payment result
const paymentResultSchema = new Schema(
  {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  { _id: false }
);

// Main order schema
const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: { type: [orderItemSchema], required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: paymentResultSchema,

    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
