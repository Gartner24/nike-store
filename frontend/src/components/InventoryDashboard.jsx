import React from 'react';

const InventoryDashboard = ({
	products,
	inventory,
	editingInventory,
	setEditingInventory,
	handleUpdateInventory,
}) => {
  // const handleUpdateInventory = async (e, productId) => {
	// 	e.preventDefault();
	// 	// Update the product using the editingProduct state
	// 	const updatedInventory = {
	// 		...editingInventory,
	// 		id: productId,
	// 	};
	// 	await putData(urlInventory + '/product/' + productId, updatedInventory);
	// 	// Clear the editing state and refresh the products
	// 	setEditingInventory(null);
	// 	getProducts();
	// };
	return (
		<>
			<h1>Inventory Dashboard</h1>
			<p>Edit inventory</p>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.productID}>
							<td>{product.productID}</td>
							<td>{product.productName}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p>Editing inventory</p>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Quantity</th>
						<th>Stock Min</th>
						<th>Stock Max</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{editingInventory && (
						<tr>
							<td>{editingInventory.productID}</td>
							<td>
								<input
									type='number'
									value={editingInventory.quantity}
									onChange={(e) =>
										setEditingInventory({
											...editingInventory,
											quantity: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									type='number'
									value={editingInventory.stockMin}
									onChange={(e) =>
										setEditingInventory({
											...editingInventory,
											stockMin: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<input
									type='number'
									value={editingInventory.stockMax}
									onChange={(e) =>
										setEditingInventory({
											...editingInventory,
											stockMax: e.target.value,
										})
									}
								/>
							</td>
							<td>
								<button
                  onClick={(e) =>
                    handleUpdateInventory(e, editingInventory.productID)
									}
								>
									Update
								</button>
							</td>
						</tr>
					)}
					{!editingInventory &&
						inventory.map((inventory) => (
							<tr key={inventory.productID}>
								<td>{inventory.productID}</td>
								<td>{inventory.quantity}</td>
								<td>{inventory.stockMin}</td>
								<td>{inventory.stockMax}</td>
								<td>
									<button
										onClick={() =>
											setEditingInventory(inventory)
										}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	);
};

export default InventoryDashboard;
