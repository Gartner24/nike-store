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
	const [dashboardState, setDashboardState] = useState(0);
	const [products, setProducts] = useState([]);
	const [images, setImages] = useState([]);
	const [createProduct, setCreateProduct] = useState(false);
	const [inventory, setInventory] = useState([]);
	const [loading, setLoading] = useState(false);

	// Inventory Dashboard variables
	// 		productID: product.productID,
	// 		quantity: 1,
	// 		stockMin: 0,
	// 		stockMax: 200,

	// State to hold the product being edited
	const [editingProduct, setEditingProduct] = useState(null);

	// get all products
	const getProducts = async () => {
		const data = await getData(urlProducts);
		setProducts(data);
	};

	// get all images
	const getImages = async () => {
		const data = await getData(urlImages);
		setImages(data);
	};

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

	const handleDelete = async (productId) => {
		await deleteData(urlProducts + productId);
		getProducts();
		setEditingProduct(null);
	};

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

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<div className='dashboardContainer'>
				<h1>Dashboard</h1>
				{dashboardState === 0 && (
					<>
						<button onClick={() => setDashboardState(1)}>
							Productos
						</button>
						<button onClick={() => setDashboardState(2)}>
							Inventario
						</button>
					</>
				)}

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
						<h2>Inventario</h2>
					</>
				)}
			</div>
		</>
	);
};

export default AdminDashboard;
