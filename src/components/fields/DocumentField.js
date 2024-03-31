// React imports
import { useState, useRef, useEffect } from 'react'

// Chakra imports
import {
  Flex,
  Input,
  Text,
  chakra,
  Stack,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react'

// Icon imports
import { MdEdit, MdDelete } from 'react-icons/md';
import uploadIcon from "assets/icons/cloud_upload.svg";

// Formik imports
import { Field, ErrorMessage } from "formik";


export default function DocumentField(props) {
  const { id, fieldName, type = "file", selectedImages = [], form = true, multiple = false, label, extra, placeholder, ...rest } = props;

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const allowedTypes = ["pdf", "word", "ppt"];

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
                {form ? <Field as={Input} {...fieldProps} /> : <Input {...fieldProps} />}
              </VisuallyHidden>
            </chakra.label>
            
          </Flex>
        </Stack>
      </Flex>

      {/* Display Selected Image */}
      <Flex mt={4} gap={4}>
      {images.length > 0 ? 
      (
        <Text>{images[0].file.name}</Text>
      ) 
      : 
      (
        <Text>No file selected</Text>
      )}
      </Flex>
    </Flex>
  );
}