// React imports
import { useState, useRef, useEffect } from 'react'

// Chakra imports
import {
  Box,
  IconButton,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
  useColorModeValue,
  Icon,
  chakra,
  Stack,
  VisuallyHidden,
  Img,
  Image
} from '@chakra-ui/react'

// Icon imports
import { MdEdit, MdDelete } from 'react-icons/md';
import uploadIcon from "assets/icons/cloud_upload.svg";

const StyleProps = {
  fontWeight: '500',
  variant: 'main',
  h: '44px',
  maxH: '44px',
  borderRadius: 'md',
  _focus: { borderColor: 'white' },
  _placeholder: { fontWeight: '400', color: 'secondaryGray.600' },
};


export default function DocumentField(props) {
  const { id, fieldName, type = "file", selectedImages = [], form = true, multiple = true, label, extra, placeholder, ...rest } = props;

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const allowedTypes = ["jpg", "jpeg", "png"];

  //Function to prevent image from opening on browser
  const preventDefault = (event) => {
    event.preventDefault();
  };

  // Function to drop and upload
  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    handleImageUpload(files);
  };

  // Function to select and upload
  const handleUpload = (event) => {
    const files = event.target.files;
    handleImageUpload(files);
  };

  // Function to edit a selected image
  const editImage = (index) => {
    if (fileInputRef.current) {
      // Trigger a click event on the file input
      fileInputRef.current.click();

      // Set up an onchange event handler for the file input
      fileInputRef.current.onchange = (e) => {
        handleImageUpload(e.target.files, index); // Pass the index to edit
      };
    }
  };

  // Function to delete selected image
  const deleteImage = (index) => {
    // Create a new array without the item to delete
    const updatedImages = images.slice();
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };  

  // Function to populate images array and setFormField for upload
  const handleImageUpload = (files, index) => {
    const tempImages = [];

    for(const file of files) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
  
      if (!allowedTypes.includes(fileExtension)) {
        alert("Your file format is not supported");
        return false; // Skip unsupported files
      }
  
      tempImages.push({
        image: URL.createObjectURL(file),
        file,
        alt: file.name,
      });
    }
    
    if (index !== undefined) {
      // If editing, replace the image at the specified index
      images[index] = {...tempImages[0]};
      setImages(images);
    } 
    else {
      // If not editing, append the new images
      setImages(images => [...images, ...tempImages]);
    }
  };

  

  const fieldProps = {
    id,
    type,
    multiple,
    name: fieldName,
    onChange: handleUpload,
    ref: fileInputRef,
    ...rest
  };

  return (
    <Flex direction='column' mb={'30px'}>
        <Flex
          display='flex'
          htmlFor={id}
          fontSize='sm'
          color={"gray"}
          _hover={{ cursor: "pointer" }}>
          {label}
          <Text fontSize='sm' fontWeight='400' ms='2px' color={'red'}>
            {extra}
          </Text>
        </Flex>
      
      {/* Image Upload */}
      {images.length == 0 &&
      (
      <Flex mt={1} justify="center" px={6} pt={5} pb={6} borderWidth={2} _dark={{ color: "gray.500", }} borderStyle="dashed" rounded="md" onDrop={handleDrop} onDragOver={preventDefault}>
        <Stack spacing={1}>
          
          <Flex fontSize="sm" color="gray.600" _dark={{ color: "gray.400", }} alignItems="center">
            <Image src={uploadIcon} boxSize={8} pr={2} />
            <Text pr={1}>Drop files to attach or</Text>
            <chakra.label
              htmlFor={id}
              cursor="pointer"
              rounded="md"
              fontSize="md"
              color="primary"
              pos="relative"
            >
              <span>Browse</span>
              <VisuallyHidden>
                <Input {...fieldProps} name={fieldName} />
              </VisuallyHidden>
            </chakra.label>
            
          </Flex>
        </Stack>
      </Flex>
      )}

      {/* Display Selected Image */}
      <Flex mt={4} gap={4}>
      {images.length > 0 ? 
      (
        images.map((image, index) => (
          <Box key={index} position="relative">
            <Img src={image.image} alt={image.alt} w={120} h={120} />
            <Flex
              position="absolute"
              top={0}
              right={0}
              w={120} h={120}
              alignItems="end"
              justifyContent="space-evenly"
              background="rgba(0, 0, 0, 0.5)"
              opacity={0}
              transition="opacity 0.3s"
              _hover={{ opacity: 1 }}
            >
              <IconButton icon={<MdEdit />} boxSize={8} colorScheme="teal" aria-label="Edit" onClick={() => editImage(index)} />
              <IconButton icon={<MdDelete />} boxSize={8} colorScheme="red" aria-label="Delete" onClick={() => deleteImage(index)}
              />
            </Flex>
          </Box>
        ))
      ) 
      : 
      (
        <Text>No file selected</Text>
      )}
      </Flex>
    </Flex>
  );
}