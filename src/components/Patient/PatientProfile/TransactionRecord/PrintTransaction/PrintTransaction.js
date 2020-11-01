import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../../../../../assets/Images/hkpcfLogo.jpg'
import font from '../../../../../assets/Fonts/wangHanZou.ttf';

Font.register({ family: 'WangHanZou', src: font })

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
    //  alignSelf: "flex-end",
    textAlign:"center",
    fontSize: 10,
    marginLeft: "60%",
    marginRight: 20
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.image} />
      <Text style={styles.header}>Official Receipt</Text>
      <Text style={styles.header}>SafeMed Dispensary 配安心藥房</Text>
      <Text style={styles.header}>O/B The Hong Kong Pharmaceutical Care Foundation LTD.</Text>
      <Text style={styles.header}>九龍荔枝角長沙灣道889號華創中心7樓3及4工作室1號房</Text>
      <Text style={styles.header}>Room 1,Workshop3&4, 7th Floor, CRE Centre, 889 Cheung Sha Wan Road, Lai Chi Kok, Kowloon</Text>
      <Text style={styles.header}>SafeMed Dispensary 配安心藥房</Text>
      <Text style={styles.header}>Tel:2979 0380      Fax:3708 8553      Website:www.pcfhk.org      Email:info@pcfhk.org</Text>
      <Text style={styles.spacer}></Text>
      <Text style={styles.snippet}>Issue Date:                                           Receipt No.:</Text>
      <Text style={styles.snippet}>Customer Name:                                          Rx No.:</Text>
      <Text style={styles.snippet}>Customer No.:</Text>
      <Text style={styles.spacer}></Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "45%" }]}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Unit Price (HKD)</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Amount (HKD)</Text>
          </View>
        </View>
        {/* TableContent */}
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "45%" }]}>
            <Text style={styles.text__left}>Eliquis (Apixaban) 5mg tablet</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>5 x 56 Tablets</Text>
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
            <Text style={styles.text__right}>Total (HKD):</Text>
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
            <Text style={styles.text__left}>Payment Method</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Amount (HKD)</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__left}>Direct deposit:</Text>
            <Text style={[styles.text__left, { fontFamily: 'WangHanZou' }]}>Bank Name: HSBC 匯豐銀行</Text>
            <Text style={styles.text__left}>Account name: The Hong Kong Pharmaceutical Care Foundation</Text>
            <Text style={styles.text__left}>Account no.:582-360863-001</Text>
            <Text style={styles.text__left}>Transfer date: October 30, 2020</Text>
          </View>
          <View style={styles.tableCol}>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, { width: "75%" }]}>
            <Text style={styles.text__right}>Total amount paid(HKD):</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.text__right}>HK$4,186</Text>
          </View>
        </View>
      </View>
      <Text style={styles.text_reminder}>本人已經閱讀及同意接受配安心藥房的藥物資助計劃或一般購藥的各個事項及安排。</Text>
      <Text style={styles.text_reminder}>備註: 藥物一經購買，恕不更換、退還及退款。</Text>
      <Text style={styles.text_prepay}>2020年10月23日先領取56粒Eliquis5mg尚欠75粒藥物未領取。餘下56粒藥物需待獲得下一張有效的醫生處方方可領取。</Text>
      <Text style={styles.text_prepay}>
        本人明白如果將來覆診有任何藥物或劑量變更，令本人無法獲得有效的醫生處方領取剩餘藥物，剩餘藥物將無法退款。
      </Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Acknowledged by customer (顧客確認):</Text>
      <Text style={styles.spacer}></Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Signature (簽署):____________________</Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>Date (日期):____________________</Text>
      <Text style={[styles.text__left, { marginLeft: "10%", fontFamily: "WangHanZou" }]}>______年___月___日領取餘下______粒藥物。已領取本單所有藥物。</Text>
    </Page>
  </Document>
);

export default MyDocument;