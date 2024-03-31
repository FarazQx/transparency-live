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

export default function PaymentForm(props) {
  const rowData = props.rowData ?? {};

  const adminPaymentStatusCodes = [
    { value: 0, text: "Pending" },
    { value: 1, text: "Sent" },
    { value: 2, text: "Paid" },
  ];
  const contractorPaymentStatusCodes = [
    { value: 0, text: "Pending" },
    { value: 1, text: "Invoiced" },
    { value: 2, text: "Paid" },
  ];

  const initialValues = {
    id: rowData?.id ?? "", // Assuming 'id' corresponds to the 'FirstName' or 'LastName' property from the previous object.
    profit: rowData?.profit ?? 0,
    completionDate: rowData?.completionDate ?? "", // Fill this value according to your requirements.
    contractorPayment: rowData?.contractorPayment ?? 0,
    estimatedCost: rowData?.estimatedCost ?? 0,
    contractorName: rowData?.contractorName ?? "", // Assuming 'contractorName' corresponds to the contractor's name.
    contractorImgSrc: rowData?.contractorImgSrc ?? "", // Fill this value according to your requirements.
    requestorName: rowData?.requestorName ?? "", // Assuming 'requestorName' corresponds to the requestor's name.
    serviceType: rowData?.serviceType ?? 0, // Fill this value according to your requirements.
    adminPaymentStatus: rowData?.adminPaymentStatus ?? 0,
    contractorPaymentStatus: rowData?.contractorPaymentStatus ?? 0,
    jobNumber: rowData?.jobNumber ?? "", // Fill this value according to your requirements.
  };

  const validationSchema = Yup.object().shape({
    completionDate: Yup.string().required("It is a  required field"),
    jobNumber: Yup.string().required("It is a  required field"),
    contractorPaymentStatus: Yup.string().required("It is a  required field"),
    adminPaymentStatus: Yup.string().required("It is a  required field"),
    serviceType: Yup.string().required("It is a  required field"),
    requestorName: Yup.string().required("It is a  required field"),
    estimatedCost: Yup.string().required("It is a  required field"),
    contractorPayment: Yup.string().required("It is a  required field"),
    profit: Yup.string().required("It is a  required field"),
    serviceType: Yup.string().required("It is a  required field"),
    contractorName: Yup.string().required("It is a  required field"),
  });

  const submitHandler = (values) => {
    props.onClose();
    rowData.id ? props.onEdit(rowData.id, values) : console.log("none");
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
                  Payment Details
                </ModalHeader>
                <ModalCloseButton color={"white"} _focus={"none"} />
                <ModalBody>
                  {/* Step 01 */}
                  <Box w="60%" mt={8}>
                    <SelectField
                      fieldName="adminPaymentStatus"
                      label="Admin Payment Status"
                      placeholder="Contractor Type"
                      type="text"
                      options={adminPaymentStatusCodes}
                      extra={"*"}
                    />
                    <SelectField
                      fieldName="contractorPaymentStatus"
                      label="Contractor Payment Status"
                      placeholder="Original Language"
                      type="text"
                      options={contractorPaymentStatusCodes}
                      extra={"*"}
                    />
                    <InputField
                      fieldName="completionDate"
                      label="Completion Date"
                      placeholder="Deadline"
                      type="datetime-local"
                      extra={"*"}
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
                    _active={"btnActive"}
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
