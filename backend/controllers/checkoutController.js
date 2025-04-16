import asyncHandler from "../middlewares/asyncHandler.js";
import Stripe from "stripe";
import Order from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutCart = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ error: `${orderId}` });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'sgd',
                    product_data: {
                        name: `Order #${order._id}`,
                    },
                    unit_amount: Math.round((order.totalPrice + 3.5)*100),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/order-success?orderId=${order._id}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    res.json({ url: session.url });
})

export { checkoutCart };
