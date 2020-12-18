import React, { useEffect, useState, Fragment } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

import drugChart from '../../../../../assets/DrugChart';
import logo from '../../../../../assets/Images/Pharmacy.jpg'
import font from '../../../../../assets/Fonts/wangHanZou.ttf';
import { graphqlServerUrl } from '../../../../../assets/String';
import Loader from '../../../../../UI/Loader/Loader';


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
    padding: 4
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
const PrintTransaction = (props) => {
  const [transaction, setTransaction] = useState();
  // [{transactionDate: null, customerName: null}]
  useEffect(() => {
    const transactionId = window.location.pathname.split("/")[2]
    const requestBody = {
      query: `
           query Transactions($id:ID) {
             transactions(_id:$id) {
              _id
              transactionDate
              drugs
              quantities
              remark
              amount
              customerName
             }
           }
        `,
      variables: {
        id: transactionId
      }
    };
    fetch(graphqlServerUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("dispenseToken")
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    }).then(resData => {

      const transaction = resData.data.transactions[0];

      const tranformedDrugs = [];

      for (let i = 0; i < transaction.drugs.length; i++) {
        for(let j = 0; j < drugChart.length; j++) {
          if(drugChart[j].name === transaction.drugs[i]){
            tranformedDrugs.push({ drug: transaction.drugs[i], quantity: transaction.quantities[i], price: drugChart[j].price});    
            break;
          }
        }
      }

      const transformedTransaction = {
        ...transaction,
        drugs: tranformedDrugs
      };

      setTransaction(transformedTransaction);
    }).catch(err => {

    })
  }, [])

  return (
    <Fragment>
      {transaction ?
        (
          <PDFViewer width="100%" height="1000vh" {...props}>
            <Document> 
              <Page size="A4" style={styles.page} >
                <Image src={logo} style={styles.image} />
                <Text style={styles.header}>Receipt</Text>
                <Text style={styles.header}>Dispensary</Text>
                <Text style={styles.header}>221 B Baker Street</Text>
                <Text style={styles.header}>Dispensary</Text>
                <Text style={styles.header}>Tel:999         Website:www.exampledispensary.org      Email:support@exampledispensary.org</Text>
                <Text style={styles.spacer}></Text>
                <Text style={styles.snippet}>Issue Date: {transaction.transactionDate.substring(0, 10)}</Text>
                <Text style={styles.snippet}>Customer Name: {transaction.customerName}</Text>
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
                  {transaction.drugs.map(drug => {

                    return (<View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: "60%" }]}>
                        <Text style={styles.text__left}>{drug.drug}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.text__right}>{drug.quantity}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.text__right}>{(+drug.price)*(+drug.quantity)}</Text>
                      </View>
                    </View>
                    )
                  })}

                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: "75%" }]}>
                      <Text style={styles.text__right}>Total (USD):</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.text__right}>{transaction.amount}</Text>
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
                      <Text style={[styles.tableCell, { padding: 5 }]}>Amount (USD)</Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: "75%" }]}>
                      <Text style={styles.text__left}>Transaction date: {transaction.transactionDate.substring(0, 10)}</Text>
                    </View>
                    <View style={styles.tableCol}>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={[styles.tableCol, { width: "75%" }]}>
                      <Text style={styles.text__right}>Total amount paid(USD):</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.text__right}>{transaction.amount}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.spacer}></Text>
                <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Signature :____________________</Text>
                <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Date :____________________</Text>
                <Text style={styles.spacer}></Text>
              </Page>
            </Document>
          </PDFViewer>) : <Loader/>}
  )
    </Fragment>
  )
};

export default PrintTransaction;