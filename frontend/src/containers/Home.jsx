import './css/home.css';
import video from '../assets/inicio.mp4';
import ProductCard from '../components/Productcard';

const Home = () => {
	return (
		<div className='MainVideo'>
			<video autoPlay muted loop className='video'>
				<source src={video} type='video/mp4' />
				Tu navegador no admite la reproducción de videos.
			</video>
			<p className='desliza'>Swipe down.</p>
			<ProductCard
				nombre='ARDIDAS GENERATION Z'
				imagen='tenis1'
				descripcion='producto hecho con materiales reciclados, comodos y ligeros.'
				precio='4500'
			/>
		</div>
	);
};

export default Home;
