import React, { Fragment, useState } from 'react';
import buttonClasses from '../../UI/Button/Button.module.css';
import classes from './Calculator.module.css';
import { graphqlServerUrl } from "../../assets/String";

const Calculator = (props) => {

    const [drugInfo, setDrugInfo] = useState({ name: "", price: "", quantity: "" });

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        price: false,
    })
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (value) => {
        if (value && value !== "") {
            return false;
        } else {
            return true;
        }
    }

    const onFieldChange = (event, fieldName) => {
        const touchedField = { ...fieldErrors[fieldName] };
        touchedField.touched = true;

        setDrugInfo({ ...drugInfo, [fieldName]: event.target.value });
    }

    const submitHandler = () => {

        let allError = false;

        allError = validateField(drugInfo.name) || validateField(drugInfo.price);

        if (allError) {
            setFieldErrors({
                name: validateField(drugInfo.name),
                price: validateField(drugInfo.price),
            })
            return;
        }

        let queryValue, requestBody;
        if (props.id) {
            queryValue = `  
            mutation {
               updateDrug(
                    _id: "${props.id}",
                   drugInput:{
                     name:"${drugInfo.name}",
                     quantity:${+drugInfo.quantity},
                     price: ${+drugInfo.price},
                     }
               ) {
                  name
              }
            }
         `
        } else {
            queryValue = `  
            mutation {
               createDrug(
                   drugInput:{
                       name:"${drugInfo.name}",
                       quantity:${+drugInfo.quantity},
                       price: ${+drugInfo.price},
                     }
               ) 
            }
         `
        }

        requestBody = {
            query: queryValue
        };

        setIsLoading(true);
        fetch(graphqlServerUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("dispenseToken")
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData => {
            if (resData.errors) {
                alert(resData.errors);
            } else {
                //close modal and display data in transaction record
                setIsLoading(false);
                props.cancelModal();
                if (props.id) {
                    props.entryChangeHandler("update", props.id, { ...drugInfo });
                } else {
                    props.entryChangeHandler("create", null, { ...drugInfo, _id: resData.data.createDrug._id });
                }
            }
        }).catch(err => {
            setIsLoading(false);
            alert(err);
        })

    }

    const cancelErrors = () => {
        setFieldErrors({
            name: false,
            price: false,
        })
    }

    return (
        <Fragment>
            <div className={classes["flex-container"]}>
                <section>
                    <h2>Drug Item Name:</h2>
                    <textarea
                        className={fieldErrors.name ? [classes["error"]] : null}
                        style={{ marginLeft: "0" }}
                        rows="1"
                        cols="50"
                        type="text"
                        placeholder="Name"
                        value={drugInfo.name}
                        onChange={(event) => onFieldChange(event, "name")} />
                </section>
                <section>
                    <h2>Price:</h2>
                    <input
                        className={fieldErrors.price ? [classes["error"]] : null}
                        type="number"
                        placeholder="Price"
                        value={drugInfo.price}
                        onChange={(event) => onFieldChange(event, "price")} />
                </section>
                <section>
                    <h2>Quantity:</h2>
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={drugInfo.quantity}
                        onChange={(event) => onFieldChange(event, "quantity")} />
                </section>
                <div />
            </div>
            <section style={{ textAlign: "center", marginTop: "30" }}>
                <button className={buttonClasses.button} type="button" onClick={submitHandler}>{props.id ? "Update" : "Create"}</button>
            </section>
        </Fragment>
    )
}

export default Calculator;