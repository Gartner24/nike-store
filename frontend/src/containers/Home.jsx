import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductCard from '../components/Productcard';
import Advertisements from '../components/Advertisements';

const Home = () => {
	return (
		<div className='MainVideo'>
			<video autoPlay muted loop className='video'>
				<source src={video} type='video/mp4' />
				Tu navegador no admite la reproducción de videos.
			</video>
			<p className='desliza'>Swipe down.</p>
			<Advertisements />
		</div>
	);
};

export default Home;
