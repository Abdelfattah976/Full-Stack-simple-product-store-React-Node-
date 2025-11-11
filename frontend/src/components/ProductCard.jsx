import {
	useColorModeValue,
	Box,
	useDisclosure,
	Heading,
	HStack,
	Text,
	IconButton,
	useToast,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	VStack,
	Input,
	Button,
	Image,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useProductStore } from '../store/product';
import { useState } from 'react';
function ProductCard({ product }) {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const bg = useColorModeValue('white', 'gray.800');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const textColor = useColorModeValue('gray.600', 'gray.200');
	const { updateProduct, deleteProduct } = useProductStore();
	const toast = useToast();
	const handleUpdate = async (id, updatedProduct) => {
		const { success, message } = await updateProduct(id, updatedProduct);
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				isClosable: true,
			});
		} else {
			toast({
				title: 'Success',
				description: 'Product updated successfully.',
				status: 'success',
				isClosable: true,
			});
		}
		onClose();
	};
	const handleDeleteProduct = async (id) => {
		const { success, message } = await deleteProduct(id);
		if (!success) {
			toast({
				title: 'Error',
				description: message,
				status: 'error',
				isClosable: true,
			});
		} else {
			toast({
				title: 'Success',
				description: 'Product deleted successfully.',
				status: 'success',
				isClosable: true,
			});
		}
		onClose();
	};

	return (
		<Box
			rounded={'lg'}
			shadow={'lg'}
			bg={bg}
			overflow={'hidden'}
			transition={'all 0.3s'}
			_hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}>
			<Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
			<Box p={4}>
				<Heading as={'h3'} size='md' mb={2}>
					{product.name}
				</Heading>
				<Text fontWeight={'bold'} fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>
				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
					<IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDeleteProduct(product._id)} />
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								type='text'
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								type='number'
								placeholder='Price'
								name='price'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								type='text'
								placeholder='Image'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={'blue'} mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
							Update
						</Button>
						<Button variant={'ghost'} onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default ProductCard;
