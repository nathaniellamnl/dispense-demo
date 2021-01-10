import React, { Fragment, useState, useEffect } from 'react';


import Modal from '../../../UI/Modal/Modal';
import Loader from '../../../UI/Loader/Loader';
import cloneDeep from 'lodash/cloneDeep';
import { graphqlServerUrl } from '../../../assets/String';
import classes from './PersonalInfo.module.css';
import Button from '../../../UI/Button/Button';


const initialState = {
  caseCode: { touched: false, error: false, value: "" },
  chineseName: { touched: false, error: false, value: "" },
  englishName: { touched: false, error: false, value: "" },
  age: { touched: false, error: false, value: "" },
  contactNumber: { touched: false, error: false, value: "" },
  dateOfRegistration: { touched: false, error: false, value: "" },
  address: { touched: false, error: false, value: "" },
  allergy: { touched: false, error: false, value: "" },
  adverseDrugReaction: { touched: false, error: false, value: "" },
  remark: { touched: false, error: false, value: "" }
};

const PersonalInfo = (props) => {
  const [personState, setPersonState] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  useEffect(() => {
    const route = /[\/]patient[\/]existing[\/].+/

    if (route.test(window.location.pathname)) {
      const requestBody = {
        query: `  
             query {
               patients(_id:"${window.location.pathname.split('/')[3]}") {
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
      setIsLoading(true);
      fetch(graphqlServerUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('dispenseToken')
        }
      }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          setIsLoading(false);
          alert("error");
        }
        return res.json();
      }).then(resData => {
        setPersonState({
          caseCode: { touched: false, error: false, value: resData.data.patients[0].caseCode },
          chineseName: { touched: false, error: false, value: resData.data.patients[0].chineseName },
          englishName: { touched: false, error: false, value: resData.data.patients[0].englishName },
          age: { touched: false, error: false, value: resData.data.patients[0].age },
          contactNumber: { touched: false, error: false, value: resData.data.patients[0].contactNumber },
          dateOfRegistration: { touched: false, error: false, value: resData.data.patients[0].dateOfRegistration ? new Date(resData.data.patients[0].dateOfRegistration).toISOString().substring(0, 10) : "" },
          address: { touched: false, error: false, value: resData.data.patients[0].address },
          allergy: { touched: false, error: false, value: resData.data.patients[0].allergy },
          adverseDrugReaction: { touched: false, error: false, value: resData.data.patients[0].adverseDrugReaction },
          remark: { touched: false, error: false, value: resData.data.patients[0].remark }
        });
        setIsLoading(false);
      }).catch(err => {
        setIsLoading(false);
        alert(err);
      })
    } else {
      setPersonState(initialState);
    }

  }, [window.location.pathname]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let dateOfRegistration = "";

    if (personState.dateOfRegistration.value.length > 0) {
      dateOfRegistration = new Date(personState.dateOfRegistration.value).toISOString();
    }

    const personStateCopy = cloneDeep(personState);
    let error = false;
    for (const key in personStateCopy) {
      error = error || validation(key, personStateCopy[key].value);
      personStateCopy[key].touched = true;
      personStateCopy[key].error = validation(key, personStateCopy[key].value);
    }


    if (error) {
      setPersonState({ ...personStateCopy });
      return;
    }

    let requestBody;

    if (props.routeName === "/patient/new") {
      requestBody = {
        query: `
           mutation {
            createPatient (
               patientInfoInput:{
                caseCode: "${personState.caseCode.value}" ,
                chineseName:"${personState.chineseName.value}",
                englishName: "${personState.englishName.value}",
                age:"${String.valueOf(personState.age.value)}",
                contactNumber:"${personState.contactNumber.value}",
                dateOfRegistration:"${dateOfRegistration}",
                address: "${personState.address.value}",
                allergy: "${personState.allergy.value}",
                adverseDrugReaction: "${personState.adverseDrugReaction.value}",
                remark: "${personState.remark.value}"           
                }) {
               age
             }
           }
        `
      };
    } else {
      requestBody = {
        query: `
           mutation {
            updatePatient (
              _id:"${window.location.pathname.split('/')[3]}",
               patientInfoInput:{
                caseCode: "${personState.caseCode.value}" ,
                chineseName:"${personState.chineseName.value}",
                englishName: "${personState.englishName.value}",
                age:"${personState.age.value}",
                contactNumber:"${personState.contactNumber.value}",
                dateOfRegistration:"${dateOfRegistration}",
                address: "${personState.address.value}",
                allergy: "${personState.allergy.value}",
                adverseDrugReaction: "${personState.adverseDrugReaction.value}",
                remark: "${personState.remark.value}"           
                }) {
               age
             }
           }
        `
      };
    }

    setIsLoading(true);
    fetch(graphqlServerUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('dispenseToken')
      }
    }).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      return res.json();
    }).then(resData => {
      if (resData.errors) {
        alert(resData.errors);
      } else if (props.routeName === "/patient/new") {
        setShowUploadSuccess(true);
        setPersonState(initialState);
      } else {
        //update patient sidebar
        props.updateInfo(window.location.pathname.split('/')[3], {
          caseCode: personStateCopy.caseCode.value,
          englishName: personStateCopy.englishName.value,
          chineseName: personState.chineseName.value
        });
        setShowUploadSuccess(true);
      }

      setIsLoading(false);

    }).catch(err => {

      setIsLoading(false);
      alert("An unexpected error occured!");
    })

  }

  const NKDAHandler = () => {
    setPersonState({ ...personState, allergy: { ...personState.allergy, value: "No Known Drug Allergy" } });
  }

  const onInputChangeHandler = (field, event) => {
    setPersonState({ ...personState, [field]: { touched: true, value: event.target.value, error: validation(field, event.target.value) } });
  }

  const validation = (field, value) => {
    let error = false;
    if (field === "age") {
      error = value && value.replaceAll(" ", "").length > 0 && (+value) >= 0 && (+value) <= 120 ? false : true;
    } else if (field === "contactNumber") {
      const regex = new RegExp(/^\+?[0-9]+$/);
      error = !regex.test(value.replaceAll(" ", ""));
    } else if (field === "caseCode") {
      error = value.replaceAll(" ", "").length === 0 ? true : false;
    }
    return error;
  }

  const closeModalHandler = () => {
    setShowUploadSuccess(false);
  }

  let errorMsg = <p style={{ color: "#f44336", margin: "2px" }}>Invalid</p>;

  return (
    <Fragment>
      {isLoading ? <div className={classes["form-container"]}> <Loader /> </div> :
        <form className={classes["form-container"]} onSubmit={onSubmitHandler}>
          <Modal show={showUploadSuccess} modalClosed={closeModalHandler}>
            <div className={classes["success-text"]}>
              <p>Success!</p>
              <button  type="button" onClick={closeModalHandler} className={classes.button}>Confirm</button>
            </div>
          </Modal>
          <section className={classes["info-item"]}>
            <label htmlFor="caseCode">Case Code:</label>
            <input
              className={personState.caseCode.error && personState.caseCode.touched ? classes["error"] : null}
              type="text"
              id="caseCode"
              name="caseCode"
              value={personState.caseCode.value}
              onChange={(event) => onInputChangeHandler("caseCode", event)} ></input>
            {personState.caseCode.error && personState.caseCode.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="chineseName">Chinese Name:</label>
            <input
              className={personState.chineseName.error && personState.chineseName.touched ? classes["error"] : null}
              type="text"
              id="chineseName"
              name="chineseName"
              value={personState.chineseName.value}
              onChange={(event) => onInputChangeHandler("chineseName", event)}></input>
            {personState.chineseName.error && personState.chineseName.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="englishName">English Name:</label>
            <input
              className={personState.englishName.error && personState.englishName.touched ? classes["error"] : null}
              type="text"
              id="englishName"
              name="englishName"
              value={personState.englishName.value}
              onChange={(event) => onInputChangeHandler("englishName", event)}></input>
            {personState.englishName.error && personState.englishName.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="age">Age:</label>
            <input
              className={personState.age.error && personState.age.touched ? classes["error"] : null}
              type="number"
              id="age"
              name="age"
              value={personState.age.value}
              onChange={(event) => onInputChangeHandler("age", event)}></input>
            {personState.age.error && personState.age.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              className={personState.contactNumber.error && personState.contactNumber.touched ? classes["error"] : null}
              type="phone"
              id="contactNumber"
              name="contactNumber"
              value={personState.contactNumber.value}
              onChange={(event) => onInputChangeHandler("contactNumber", event)}></input>
            {personState.contactNumber.error && personState.contactNumber.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="regDate">Date of Registration</label>
            <input
              className={personState.dateOfRegistration.error && personState.dateOfRegistration.touched ? classes["error"] : null}
              type="date"
              id="regDate"
              name="regDate"
              value={personState.dateOfRegistration.value}
              onChange={(event) => onInputChangeHandler("dateOfRegistration", event)}></input>
            {personState.dateOfRegistration.error && personState.dateOfRegistration.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="address">Address:</label>
            <textarea
              className={personState.address.error && personState.address.touched ? classes["error"] : null}
              type="text"
              id="address"
              name="address"
              value={personState.address.value}
              onChange={(event) => onInputChangeHandler("address", event)}></textarea>
            {personState.address.error && personState.address.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="allergy" >Allergy:</label>
            <div className={classes.NKDA_item} onClick={NKDAHandler}>NKDA</div>
            <textarea
              className={personState.allergy.error && personState.allergy.touched ? classes["error"] : null}
              id="allergy"
              name="allergy"
              rows="4"
              cols="20"
              value={personState.allergy.value}
              onChange={(event) => onInputChangeHandler("allergy", event)}></textarea>
            {personState.allergy.error && personState.allergy.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="adr">Adverse Drug Reaction:</label>
            <textarea
              className={personState.adverseDrugReaction.error && personState.adverseDrugReaction.touched ? classes["error"] : null}
              id="adr"
              name="adr"
              rows="4"
              cols="20"
              value={personState.adverseDrugReaction.value}
              onChange={(event) => onInputChangeHandler("adverseDrugReaction", event)}></textarea>
            {personState.adverseDrugReaction.error && personState.adverseDrugReaction.touched ? errorMsg : null}
          </section>
          <section className={classes["info-item"]}>
            <label htmlFor="remark">Remark:</label>
            <textarea
              className={personState.remark.error && personState.remark.touched ? classes["error"] : null}
              id="remark"
              name="remark"
              rows="4"
              cols="20"
              value={personState.remark.value}
              onChange={(event) => onInputChangeHandler("remark", event)}></textarea>
            {personState.remark.error && personState.remark.touched ? errorMsg : null}
          </section>
          <button type="submit" className={classes.button}>{props.routeName === "/patient/new" ? "Create" : "Update"}</button>
        </form>
      }
    </Fragment>
  )
}

export default PersonalInfo;
