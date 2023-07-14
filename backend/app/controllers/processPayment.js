import Stripe from 'stripe';
import dotenv from 'dotenv';
import Product from '../models/product.models.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controlador para abrir un enlace de pago con Stripe
const openStripePaymentLink = async (carts, totalPrice, userID, shippingAddress) => {
	const products = [];

	for (const cart of carts) {
		const product = await Product.findOne({
			where: { productID: cart.productID },
		});

		products.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: product.productName,
					description: product.description,
				},
				unit_amount: Math.round(product.price * 100),
			},
			quantity: cart.quantity,
		});
	}

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: products,
			mode: 'payment',
			success_url: `http://nike-fake-store.onrender.com/api/payment/success?userID=${userID}&totalPrice=${totalPrice}&shippingAddress=${shippingAddress}`,
			cancel_url: 'http://nike-fake-store.onrender.com/api/payment/cancel',
		});

		return { url: session.url };
	} catch (error) {
		console.log(error);
		return { success: false, error: 'Error al abrir el enlace de pago' };
	}
};

export { openStripePaymentLink };
