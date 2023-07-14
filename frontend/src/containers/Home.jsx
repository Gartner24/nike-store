import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductList from '../components/ProductList';
import Advertisements from '../components/Advertisements';
import { products } from '../data';

const Home = () => {
  // Obtén solo los primeros tres productos
  const threeProducts = products.slice(0, 1);

  return (
    <div className='MainVideo'>
      <video autoPlay muted loop className='video'>
        <source src={video} type='video/mp4' />
        Tu navegador no admite la reproducción de videos.
      </video>
      <p className='desliza'>Swipe down.</p>
      <Advertisements />

      <div className="row">
        {threeProducts.map(({ productID, name, image, description, price }) => (
          <div className="col-md-4" key={productID}>
            <ProductList
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

