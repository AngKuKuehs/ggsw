import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// --- Utilities ---

const handleError = (res, error, status = 500) => {
  res.status(status).json({ error: error.message });
};

const calcPrices = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = +(itemsPrice * taxRate).toFixed(2);
  const totalPrice = +(itemsPrice).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

// --- Controllers ---

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    await Order.deleteMany({ user: req.user._id, isPaid: false });

    if (!orderItems?.length) {
      return handleError(res, new Error("No order items"), 400);
    }

    const productIds = orderItems.map((item) => item._id);
    const products = await Product.find({ _id: { $in: productIds } });

    const dbOrderItems = orderItems.map((clientItem) => {
      const dbItem = products.find(
        (p) => p._id.toString() === clientItem._id
      );

      if (!dbItem) {
        throw new Error(`Product not found: ${clientItem._id}`);
      }

      return {
        name: clientItem.name,
        qty: clientItem.qty,
        image: clientItem.image,
        price: dbItem.price,
        product: dbItem._id,
      };
    });

    const prices = calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      ...prices,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    handleError(res, error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    handleError(res, error);
  }
};

const countTotalOrders = async (_req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    handleError(res, error);
  }
};

const calculateTotalSales = async (_req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + +order.totalPrice, 0);
    res.json({ totalSales: totalSales.toFixed(2) });
  } catch (error) {
    handleError(res, error);
  }
};

const calculateTotalSalesByDate = async (_req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (error) {
    handleError(res, error);
  }
};

const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "username email");

    if (!order) {
      return handleError(res, new Error("Order not found"), 404);
    }

    res.json(order);
  } catch (error) {
    handleError(res, error);
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return handleError(res, new Error("Order not found"), 404);
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return handleError(res, new Error("Order not found"), 404);
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    handleError(res, error);
  }
};

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
