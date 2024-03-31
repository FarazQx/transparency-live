import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Define your styles
const styles = StyleSheet.create({
  body: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 12,
    color: 'grey',
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  invoiceTo: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethod: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentInstructions: {
    marginBottom: 20,
  },
  termsAndConditions: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  rushFee: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 20,
  },
  subtotalMsg: {
    marginBottom: 20,
  },
  totalThank: {
    fontSize: 20,
    marginBottom: 20,
  },
  authorized: {
    width: '40%',
    textAlign: 'center',
    borderTopWidth: 2,
    borderTopColor: 'black',
    paddingTop: 13,
    marginTop: 80,
    fontWeight: 'bold',
    fontSize: 19,
  },
  allTotal: {
    padding: '5px 100px',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 5,
    textAlign: 'center',
  },
});

const AssignmentForm = ({ quoteNumber, issueDate, branch, quoteTo, phoneNumber, email, address, rushFee, subtotal, billref }) => (
  <Document>
    <Page size="A4">
      <View style={styles.body}>
        <View style={styles.header}>
          {/* <Image src="" /> */}
        </View>
        <View style={styles.companyName}><Text>TRANSPARENCY LANGUAGE INC</Text></View>
        <View style={styles.invoiceTo}><Text>QUOTE TO: {quoteTo}</Text></View>
        <View style={styles.paymentDetails}>
          <View style={styles.customerDetails}>
            <Text>Phone: {phoneNumber}</Text>
            <Text>Email: {email}</Text>
            <Text>Address: {address}</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text>Quote No: {quoteNumber}</Text>
            <Text>Issue Date: {issueDate}</Text>
            <Text>Branch Name: {branch}</Text>
            <Text>Billing Reference: {billref}</Text>
          </View>
        </View>
        <View style={styles.paymentInstructions}>
          <Text>
            Thank you for expressing interest in our written translation services. The quoted price encompasses translation, proofreading, formatting
            (as specified), and project management costs. If the terms and project parameters outlined below align with your requirements, kindly
            furnish comprehensive billing details and affix your signature to the authorization below, enabling us to initiate the commencement of the
            project. Should you have any queries, please do not hesitate to contact me at info@transparencylanguage.com.
          </Text>
        </View>
        <View>
          <Text>TRANSLATION SERVICE TYPE</Text>
          <Text>SOURCE LANGUAGE</Text>
          <Text>TARGET LANGUAGE</Text>
          <Text>COST</Text>
          {/* Add table rows as needed */}
        </View>
        <View style={styles.termsAndConditions}><Text>TERMS AND CONDITIONS</Text></View>
        <View style={styles.rushFee}><Text>Rush Fee: {rushFee}</Text></View>
        <View style={styles.subtotalMsg}>
          <Text>Please send payment within 30 days of receiving this invoice</Text>
          <Text>Subtotal: {subtotal}</Text>
        </View>
        <View style={styles.totalThank}><Text>THANK YOU FOR YOUR BUSINESS</Text></View>
        <View style={styles.authorized}><Text>AUTHORIZED SIGNATURE</Text></View>
      </View>
      <Text style={styles.footer}>Footer Content Here</Text>
    </Page>
  </Document>
);

export default AssignmentForm;
