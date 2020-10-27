import React, { useRef, useState, useEffect } from 'react';

import { graphqlServerUrl } from '../../../assets/String';
import classes from './PersonalInfo.module.css';

const PersonalInfo = (props) => {
  const [personState, setPersonState] = useState('');

  useEffect(() => {
    const route = /[\/]patient[\/]existing[\/].+/

    if (route.test(window.location.pathname)) {
      const requestBody = {
        query: `  
             query {
               patients(_id:"${window.location.pathname.split('/')[4]}") {
                caseCode
                chineseName 
                englishName
                age
                contactNumber
                dateOfRegistration
                address
                allergy
                adverseDrugReaction
                remark
                updatedAt
               }
             }
          `
      };
      fetch(graphqlServerUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");

        }
        return res.json();
      }).then(resData => {
        setPersonState([...resData.data.patients]);

      }).catch(err => {
        console.log(err);
      })
    }

  }, [window.location.pathname]);

  useEffect(() => {
    if (personState) {
      personState.map(state => {
        caseCode.current.value = state.caseCode;
        chineseName.current.value = state.chineseName;
        age.current.value = state.age;
        contactNumber.current.value = state.contactNumber;
        dateOfReg.current.value = state.dateOfRegistration;
        address.current.value = state.address;
        allergy.current.value = state.allergy;
        adr.current.value = state.adverseDrugReaction;
        remark.current.value = state.remark;
      })
    }

  }, [personState])


  const caseCode = useRef();
  const chineseName = useRef();
  const englishName = useRef();
  const age = useRef();
  const contactNumber = useRef();
  const dateOfReg = useRef();
  const address = useRef();
  const allergy = useRef();
  const adr = useRef();
  const remark = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const caseCodeValue = caseCode.current.value;
    const chineseNameValue = chineseName.current.value;
    const englishNameValue = englishName.current.value;
    const ageValue = age.current.value;
    const contactNumberValue = contactNumber.current.value;
    let dateOfRegValue = dateOfReg.current.value;
    const addressValue = address.current.value;
    const allergyValue = allergy.current.value;;
    const adrValue = adr.current.value;
    const remarkValue = remark.current.value;;

    if (dateOfRegValue.length > 0) {
      dateOfRegValue = new Date(dateOfRegValue).toISOString();
    }

    const fx = props.routeName === "/patient/new"? "createPatient":"updatePatient";
    const id = props.routeName === "/patient/new"? null: `_id:"${window.location.pathname.split('/')[4]}",`;
    const requestBody = {
      query: `
         mutation {
             ${fx} (
             ${id}  
             patientInfoInput:{
              caseCode: "${caseCodeValue}" ,
              chineseName:"${chineseNameValue}",
              englishName: "${englishNameValue}",
              age:"${ageValue}",
              contactNumber:"${contactNumberValue}",
              dateOfRegistration:"${dateOfRegValue}",
              address: "${addressValue}",
              allergy: "${allergyValue}",
              adverseDrugReaction: "${adrValue}",
              remark: "${remarkValue}"           
              }) {
             age
           }
         }
      `
    };

    fetch(graphqlServerUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    }).then(resData => {

    }).catch(err => {
      console.log(err);
    })

  }

  const NKDAHandler = () => {
    allergy.current.value = "No Known Drug Allergy";
  }

  return (
    <form className={classes.form_container} onSubmit={onSubmitHandler}>
      <div className={classes.info_item}>
        <label htmlFor="caseCode">Case Code:</label>
        <input type="text" id="caseCode" name="caseCode" ref={caseCode}  ></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="chineseName">Chinese Name:</label>
        <input type="text" id="chineseName" name="chineseName" ref={chineseName} ></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="englishName">English Name:</label>
        <input type="text" id="englishName" name="englishName" ref={englishName}></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" ref={age}></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="contactNumber">Contact Number:</label>
        <input type="text" id="contactNumber" name="contactNumber" ref={contactNumber}></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="regDate">Date of Registration</label>
        <input type="date" id="regDate" name="regDate" ref={dateOfReg}></input>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="address">Address:</label>
        <textarea type="text" id="address" name="address" ref={address}></textarea>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="allergy" >Allergy:</label>
        <div className={classes.NKDA_item} onClick={NKDAHandler}>NKDA</div>
        <textarea id="allergy" name="allergy" rows="4" cols="20" ref={allergy}></textarea>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="adr">Adverse Drug Reaction:</label>
        <textarea id="adr" name="adr" rows="4" cols="20" ref={adr}></textarea>
      </div>
      <div className={classes.info_item}>
        <label htmlFor="remark">Remark:</label>
        <textarea id="remark" name="remark" rows="4" cols="20" ref={remark}></textarea>
      </div>
      <div className={classes.spacer} />
      <div className={classes.button_container}>
        <button type="submit">{props.routeName === "/patient/new" ? "Create" : "Update"}</button>
      </div>
    </form>
  )
}

export default PersonalInfo;
