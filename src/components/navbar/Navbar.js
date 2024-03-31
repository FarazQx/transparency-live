// Chakra Imports
import { Box, Flex, Link, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';

// Context import 
import {UserContext} from 'context/user-context'; 

export default function AdminNavbar(props) {
  const { secondary, message, brandText } = props;
  const { UserName } = useContext(UserContext);

	// Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
	let mainText = 'white';
	let secondaryText = 'white';
	let navbarBg = "primary";
	let gap = '0px';

	return (
		<Box
			bg={navbarBg}
			border={'none'}
			alignItems={{ xl: 'center' }}
			display={secondary ? 'block' : 'flex'}
			minH='75px'
			justifyContent={{ xl: 'center' }}
			lineHeight='25.6px'  
			w={'100%'}
            zIndex={2}
            py={4}
			>
			<Flex
				w='100%'
				flexDirection={{
					sm: 'column',
					md: 'row'
				}}
                px='25px'
				alignItems={{ xl: 'center' }}
				mb={gap}>
				<Box mb={{ sm: '8px', md: '0px' }}>
					{/* Here we create navbar brand, based on route name */}
					<Text
						mb='5px'
						mt='5px'
						color={mainText}
						href='#'
						bg='inherit'
						borderRadius='inherit'
						fontWeight='semi-bold'
						fontSize='2rem'
						_hover={{ color: { mainText } }}
						_active={{
							bg: 'inherit',
							transform: 'none',
							borderColor: 'transparent'
						}}
						_focus={{
							boxShadow: 'none'
						}}>
						{brandText}
					</Text>
					<Text color={secondaryText} fontSize='sm'>
						Hello! {UserName} welcome back!
					</Text>
				</Box>
				<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
					<AdminNavbarLinks
						onOpen={props.onOpen}
						logoText={props.logoText}
						secondary={props.secondary}
						fixed={props.fixed}
						// scrolled={scrolled}
					/>
				</Box>
			</Flex>
		</Box>
	);
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
