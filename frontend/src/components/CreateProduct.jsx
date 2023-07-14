import React, { useState } from 'react';
import postData from '../helpers/postData';
import { urlImages, urlProducts } from '../helpers/urls';
import axios from 'axios';

const CreateProduct = () => {
	const [product, setProduct] = useState({
		productName: '',
		description: '',
		price: '',
	});

	const [mainImage, setMainImage] = useState(null);
	const [secondaryImages, setSecondaryImages] = useState([]);

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	const handleMainImageChange = (e) => {
		const file = e.target.files[0];
		setMainImage(file);
	};

	const handleSecondaryImagesChange = (e) => {
		const files = Array.from(e.target.files);

		if (files.length < 2) {
			// Display an error message or handle the validation error
			// You can prevent further processing if the minimum requirement is not met
			console.log('Select at least 2 files');
			return;
		}

		setSecondaryImages(files);
	};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!mainImage) {
    console.log('Select a main image');
    return;
  } else if (secondaryImages.length < 2) {
    console.log('Select at least 2 secondary images');
    return;
  } else if (secondaryImages.length > 5) {
    console.log('Select up to 5 secondary images');
    return;
  }
  // If all the requirements are met, form-data like postman and send the request
  const formData = new FormData();
  formData.append('productName', product.productName);
  formData.append('description', product.description);
  formData.append('price', product.price);
  // Append main image like postman key image value file
  formData.append('image', mainImage);
  try {
    await axios.post(urlProducts, formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data);
      // Get the id of the product created to use it in the url
      const productId = response.data.id;
      // Send for each secondary image a separated post request to the /images//add/:productID
      secondaryImages.forEach(async (image) => {
        const formData = new FormData();
        formData.append('image', image);
        await axios.post(urlImages + 'add/' + productId, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

	return (
		<>
			<h1>Create Product</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='productName'>Product Name</label>
				<input
					required
					type='text'
					name='productName'
					value={product.productName}
					onChange={handleChange}
				/>
				<label htmlFor='description'>Description</label>
				<input
					required
					type='text'
					name='description'
					value={product.description}
					onChange={handleChange}
				/>
				<label htmlFor='price'>Price</label>
				<input
					required
					type='number'
					name='price'
					value={product.price}
					onChange={handleChange}
				/>
				<label htmlFor='mainImage'>Main Image</label>
				<input
					required
					type='file'
					name='mainImage'
					accept='image/*'
					onChange={handleMainImageChange}
				/>
				<label htmlFor='secondaryImages'>
					Please select at least 2 images from you files
				</label>
				{/* Min 2 images max 5 images */}
				<input
					required
					type='file'
					name='secondaryImages'
					accept='image/*'
					multiple
					onChange={handleSecondaryImagesChange}
				/>
				<button type='submit'>Create Product</button>
			</form>
		</>
	);
};

export default CreateProduct;
