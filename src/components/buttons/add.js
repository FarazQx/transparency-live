import { Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

export default function AddButton(props) {
	const { ...rest } = props;

	return (
		<Button leftIcon={<MdAdd />} transition='0.2s linear'
		  bg={'primaryBtn'}
		  color={'white'}
          _hover={'btnHover'}
          _active={'btnActive'}
          borderRadius='8px'
		  variant='solid'
		  {...rest}>
          Add
        </Button>
	)
};