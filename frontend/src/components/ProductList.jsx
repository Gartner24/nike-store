import React from "react";
import { data } from "../data";
import "./css/ProductList.css";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

  const url = 'http://localhost:8080'

	useEffect(() => {
		axios
			.get(`${url}/api/products`)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
        console.log(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (loading) {
		return (
			<>
				{/* Spinner */}
				<h1>Cargando...</h1>
			</>
		);
	}

	return (
		<div className='container-items'>
			{products?.map((product) => (
				<div className='item' key={product.productID}>
					<figure>
						{/* <img src={product.img} alt={product.nameProduct} /> */}
					</figure>
					<div className='info-product'>
						<h2>{product.productName}</h2>
						<p className='description'>${product.description}</p>
						<p className='price'>${product.price}</p>
						<button>Añadir al carrito</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProductList;
