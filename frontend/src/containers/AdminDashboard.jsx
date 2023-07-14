import React, { useEffect, useState } from 'react';
import { urlProducts } from '../helpers/urls';
import { urlOrders } from '../helpers/urls';
import { urlInventory } from '../helpers/urls';
import { urlImages } from '../helpers/urls';
import getData from '../helpers/getData';
import putData from '../helpers/putData';
import deleteData from '../helpers/deleteData';
import ProductDashboard from '../components/ProductDashboard';
import InventoryDashboard from '../components/InventoryDashboard';
import "./css/AdminDashboard.css";

const AdminDashboard = () => {
	const [dashboardState, setDashboardState] = useState(0);
	const [products, setProducts] = useState([]);
	const [images, setImages] = useState([]);
	const [createProduct, setCreateProduct] = useState(false);
	const [inventory, setInventory] = useState([]);
	const [loading, setLoading] = useState(false);

	// State to hold the product being edited
	const [editingProduct, setEditingProduct] = useState(null);
	const [editingInventory, setEditingInventory] = useState(null);

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

	const handleSubmitProduct = async (e, productId) => {
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

	const handleDeleteProduct = async (productId) => {
		await deleteData(urlProducts + productId);
		getProducts();
		setEditingProduct(null);
	};

	const handleUpdateInventory = async (e, productId) => {
		e.preventDefault();
		// Update the product using the editingProduct state
		const updatedInventory = {
			...editingInventory,
			id: productId,
		};
		await putData(urlInventory + '/product/' + productId, updatedInventory);
		// Clear the editing state and refresh the products
		setEditingInventory(null);
		getProducts();

	};

	const getInventory = async () => {
		getData(urlInventory).then((data) => {
			setInventory(data);
			setLoading(false);
		});
	}

	useEffect(() => {
		try {
			if (dashboardState === 1) {
				setLoading(true);
				getProducts();
				getImages();
				setLoading(false);
			} else if (dashboardState === 2) {
				setLoading(true);
				getInventory();
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
				<h1 className='title1'>Dashboard</h1>
				<>
					<button className='butonn' onClick={() => setDashboardState(1)}>
						Productos
					</button>
					<button className='butonn' onClick={() => setDashboardState(2)}>
						Inventario
					</button>
					{dashboardState !== 0 && (
						<button className='butonn' onClick={() => setDashboardState(0)}>
							Regresar
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
							handleSubmit={handleSubmitProduct}
							handleDelete={handleDeleteProduct}
						/>
					</>
				)}
				{dashboardState === 2 && (
					<>
						<InventoryDashboard
							products={products}
							images={images}
							inventory={inventory}
							editingInventory={editingInventory}
							setEditingInventory={setEditingInventory}
							handleUpdateInventory={handleUpdateInventory}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default AdminDashboard;
