import express from 'express';
import ProductImage from '../models/productImages.model.js';
import cloudinary from '../controllers/cloudinary.js';
import multer from 'multer';
import fs from 'fs';

const upload = multer();

const productImageRouter = express.Router();

productImageRouter.get('/', async (req, res) => {
	try {
		const productImages = await ProductImage.findAll();
		if (productImages.length > 0) {
			return res.status(200).json(productImages);
		} else return res.status(404).json({ message: 'Product images not found' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

productImageRouter.get('/:productID', async (req, res) => {
	try {
		const productImages = await ProductImage.findAll({
			where: {
				productID: req.params.productID,
			},
		});
        if (productImages.length > 0) {
            return res.status(200).json(productImages);
        } else return res.status(404).json({ message: 'Product images not found' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

productImageRouter.post('/add/:productID', upload.single('image'), async (req, res) => {
    try {
        const { productID } = req.params;
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
        // Create a new ProductImage record in the database
        await ProductImage.create({
            productID,
            isFront: 0, // Assuming it's the front image
            imageURL,
        });
        res.status(201).json({ message: 'Product image created' });
    } catch (error) {
        console.log('Error creating product image:', error);
        res.status(500).json({ message: 'Error creating product image' });
        res.end(); // Add this line to end the response in case of an error
    }
});

// Delete a product image
productImageRouter.delete('/:productImageID', async (req, res) => {
    try {
        const { productImageID } = req.params;
        const productImage = await ProductImage.findByPk(productImageID);
        if (productImage) {
            await productImage.destroy();
            return res.status(200).json({ message: 'Product image deleted' });
        } else return res.status(404).json({ message: 'Product image not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default productImageRouter;
