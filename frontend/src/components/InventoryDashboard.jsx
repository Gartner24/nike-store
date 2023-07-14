import React from 'react';

const InventoryDashboard = ({
	products,
	images,
	inventory,
	editingInventory,
	setEditingInventory,
	handleUpdateInventory,
}) => {
	// Inventory Dashboard variables
	// 		productID: product.productID,
	// 		quantity: 1,
	// 		stockMin: 0,
	// 		stockMax: 200,

	return (
		<>
			<h1>Inventory Dashboard</h1>
			<p>Edit inventory</p>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.productID}>
							<td>{product.productID}</td>
							<td>{product.productName}</td>
							<td>
								<button
									onClick={() => setEditingInventory(product)}
								>
									Edit
								</button>
							</td>
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
									onClick={() =>
										handleUpdateInventory(editingInventory)
									}
								>
									Update
								</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default InventoryDashboard;
