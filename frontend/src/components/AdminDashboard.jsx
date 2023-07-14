import React, { useEffect, useState } from 'react';
import { urlProducts } from '../helpers/urls';
import { urlOrders } from '../helpers/urls';
import { urlInventory } from '../helpers/urls';
import { urlImages } from '../helpers/urls';
import getData from '../helpers/getData';
import putData from '../helpers/putData';
import CreateProduct from './CreateProduct';

const AdminDashboard = () => {
	const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [createProduct, setCreateProduct] = useState(false);
  const [createImage, setCreateImage] = useState(false);

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

	useEffect(() => {
		getProducts();
		getImages();
	}, []);

	return (
		<div className='dashboardContainer'>
      <h1>Dashboard</h1>
      <h2>Productos</h2>

      <p>Agrega un producto</p>
      {createProduct && <CreateProduct />}
      <button onClick={() => setCreateProduct(!createProduct)}>
        {createProduct ? 'Terminar' : 'Agregar'}
      </button>

			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Precio</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{!editingProduct ? (
						// map over the products and display them in the table
						products.map((product) => (
							<tr key={product.productID}>
								<td>{product.productID}</td>
								<td>{product.productName}</td>
								<td>{product.description}</td>
								<td>{product.price}</td>
								<td>
									<button
										onClick={() =>
											setEditingProduct(product)
										}
									>
										Editar
									</button>
								</td>
							</tr>
						))
					) : (
						// If editingProduct is not null, display the editing form
						<tr>
							<td>{editingProduct.productID}</td>
							<td>
								<input
									type='text'
									value={editingProduct.productName}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											productName: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									type='text'
									value={editingProduct.description}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											description: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									type='text'
									value={editingProduct.price}
									onChange={(e) =>
										setEditingProduct({
											...editingProduct,
											price: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<button
									onClick={(e) =>
										handleSubmit(
											e,
											editingProduct.productID
										)
									}
								>
									Guardar
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminDashboard;
