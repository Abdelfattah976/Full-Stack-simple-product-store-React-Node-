import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react';
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Container maxW={1400} px={4}>
			<Flex
				minH={{ base: 'auto', sm: 16 }}
				py={{ base: 4, sm: 0 }}
				alignItems={'center'}
				justifyContent={'space-between'}
				flexDir={{ base: 'column', sm: 'row' }}
				gap={{ base: 3, sm: 0 }}>
				<Text
					fontSize={{ base: '20', sm: '28' }}
					fontWeight={'bold'}
					textAlign={'center'}
					bgClip={'text'}
					textTransform={'uppercase'}
					bgGradient={'linear(to-r, cyan.400, blue.500)'}>
					<Link to={'/'}>Product Store 🛒</Link>
				</Text>
				<HStack spacing={2} alignItems={'center'}>
					<Link to={'/create'}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === 'light' ? <MoonIcon fontSize={20} /> : <SunIcon fontSize={20} />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
}

export default Navbar;
