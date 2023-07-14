import React from 'react';

import CreateProduct from '../components/CreateProduct';
const ProductDashboard = ({
    products,
    setProducts,
    editingProduct,
    setEditingProduct,
    createProduct,
    setCreateProduct,
    handleSubmit,
    handleDelete,
}) => {

	return (
		<>
			<h2>Productos</h2>
			<p>Agrega un producto</p>
			{createProduct && <CreateProduct />}
			<button onClick={() => setCreateProduct(!createProduct)}>
				{createProduct ? 'Finish' : 'Create a Product'}
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
									Save
								</button>
								<button
									onClick={() =>
										handleDelete(editingProduct.productID)
									}
								>
									Delete
								</button>
								<button onClick={() => setEditingProduct(null)}>
									Cancel
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default ProductDashboard;
