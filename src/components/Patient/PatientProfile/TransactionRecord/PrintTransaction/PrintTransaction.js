import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../../../../../assets/Images/Pharmacy.jpg'
import font from '../../../../../assets/Fonts/wangHanZou.ttf';


Font.register({ family: 'WangHanZou', src: font })
Font.registerHyphenationCallback(word => { return [word] });
// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    // justifyContent: 'flex-start'
  },
  header: {
    alignSelf: "center",
    fontFamily: 'WangHanZou',
    fontSize: 10

  },
  text: {
    alignSelf: "center",
    fontFamily: 'WangHanZou',
    fontSize: 10,
    padding: 5
  },
  snippet: {
    marginLeft: 100,
    fontFamily: 'WangHanZou',
    fontSize: 9
  },
  image: {
    marginBottom: 0,
    marginLeft: 20,
    marginTop: 20,
    width: 70,
    height: 50,
    padding: 0
  },
  spacer: {
    marginTop: 20
  },
  table: {
    display: "table",
    width: "90%",
    marginHorizontal: "auto",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  tableRow: {
    marginVertical: 0,
    marginHorizontal: "auto",
    // margin: "auto",   
    flexDirection: "row"
  },
  tableCol: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableCell: {
    marginVertical: 0,
    marginHorizontal: "auto",
    // marginTop: 5,
    fontSize: 10
  },
  text__right: {
    alignSelf: "flex-end",
    fontSize: 10,
    padding: 5
  },
  text__left: {
    alignSelf: "flex-start",
    fontSize: 10,
    padding: 5
  },
  text_reminder: {
    fontFamily: 'WangHanZou',
    alignSelf: "flex-start",
    fontSize: 10,
    color: "grey",
    marginLeft: "10%",
  },
  text_prepay: {
    fontFamily: 'WangHanZou',
    textAlign: "left",
    fontSize: 10,
    marginLeft: "70%",
    marginRight: "20%",
  },
  text_stamp: {
    textAlign: "left",
    fontSize: 9,
    marginLeft: "60%",
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.image} />
      <Text style={styles.header}>Receipt</Text>
      <Text style={styles.header}>Dispensary</Text>
      <Text style={styles.header}>221 B Baker Street</Text>
      <Text style={styles.header}>Dispensary</Text>
      <Text style={styles.header}>Tel:999         Website:www.dispensary.org      Email:support@dispensary.org</Text>
      <Text style={styles.spacer}></Text>
      <Text style={styles.snippet}>Issue Date:</Text>
      <Text style={styles.snippet}>Customer Name:</Text>
      <Text style={styles.spacer}></Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "60%" }]}>
            <Text style={styles.tableCell}>Drug Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Amount (USD)</Text>
          </View>
        </View>
        {/* TableContent */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "60%" }]}>
            <Text style={styles.text__left}>Eliquis (Apixaban) 5mg tablet</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text__right}>644</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text__right}>4,156</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__right}>Total (USD):</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text__right}>4,156</Text>
          </View>
        </View>
      </View>
      <Text style={styles.spacer}></Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__left}>Payment</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={[styles.tableCell,{padding: 5}]}>Amount (USD)</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__left}>Transaction date: October 30, 2020</Text>
          </View>
          <View style={styles.tableCol}>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__right}>Total amount paid(USD):</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text__right}>4,186</Text>
          </View>
        </View>
      </View>
      <Text style={styles.spacer}></Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Signature :____________________</Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Date :____________________</Text>
      <Text style={styles.spacer}></Text>   
    </Page>
  </Document>
);

export default MyDocument;