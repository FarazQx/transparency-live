import { Button, useColorModeValue } from '@chakra-ui/react';

export default function SubmitButton(props) {
	const { text, ...rest } = props;
    const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.100' });

	return (
		<Button transition='0.2s linear'
		  type='submit'
		  bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          borderRadius='8px'
		  variant='solid'
		  {...rest}>
          {text}
        </Button>
	)
};