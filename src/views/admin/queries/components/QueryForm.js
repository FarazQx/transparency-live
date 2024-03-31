/*eslint-disable*/
import React, { useState } from "react";
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
  Text,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react'
import InputField from "components/fields/InputField";
import TextArea from "components/fields/TextArea";
import SelectField from "components/fields/SelectField";
import RadioField from 'components/fields/RadioField';
import DocumentField from 'components/fields/DocumentField';
// Formik imports
import { Formik, Form } from "formik";
import * as Yup from 'yup';

const options = [
  { value: '1', text: 'Alabama' },
  { value: '2', text: 'Alaska' },
  { value: '3', text: 'Arizona' },
  { value: '4', text: 'Arkansas' },
  { value: '5', text: 'California' },
  { value: '6', text: 'Colorado' },
  { value: '7', text: 'Connecticut' },
  { value: '8', text: 'Delaware' },
  { value: '9', text: 'Florida' },
  { value: '10', text: 'Georgia' },
  { value: '11', text: 'Hawaii' },
  { value: '12', text: 'Idaho' },
  { value: '13', text: 'Illinois' },
  { value: '14', text: 'Indiana' },
  { value: '15', text: 'Iowa' },
  { value: '16', text: 'Kansas' },
  { value: '17', text: 'Kentucky' },
  { value: '18', text: 'Louisiana' },
  { value: '19', text: 'Maine' },
  { value: '20', text: 'Maryland' },
  { value: '21', text: 'Massachusetts' },
  { value: '22', text: 'Michigan' },
  { value: '23', text: 'Minnesota' },
  { value: '24', text: 'Mississippi' },
  { value: '25', text: 'Missouri' },
  { value: '26', text: 'Montana' },
  { value: '27', text: 'Nebraska' },
  { value: '28', text: 'Nevada' },
  { value: '29', text: 'New Hampshire' },
  { value: '30', text: 'New Jersey' },
  { value: '31', text: 'New Mexico' },
  { value: '32', text: 'New York' },
  { value: '33', text: 'North Carolina' },
  { value: '34', text: 'North Dakota' },
  { value: '35', text: 'Ohio' },
  { value: '36', text: 'Oklahoma' },
  { value: '37', text: 'Oregon' },
  { value: '38', text: 'Pennsylvania' },
  { value: '39', text: 'Rhode Island' },
  { value: '40', text: 'South Carolina' },
  { value: '41', text: 'South Dakota' },
  { value: '42', text: 'Tennessee' },
  { value: '43', text: 'Texas' },
  { value: '44', text: 'Utah' },
  { value: '45', text: 'Vermont' },
  { value: '46', text: 'Virginia' },
  { value: '47', text: 'Washington' },
  { value: '48', text: 'West Virginia' },
  { value: '49', text: 'Wisconsin' },
  { value: '50', text: 'Wyoming' },
];  
 const optionsGender = [
  { value: '1', text: 'Male' },
  { value: '2', text: 'Female' },
  { value: '3', text: 'Other' },
];
const optionsCountry = [
  { value: '1', text: 'United States' },
  { value: '2', text: 'Pakistan' },
];
const optionsNature = [
  { value: '1', text: 'Medical' },
];
const steps = [
  { title: 'First', description: 'Billing Details' },
  { title: 'Second', description: 'Personal Details' },
  { title: 'Third', description: 'Query Details' },
];

const validationSchema = Yup.object().shape({
// Step 01 - Billing Details
CompanyName: Yup.string().required('Company / Agency Name is required'),
BilingName: Yup.string().required('Billing Name is required'),
BilingEmail: Yup.string().email('Invalid email address').required('Billing Email is required'),
BilingAddress: Yup.string().required('Billing Address is required'),
BilingCity: Yup.string().required('City is required'),
BilingState: Yup.string().required('State is required'),
ZipCode: Yup.string().required('Zip Code is required'),
BilingCountry: Yup.string().required('Country is required'),

 // Step 02 - Personal Details
 FirstName: Yup.string().required('Requester First Name is required'),
 LastName: Yup.string().required('Requester Last Name is required'),
 Email: Yup.string().email('Invalid email address').required('Personal Email is required'),
 Phone: Yup.string().required('Phone Number is required'),
 Gender: Yup.string().required('Gender is required'),
 Address: Yup.string().required('Your Address is required'),
 City: Yup.string().required('City is required'),
 State: Yup.string().required('State is required'),
 ZipCodePersonal: Yup.string().required('Zip Code is required'),
 Country: Yup.string().required('Country is required'),
});

export default function QueryForm(props) {
  // const rowData = props.rowData.values;
  const rowData = props.rowData ?? {};
  
  const initialValues = {
    
    FirstName: rowData?.firstName ?? '',
    LastName: rowData?.lastName ?? '',
    Email: rowData?.email ?? '',
    Phone: rowData?.phone ?? '',
    CompanyName: rowData?.companyName ?? '',
    BilingName: rowData?.bilingName ?? '',
    BilingEmail: rowData?.bilingEmail ?? '',
    BilingAddress: rowData?.bilingAddress ?? '',
    BilingCity: rowData?.bilingCity ?? '',
    ZipCode: rowData?.zipCode ?? '',
    Gender: rowData?.gender ?? '',
    Address: rowData?.address ?? '',
    City: rowData?.city ?? '',
    Country: rowData?.country ?? '',
    ZipCodePersonal: rowData?.zipCodePersonal ?? '',
    ServiceType: rowData?.serviceType ?? '',
    ExistingCustomer: rowData?.existingCustomer ?? '',
    OriginalLanguage: rowData?.originalLanguage ?? '',
    RequestedLanguage: rowData?.requestedLanguage ?? '',
    RequestedTime: rowData?.requestedTime ?? '',
    TranslationType: rowData?.translationType ?? '',
    Deadline: rowData?.deadline ?? '',
    Certification: rowData?.certification ?? '',
    AdditionalNotes: rowData?.additionalNotes ?? '',
    Affidavit: rowData?.affidavit ?? '',
    DocumentToTranslate: rowData?.translationDocuments ?? '', // This field is not provided in the data
    InterpretationType: rowData?.interpretationType ?? '',
    InterpretationMode: rowData?.interpretationMode ?? '',
    AppointmentDate: rowData?.appointmentDate ?? '', // These fields are not provided in the data
    AppointmentTime: rowData?.appointmentTime ?? '',
    Duration: rowData?.duration ?? '',
    AppointmentAddress: rowData?.appointmentAddress ?? '',
    AppointmentNature: rowData?.appointmentNature ?? '',
    OnlinePlatform: rowData?.onlinePlatform ?? '',
    JobStatus: rowData?.jobStatus ?? '',
    QueryStatus: rowData?.queryStatus ?? '',
    DocumentFile: '', // These fields are not provided in the data
    DocumentFileSrc: '',
    DocumentName: ''
  };  

  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  const submitHandler = (values) => {
    props.onClose();
    rowData.id ? props.onEdit(rowData.id, values) : props.onAdd(values);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={values => {
              submitHandler(values);
            }}
          >
          {({ errors, touched, values }) => (
            <Form>
              <ModalHeader bg={'primaryGradient'} color={'white'}>Query Details</ModalHeader>
              <ModalCloseButton color={'white'} _focus={'none'} />
              <ModalBody>

                <Stepper index={step} colorScheme={'green'} mt={4}>
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>
              
                        <Box flexShrink='0'>
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </Box>
              
                        <StepSeparator />
                      </Step>
                    ))}
                </Stepper>

            {/* Step 01 */}
            {step === 1 && (
            <Box w="60%" mt={8}>
              <Text fontWeight={'semibold'} my={4}>Billing Details</Text>
              <InputField fieldName="CompanyName" label="Company / Agency Name" placeholder="Agency Name" type="text" extra={'*'} />
              <InputField fieldName="BilingName" label="Billing Name" placeholder="Billing Name" type="text" extra={'*'} />
              <InputField fieldName="BilingEmail" label="Billing Email" placeholder="jonas@email.com" type="text" extra={'*'} />
              <TextArea fieldName="BilingAddress" label="Billing Address" placeholder="Address" type="text" extra={'*'} />
              <InputField fieldName="BilingCity" label="City" placeholder="City" type="text" extra={'*'} />
              <SelectField fieldName="BilingState" label="State" placeholder="State"  options={options} extra={'*'} />
              <InputField fieldName="ZipCode" label="Zip Code" placeholder="54289" type="number" extra={'*'} />
              <SelectField fieldName="BilingCountry" label="Country" placeholder="Country" type="text" options={optionsCountry} extra={'*'} />
            </Box>
            )}

            {/* Step 02 */}
            {step === 2 && (
            <Box w="60%" mt={8}>
              <Text fontWeight={'semibold'} my={4}>Personal Details</Text>
              <InputField fieldName="FirstName" label="Requester First Name" placeholder="Jonas" type="text" extra={'*'} />
              <InputField fieldName="LastName" label="Requester Last Name" placeholder="Kakar" type="text" />
              <InputField fieldName="Email" label="Email" placeholder="jonas@email.com" type="text" />
              <InputField fieldName="Phone" label="Phone Number" placeholder="(123) 456-7878" type="text" />
              <SelectField fieldName="Gender" label="Gender" placeholder="Gender" type="text" options={optionsGender} />
              <TextArea fieldName="Address" label="Your Address" placeholder="Address" type="text" />
              <InputField fieldName="City" label="City" placeholder="City" type="text" />
              <SelectField fieldName="State" label="State" placeholder="State"  options={options} />
              <InputField fieldName="ZipCodePersonal" label="Zip Code" placeholder="54289" type="number" />
              <SelectField fieldName="Country" label="Country" placeholder="Country" type="text" options={optionsCountry} />
            </Box>
            )}

            {/* Step 03 */}
            {step === 3 && (
            <Box w="60%" mt={8}>
              <Text fontWeight={'semibold'} my={4}>Query Details</Text>
              <RadioField
                id="service"
                fieldName='ServiceType'
                label="Service Type"
                extra="*"
                options={[
                  { value: "0", label: "Translation" },
                  { value: "1", label: "Interpretation" },
                ]}
              />

              {/* Render additional field if the selected value is "translation" */}
              {values.ServiceType === "0" && (
                <RadioField
                  id="translation_type"
                  label="Translation Type"
                  fieldName="TranslationType"
                  extra="*"
                  options={[
                    { value: "0", label: "Document Translation" },
                    { value: "1", label: "Proofreading" },
                    { value: "2", label: "Web Translation" },
                    { value: "3", label: "Audio/Video Transcription" },
                  ]}
                />
              )}

              {/* Render additional field if the selected value is "interpretation" */}
              {values.ServiceType === "1" && (
              <>
                <RadioField
                  id="interpretation_type"
                  label="Interpretation Type"
                  fieldName="InterpretationType"
                  extra="*"
                  options={[
                    { value: "0", label: "Onsite" },
                    { value: "1", label: "Video" },
                    { value: "2", label: "Phone" },
                  ]}
                />
                <RadioField
                  id="interpretation_mode"
                  label="Interpretation Mode"
                  fieldName="InterpretationMode"
                  extra="*"
                  options={[
                    { value: "0", label: "Consecutive" },
                    { value: "1", label: "Simultaneous" },
                  ]}
                />
              </>  
              )}

              <RadioField
                id="existingclient"
                label="Are you one of our existing client?"
                fieldName="ExistingCustomer"
                extra="*"
                options={[
                  { value: "0", label: "Yes" },
                  { value: "1", label: "No" },
                  { value: "2", label: "Maybe" },
                ]}
              />

              {/* Render additional field if the selected value is "translation" */}
              {values.ServiceType === "0" && (
                <>
                  <InputField fieldName="OriginalLanguage" label="Document Original Language" placeholder="English" type="text" />
                  <InputField fieldName="RequestedLanguage" label="Requesting Written Language" placeholder="Spanish" type="text" />
                  <InputField fieldName="RequestedTime" label="Requested Date" placeholder="Requested Date" type="datetime-local" extra={'*'} />
                  <InputField fieldName="Deadline" label="Deadline" placeholder="Deadline" type="datetime-local" extra={'*'} />
                  <RadioField
                    id="certification"
                    fieldName="Certification"
                    label="Is the document required certification? "
                    extra="*"
                    options={[
                      { value: "0", label: "Yes" },
                      { value: "1", label: "No" },
                    ]}
                  />
                </> 
              )}
              
              {/* Render additional field if the selected value is "yes" */}
              {values.ServiceType === "0" && values.Certification === "0" && (
                <RadioField
                  id="affidavit"
                  label="We provide affidavit by state notary public, is that something you need?"
                  extra="*"
                  options={[
                    { value: "0", label: "Yes" },
                    { value: "1", label: "No" },
                  ]}
                />
              )}

              {/* Render additional field if the selected value is "onsite" */}
              {values.ServiceType === "1" && values.InterpretationType === "0" && (
              <>
                <InputField fieldName="AppointmentDate" label="Appointment Date" placeholder="Appointment Date" type="date" extra={'*'} />
                <InputField fieldName="AppointmentTime" label="Appointment Time" placeholder="Appointment Time" type="time" extra={'*'} />
                <InputField fieldName="Duration" label="Appointment Duration" placeholder="Appointment Name" type="text" extra={'*'} />
                <TextArea fieldName="AppointmentAddress" label="Appointment Address" placeholder="Appointment Address" type="text" extra={'*'} />
                <SelectField fieldName="AppointmentNature" label="Nature of Appointment" placeholder="Nature" options={optionsNature} />
              </>  
              )}

              {/* Render additional field if the selected value is "video" */}
              {values.ServiceType === "1" && values.InterpretationType === "1" && (
              <>
                <InputField fieldName="AppointmentDate" label="Appointment Date" placeholder="Appointment Date" type="date" extra={'*'} />
                <InputField fieldName="AppointmentTime" label="Appointment Time" placeholder="Appointment Time" type="time" extra={'*'} />
                <InputField fieldName="Duration" label="Appointment Duration" placeholder="Appointment Name" type="text" extra={'*'} />
                <RadioField
                id="video_interpretation_type"
                label="Interpretation Type"
                extra="*"
                options={[
                  { value: "0", label: "Zoom Meeting" },
                  { value: "1", label: "Google Meet" },
                  { value: "2", label: "Microsoft Teams" },
                  { value: "3", label: "Others" },
                ]}
              />
                <SelectField fieldName="AppointmentNature" label="Nature of Appointment" placeholder="Nature" options={optionsNature} />
              </>  
              )}

              {/* Render additional field if the selected value is "phone" */}
              {values.ServiceType === "1" && values.InterpretationType === "2" && (
              <>
                <InputField fieldName="AppointmentDate" label="Appointment Date" placeholder="Appointment Date" type="date" extra={'*'} />
                <InputField fieldName="AppointmentTime" label="Appointment Time" placeholder="Appointment Time" type="time" extra={'*'} />
                <InputField fieldName="Duration" label="Appointment Duration" placeholder="Appointment Duration" type="text" extra={'*'} />
                <SelectField fieldName="AppointmentNature" label="Nature of Appointment" placeholder="Nature" options={optionsNature} />
              </>  
              )}
              
              <TextArea fieldName="AdditionalNotes" label="Additional Note (if any)" placeholder="Your comment" type="text" />

              {/* Render additional field if the selected value is "translation" */}
              {values.ServiceType === "0" && (
                  <DocumentField fieldName="Name" label="Please attach the document you want to translate" extra={'*'} />
              )}

            </Box>
            )}
            
          </ModalBody>

          <ModalFooter>
            <Button
             colorScheme='green' variant='outline' mr={3} borderRadius={'8px'}
              onClick={() => {
                // Update the step and progress accordingly
                setStep(step - 1);
                setProgress(progress - 33.33);
              }}
              // Disable the button when step is 1
              isDisabled={step === 1}
            >
              Back
            </Button>
            {step !== 3 && (
              <Button
                bg={'primaryBtn'}
                color={'white'}
                _hover={'btnHover'}
                _ active={'btnActive'}
                borderRadius='8px'
                variant='solid'
                // isDisabled={Object.keys(errors).length > 0}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
              >
                Next
              </Button>
            )}
            {step === 3 && (
              <Button
              bg={'primaryBtn'}
              color={'white'}
              _hover={'btnHover'}
              _ active={'btnActive'}
              borderRadius='8px'
              variant='solid'
              type="submit"
              >
                Save
              </Button>
            )}
            
          </ModalFooter>
          </Form>
          )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}