import React from "react";
import CartWindow from "./CartWindow";

const ProductPage = () => {
    const handleCloseCart = () => {
        // Lógica para cerrar la ventana del carrito
    };

    const handleAddToCart = (product) => {
        // Lógica para agregar el producto al carrito
        console.log("Agregado al carrito:", product);
    };

    return (
        <div>
            {/* Aquí va el contenido de la página */}
            <button onClick={() => handleAddToCart("Producto 1")}>
                Agregar Producto 1 al carrito
            </button>
            <button onClick={() => handleAddToCart("Producto 2")}>
                Agregar Producto 2 al carrito
            </button>
            <button onClick={() => handleAddToCart("Producto 3")}>
                Agregar Producto 3 al carrito
            </button>

            {/* Ventana emergente del carrito */}
            <CartWindow onClose={handleCloseCart} />
        </div>
    );
};

export default ProductPage;


