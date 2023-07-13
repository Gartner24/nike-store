import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductList from '../components/ProductList';
import Advertisements from '../components/Advertisements';
import CheckoutForm from '../components/FormPay';

const Home = () => {
	return (
		<div className='Main'>
			<video autoPlay muted loop className='video'>
				<source src={video} type='video/mp4' />
				Tu navegador no admite la reproducción de videos.
			</video>
			<p className='desliza'>Swipe down.</p>
			<Advertisements />
			<ProductList />
		</div>
	);
};

export default Home;
