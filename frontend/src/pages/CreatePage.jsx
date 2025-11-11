import { Box, Button, Container, Heading, useColorModeValue, VStack, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

function CreatePage() {
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		image: '',
	});
	const resetForm = () =>
		setNewProduct({
			name: '',
			price: '',
			image: '',
		});
	const toast = useToast();
	const { createNewProduct } = useProductStore();

	const handleAddingProduct = async () => {
		const { success, message } = await createNewProduct(newProduct);
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				isClosable: true,
			});
			return;
		}
		resetForm();

		toast({
			title: 'Success',
			description: message,
			status: 'success',
			isClosable: true,
		});
	};

	return (
		<Container maxW={'container.sm'}>
			<VStack spacing={8}>
				<Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
					Create New Product
				</Heading>
				<Box w={'full'} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>
					<VStack>
						<Input
							type='text'
							placeholder='Product name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							type='number'
							placeholder='Product price'
							name='price'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							type='text'
							placeholder='Product image'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>
						<Button colorScheme='blue' w={'full'} onClick={handleAddingProduct}>
							Add New Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
}

export default CreatePage;
