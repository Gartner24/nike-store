import React, { useEffect, useState } from 'react';
import { urlProducts } from '../helpers/urls';
import { urlOrders } from '../helpers/urls';
import { urlInventory } from '../helpers/urls';
import { urlImages } from '../helpers/urls';
import getData from '../helpers/getData';
import putData from '../helpers/putData';
import deleteData from '../helpers/deleteData';
import CreateProduct from '../components/CreateProduct';
import ProductDashboard from '../components/ProductDashboard';

const AdminDashboard = () => {
  // State variables
  const [dashboardState, setDashboardState] = useState(0);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [createProduct, setCreateProduct] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited

  // Fetch all products from the API
  const getProducts = async () => {
    const data = await getData(urlProducts);
    setProducts(data);
  };

  // Fetch all images from the API
  const getImages = async () => {
    const data = await getData(urlImages);
    setImages(data);
  };

  // Handle form submission
  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    // Update the product using the editingProduct state
    const updatedProduct = {
      ...editingProduct,
      id: productId,
    };
    await putData(urlProducts + '/' + productId, updatedProduct);
    // Clear the editing state and refresh the products
    setEditingProduct(null);
    getProducts();
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    await deleteData(urlProducts + productId);
    getProducts();
    setEditingProduct(null);
  };

  // Fetch products and images based on dashboard state
  useEffect(() => {
    try {
      if (dashboardState === 1) {
        setLoading(true);
        getProducts();
        getImages();
        setLoading(false);
      } else if (dashboardState === 2) {
        setLoading(true);
        getData(urlInventory).then((data) => {
          setInventory(data);
          setLoading(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dashboardState]);

  // Display loading state while data is being fetched
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className='dashboardContainer'>
        <h1>Dashboard</h1>
        <>
          <button onClick={() => setDashboardState(1)}>
            Products
          </button>
          <button onClick={() => setDashboardState(2)}>
            Inventory
          </button>
          {dashboardState !== 0 && (
            <button onClick={() => setDashboardState(0)}>
              Go Back
            </button>
          )}
        </>

        {dashboardState === 1 && (
          <>
            <ProductDashboard
              products={products}
              setProducts={setProducts}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              createProduct={createProduct}
              setCreateProduct={setCreateProduct}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
            />
          </>
        )}
        {dashboardState === 2 && (
          <>
            <h2>Inventory</h2>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
