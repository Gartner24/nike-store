MECANICA DEL FUNCIONAMIENTO DE LA PÁGINA FACTURE: 

Realmente lo que ocurre es que en el archivo "Facture.jsx" se recibe la importacion del Array de Productos y el Objeto cliente
Con esta informacion, se imprime un mensaje en la pagina web en donde es un leve texto y una tabla que contiene la informacion de los diversos productos. 

Es IMPORTANTE que tenga a consideración que las funciones empleadas en "Facture.jsx" NECESITAN recibir las importaciones de los productos (array) y el cliente (objeto)


-----------------------------------------------------------


1. PÁGINA DE FACTURE ("Facture.jsx")

Es el archivo llamado "Facture.jsx"
Este archivo recibe las importaciones de "ArrayProducts" y "ObjectClient"


2. ArrayProducts.jsx

Es un arreglo de objetos
Cada objeto representa el producto que ha sido comprado por el usuario
Contiene 4 propiedades
 	*name	(nombre)
	*id	 (identificador único (1,2,3...n) ) 
	*price	  (precio)
	*quantity (cantidad)



3. ObjectClient.jsx

Es un objeto 
Este obtiene contiene las propiedades referentes al cliente
Para la página de la factura, solo nos interesa la propiedad "name" 
El valor de dicha propiedad es una cadena que contiene el nombre del usuario


4. facture.css

Son los estilos para el archivo "Facture.jsx"
