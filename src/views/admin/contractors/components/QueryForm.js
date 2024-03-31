import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import InputField from "components/fields/InputField";
import TextArea from "components/fields/TextArea";
import SelectField from "components/fields/SelectField";
import RadioField from "components/fields/RadioField";
import ImageField from "components/fields/ImageField";
import ChargeField from "components/fields/ChargeField";
// Formik imports
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function QueryForm(props) {
  const rowData = props.rowData ?? {};

  const options = [
    { value: 0, text: "Translator" },
    { value: 1, text: "Interpreter" },
  ];
  const optionsLang = [
    { value: "English", text: "English" },
    { value: "Spanish", text: "Spanish" },
    { value: "Other", text: "Other" },
  ];
  const optionsLangto = [
    { value: "Spanish", text: "Spanish" },
    { value: "French", text: "French" },
  ];

  const defaultImageSrc = "/img/image_placeholder.png";
  const initialValues = {
    FirstName: rowData?.firstName ?? "",
    LastName: rowData?.lastName ?? "",
    Email: rowData?.email ?? "",
    PhoneNumber: rowData?.phoneNumber ?? "",
    Address: rowData?.address ?? "",
    ImageName: rowData?.imageName ?? "",
    Type: rowData?.type ?? "",
    OriginalLanguage: rowData?.originalLanguage ?? "",
    LanguageTo: rowData?.languageTo ?? "",
    ChargesPerWord: rowData?.chargesPerWord ?? "",
    Rates_Per_Hour: rowData?.rates_Per_Hour ?? "",
    Notes: rowData?.notes ?? "",
    Performance: rowData?.performane ?? "",
    Software: rowData?.software ?? "",
    ImageSrc: defaultImageSrc,
    ImageFile: rowData?.email ?? "",
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("It is a  required field"),
    LastName: Yup.string().required("It is a  required field"),
    Email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    PhoneNumber: Yup.string().required("It is a  required field"),
    Address: Yup.string().required("It is a  required field"),
    Type: Yup.string().required("It is a  required field"),
    OriginalLanguage: Yup.string().required("It is a  required field"),
    LanguageTo: Yup.string().required("It is a  required field"),
    ChargesPerWord: Yup.string().required("It is a  required field"),
    Rates_Per_Hour: Yup.string().required("It is a  required field"),
  });

  const submitHandler = (values) => {
    props.onClose();
    rowData.id ? props.onEdit(rowData.id, values) : props.onAdd(values);
  };
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              submitHandler(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <ModalHeader bg={"primaryGradient"} color={"white"}>
                  Contractor Details
                </ModalHeader>
                <ModalCloseButton color={"white"} _focus={"none"} />
                <ModalBody>
                  {/* Step 01 */}
                  <Box w="60%" mt={8}>
                    <InputField
                      fieldName="FirstName"
                      label="First Name"
                      placeholder="Name"
                      type="text"
                      extra={"*"}
                    />
                    <InputField
                      fieldName="LastName"
                      label="Last Name"
                      placeholder="Name"
                      type="text"
                      extra={"*"}
                    />
                    <InputField
                      fieldName="PhoneNumber"
                      label="Phone Number"
                      placeholder="(123) 456-7878"
                      type="text"
                      extra={"*"}
                    />
                    <InputField
                      fieldName="Email"
                      label="Email"
                      placeholder="abc@email.com"
                      type="text"
                      extra={"*"}
                    />
                    <TextArea
                      fieldName="Address"
                      label="Address"
                      placeholder="Address"
                      type="text"
                      extra={"*"}
                    />
                    <SelectField
                      fieldName="Type"
                      label="Contractor Type"
                      placeholder="Contractor Type"
                      type="text"
                      options={options}
                      extra={"*"}
                    />
                    <SelectField
                      fieldName="OriginalLanguage"
                      label="Original Language"
                      placeholder="Original Language"
                      type="text"
                      options={optionsLang}
                      extra={"*"}
                    />
                    <SelectField
                      fieldName="LanguageTo"
                      label="Translate to / Interpret to"
                      placeholder="Translation Language"
                      type="text"
                      options={optionsLangto}
                      extra={"*"}
                    />
                    <Flex gap={2}>
                      <ChargeField
                        fieldName="ChargesPerWord"
                        label="Per word charges"
                        placeholder="0.32"
                        type="text"
                        extra={"*"}
                      />
                      <ChargeField
                        fieldName="Rates_Per_Hour"
                        label="Per hour charges"
                        placeholder="52"
                        type="text"
                        extra={"*"}
                      />
                    </Flex>
                    <ImageField
                      fieldName="Profile"
                      label="Add Profile Photo"
                      multiple={false}
                      extra={"*"}
                    />

                    <TextArea
                      fieldName="Notes"
                      label="Add Notes"
                      placeholder="Notes"
                      type="text"
                    />
                    <TextArea
                      fieldName="Performance"
                      label="Performance / Complaint /Feedback"
                      placeholder="Feedback"
                      type="text"
                    />
                    <TextArea
                      fieldName="Software"
                      label="Software Used"
                      placeholder="Software Names"
                      type="text"
                    />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    mr={3}
                    borderRadius={"8px"}
                    onClick={props.onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"primaryBtn"}
                    color={"white"}
                    _hover={"btnHover"}
                    _
                    active={"btnActive"}
                    borderRadius="8px"
                    variant="solid"
                    type="submit"
                  >
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
