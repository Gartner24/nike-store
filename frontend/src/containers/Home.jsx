import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductList from '../components/ProductList';
import Advertisements from '../components/Advertisements';
import { products } from '../data';
import CheckoutForm from '../components/FormPay';

const Home = () => {
  // Get only the first three products
  const threeProducts = products.slice(0, 3);

  return (
    <div className='MainVideo'>
      <video autoPlay muted loop className='video'>
        <source src={video} type='video/mp4' />
        Your browser does not support video playback.
      </video>
      <p className='desliza'>Swipe down.</p>
      <Advertisements />

      <div className="row">
        {threeProducts.map(({ productID, name, image, description, price }) => (
          <div className="col-md-4" key={productID}>
            <ProductList
              name={name}
              image={image}
              description={description}
              price={price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
