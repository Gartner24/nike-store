import React from "react";
import "./css/facture.css";

/*
    ESTAS IMPORTACIONES SON:
    Products --> Array de Objetos, cada objeto representa cada producto que llevó el cliente
                    Cada objeto tiene las propiedades: name, id, price, quantity (cantidad)


    Client --> Objeto que contiene información del cliente
                    En este caso, solo se necesita un atributo "name"
*/
import Products from "./ArrayProducts";
import Client from "./ObjectClient";

/*
    Nombre: PrintProductRow
    Parámetro: OBJETO que contiene la información de un determinado producto comprado por el usuario
    Objetivo: Crear una fila de la tabla sobre un determinado producto
*/
const PrintProductRow = (Product) => {
  return (
    <tr>
      <td>{Product.name}</td>
      <td>{Product.id}</td>
      <td>{Product.price}</td>
      <td>{Product.quantity}</td>
    </tr>
  );
};



const FacturePage = () => {
  // Calcular el total a pagar por el cliente
  const total = Products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <div className="Facture">
      <div className="Facture-tittle">
        <h1>FACTURE</h1>
      </div>

      <div className="Facture-body">
        <div className="information.client">
          <h2>Dear {Client.name}, thanks for your purchase!</h2>
        </div>

        <h3>Information about your purchase...</h3>

        <table className="Table">
          <thead className="TableHeader">
            <tr className="TableTittles">
              <th>NAME</th>
              <th>ID</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
          </thead>

          <tbody className="TableBody">
            {Products.map((element) => (
              <PrintProductRow key={element.id} {...element} />
            ))}
          </tbody>
        </table>

        <div className="Total">
          <strong>Total to Pay: ${total} </strong>
        </div>
      </div>
    </div>
  );
};

export default FacturePage;
