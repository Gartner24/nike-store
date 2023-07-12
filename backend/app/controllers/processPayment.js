// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// import Product from '../models/product.models.js';

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Controlador para abrir un enlace de pago con Stripe
// const openStripePaymentLink = async (carts) => {
// 	const products = [];

// 	for (const cart of carts) {
// 	  const product = await Product.findOne({
// 		where: { productID: cart.productID }
// 	  });

// 	  products.push({
// 		price_data: {
// 		  currency: 'usd',
// 		  product_data: {
// 			name: product.productName,
// 			description: product.description
// 		  },
// 		  unit_amount: Math.round(product.price * 10)
// 		},
// 		quantity: cart.quantity
// 	  });
// 	}

//   return new Promise((resolve, reject) => {
//     stripe.checkout.sessions
//       .create({
//         payment_method_types: ['card'],
//         line_items: products,
//         mode: 'payment',
//         success_url: 'http://localhost:8080/success',
//         cancel_url: 'http://localhost:8080/cancel'
//       })
// 	  // Capturar el valor despues del pago
// 	  .then((session) => {
// 		resolve({url: session.url});
//       })
//       .catch((error) => {
//         console.log(error);
//         reject({ success: false, error: 'Error al abrir el enlace de pago' });
//       });
//   });

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: products,
//       mode: 'payment',
//       success_url: 'http://localhost:3000/success',
//       cancel_url: 'http://localhost:3000/cancel'
//     });

//     return { url: session.url };
//   } catch (error) {
//     console.log(error);
//     return { success: false, error: 'Error al abrir el enlace de pago' };
//   }

//   };

//   export { openStripePaymentLink };

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
			success_url: `http://localhost:8080/api/success?userID=${userID}&totalPrice=${totalPrice}&shippingAddress=${shippingAddress}`,
			cancel_url: 'http://localhost:8080/api/cancel',
		});

		return { url: session.url };
	} catch (error) {
		console.log(error);
		return { success: false, error: 'Error al abrir el enlace de pago' };
	}
};

export { openStripePaymentLink };
