import { Container, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
function HomePage() {
	const { getProducts, products } = useProductStore();
	useEffect(() => {
		getProducts();
	}, [getProducts]);
	return (
		<Container maxW={'container.xl'} py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={30}
					fontWeight={'bold'}
					textAlign={'center'}
					bgClip={'text'}
					bgGradient={'linear(to-r,cyan.400,blue.500)'}>
					Our Current Products
				</Text>
				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					w={'full'}
					spacing={10}>
					{products.map((product) => {
						return <ProductCard key={product._id} product={product} />;
					})}
				</SimpleGrid>
				{products.length === 0 && (
					<Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
						No Products found{' '}
						<Link to={'/create'}>
							<Text as={'span'} color={'blue.500'} _hover={{ textDecoration: 'underline' }}>
								Create a Product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
}

export default HomePage;
