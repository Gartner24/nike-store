import React, { useState, useEffect } from 'react';
import './css/ProductPage.css';
import ProductCard from '../components/ProductCard';
import Carrusel from '../components/Carrusel';
import getData from '../helpers/getData';
import { urlProducts, urlImages } from '../helpers/urls';



const ProductPage = () => {

    const [products, setProducts] = useState([]);

  
    const getImage = async (id) => {
      const data = await getData(urlImages + id).then(
        (data) => data[0].imageURL
      );
      return data;
    };
  
    useEffect(() => {
      getData(urlProducts).then((data) => {
        setProducts(data);
        const urls = data.map((product) => getImage(product.productID));
        Promise.all(urls).then((urls) => setImageUrls(urls));
      });
    }, []);
  

  return (
	<>
    <div>
		<Carrusel />
    
      <div className="row">
      <h1 className='title-just-do-it'> JUST DO IT </h1>
        <div className='productss'>
          <div className="col-md-4" >
            <ProductCard   />
          </div>
        </div>
      </div>
    </div>
	</>
  );
};

export default ProductPage;

