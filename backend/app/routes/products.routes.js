import express from 'express';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';
import ProductImage from '../models/productImages.model.js';
import cloudinary from '../controllers/cloudinary.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer();

const productRouter = express.Router();
productRouter.post('/', upload.single('image'), async (req, res) => {
	try {
		const { productName, description, price } = req.body;
		const imageFile = req.file;

		if (!imageFile) {
			return res.status(400).json({ message: 'No image file provided' });
		}

		// Guardar el archivo temporalmente en el sistema de archivos
		const tempFilePath = `./uploads/${imageFile.originalname}`;
		fs.writeFileSync(tempFilePath, imageFile.buffer);

		const result = await cloudinary.uploader.upload(tempFilePath, {
			folder: 'product-images',
			transformation: [
				{ width: 800, height: 600, crop: 'fill' },
				// Additional transformations can be added here if needed
			],
		});

		// Eliminar el archivo temporal después de cargarlo en Cloudinary
		fs.unlinkSync(tempFilePath);

		const imageURL = result.secure_url;

		// Create a new Product record in the database
		const product = await Product.create({
			productName,
			description,
			price,
		});
		
		// Create a new ProductImage record in the database
		await ProductImage.create({
			productID: product.productID,
			isFront: 1, // Assuming it's the front image
			imageURL,
		});

		// Create a new Inventory record in the database
		await Inventory.create({
			productID: product.productID,
			quantity: 1,
			stockMin: 0,
			stockMax: 200,
		});
		res.status(201).json({ message: 'Product created', product });
	} catch (error) {
		console.log('Error creating product:', error);
		res.status(500).json({ message: 'Error creating product' });
		res.end(); // Add this line to end the response in case of an error
	}
});

// Obtener todos los productos
productRouter.get('/', async (req, res) => {
	try {
		const products = await Product.findAll();
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error al obtener los productos' });
	}
});

// Obtener un producto por su ID
productRouter.get('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Producto no encontrado' });
		}

		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error al obtener el producto' });
	}
});

// Update a product
productRouter.put('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const { productName, description, price } = req.body;
		const imageFile = req.file; // Assuming the file field in the request is named 'image'

		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// If an image file is uploaded, update the image in Cloudinary and save the new imageURL
		if (imageFile) {
			cloudinary.uploader.upload(
				imageFile.path,
				{ folder: 'product-images' },
				async (error, result) => {
					if (error) {
						console.log(error);
						return res.status(500).json({
							message: 'Error uploading image to Cloudinary',
						});
					}

					const imageURL = result.secure_url;

					await product.update({
						productName,
						description,
						price,
					});

					// Update the corresponding ProductImage record in the database
					await ProductImage.update(
						{ imageURL },
						{ where: { productID, isFront: 1 } }
					);

					res.status(200).json({
						message: 'Product updated',
						product,
					});
				}
			);
		} else {
			// If no image file is uploaded, update other product details without changing the imageURL
			await product.update({
				productName,
				description,
				price,
			});

			res.status(200).json({ message: 'Product updated', product });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error updating product' });
	}
});

// Eliminar un producto
productRouter.delete('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;

		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Producto no encontrado' });
		}

		await product.destroy();

		res.status(200).json({ message: 'Producto eliminado' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error al eliminar el producto' });
	}
});

export default productRouter;
