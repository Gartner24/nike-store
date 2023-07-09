import Product from '../component/Product';

const ProductPage = () => {
	return (
		<div>
			<Product
				name='Nike Jordan'
				image='tenis2'
				description={`Air Force 1 Low '07 "White/Gum" sneakersLet's put it like this: if you're strolling around town on a sunny Saturday afternoon, while wearing these Nike Air Force 1 '07 sneakers, life really is pretty good. You can officially start skipping. Imported`}
				price='100'
				count='0'
			/>
		</div>
	);
};
export default ProductPage;
