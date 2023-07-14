import express from 'express';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';
import ProductImage from '../models/productImages.model.js';
import cloudinary from '../controllers/cloudinary.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer();

const productRouter = express.Router();

// Create a product
productRouter.post('/', upload.single('image'), async (req, res) => {
	try {
		const { productName, description, price } = req.body;
		const imageFile = req.file;

		if (!imageFile) {
			return res.status(400).json({ message: 'No image file provided' });
		}

		// Save the file temporarily to the file system
		const tempFilePath = `./uploads/${imageFile.originalname}`;
		fs.writeFileSync(tempFilePath, imageFile.buffer);

		const result = await cloudinary.uploader.upload(tempFilePath, {
			folder: 'product-images',
			transformation: [
				{ width: 800, height: 600, crop: 'fill' },
				// Additional transformations can be added here if needed
			],
		});

		// Delete the temporary file after uploading it to Cloudinary
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

// Get all products
productRouter.get('/', async (req, res) => {
	try {
		const products = await Product.findAll();
		if (products.length > 0) {
			return res.status(200).json(products);
		} else return res.status(404).json({ message: 'Products not found' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving products' });
	}
});

// Get a product by its ID
productRouter.get('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving product' });
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
			const tempFilePath = `./uploads/${imageFile.originalname}`;
			fs.writeFileSync(tempFilePath, imageFile.buffer);

			const result = await cloudinary.uploader.upload(tempFilePath, {
				folder: 'product-images',
				transformation: [
					{ width: 800, height: 600, crop: 'fill' },
					// Additional transformations can be added here if needed
				],
			});

			fs.unlinkSync(tempFilePath);

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

// Delete a product (delete the associated inventory and product images first)
productRouter.delete('/:productID', async (req, res) => {
	try {
		const productID = req.params.productID;
		const product = await Product.findByPk(productID);

		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		await ProductImage.destroy({ where: { productID } });
		await Inventory.destroy({ where: { productID } });
		await product.destroy();

		res.status(200).json({ message: 'Product deleted' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error deleting product' });
	}
});

export default productRouter;
