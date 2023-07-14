import React from 'react';
import "./css/ProductDashboard.css";

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
		<div className='background-product'>
    <h2>Products</h2>
    <p>Create a product</p>
    {createProduct && <CreateProduct />}
    <button className="create-product-button" onClick={() => setCreateProduct(!createProduct)}>
        {createProduct ? 'Finish' : 'Create a Product'}
    </button>

    <table className="product-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
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
                            <button className="edit-button" onClick={() => setEditingProduct(product)}>
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
                        <button className="save-button" onClick={(e) => handleSubmit(e, editingProduct.productID)}>
                            Save
                        </button>
                        <button className="delete-button" onClick={() => handleDelete(editingProduct.productID)}>
                            Delete
                        </button>
                        <button className="cancel-button" onClick={() => setEditingProduct(null)}>
                            Cancel
                        </button>
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>

	);
};

export default ProductDashboard;
