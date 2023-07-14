import React, { useState } from 'react';
import postData from '../helpers/postData';
import { urlImages, urlProducts } from '../helpers/urls';
import axios from 'axios';

/**
 * CreateProduct Component
 * Renders a form to create a new product with images.
 */
const CreateProduct = () => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [secondaryImages, setSecondaryImages] = useState([]);
  const [error, setError] = useState(null);

  // Handles changes in the input fields
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the selection of the main image
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
  };

  // Handles the selection of the secondary images
  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 2) {
      setError('Select at least 2 images');
      return;
    }

    setSecondaryImages(files);
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImage) {
      setError('Select a main image');
      return;
    } else if (secondaryImages.length < 2) {
      setError('Select at least 2 secondary images');
      return;
    } else if (secondaryImages.length > 5) {
      setError('Select a maximum of 5 secondary images');
      return;
    }

    setError(null);
    setLoading(true);
    // If all the requirements are met, send the product data and images as form-data
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', mainImage); // Append main image
    try {
      await axios
        .post(urlProducts, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Get the id of the product created to use it in the url
          const productId = response.data.product.productID;
          // Send a separate post request for each secondary image to /images/add/:productID
          secondaryImages.forEach(async (image) => {
            const formData = new FormData();
            formData.append('image', image);
            await axios
              .post(urlImages + 'add/' + productId, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((response) => {
                console.log(response.data);
                // Clear the form
                setProduct({
                  productName: '',
                  description: '',
                  price: '',
                });
                setMainImage(null);
                setSecondaryImages([]);
                setLoading(false);
              });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;

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
        <label htmlFor='secondaryImages'>Please select at least 2 images from your files</label>
        {/* Minimum of 2 images and maximum of 5 images */}
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
