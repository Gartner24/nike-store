import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductCard from '../components/Productcard';
import { ProductList } from '../components/ProductList';
import { data } from '../data';
import { Header } from '../components/Header';

const Home = () => {
	return (
		<div className='MainVideo'>
			<p className='desliza'>Swipe down.</p>
			<video autoPlay muted loop className='video'>
				<source src={video} type='video/mp4' />
				Tu navegador no admite la reproducción de videos.
			</video>
		</div>
	);
};

export default Home;
