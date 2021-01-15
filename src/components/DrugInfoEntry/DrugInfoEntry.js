import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';

import { graphqlRequest } from '../../utils/graphqlRequest';
import { graphqlServerUrl } from "../../assets/String";
import buttonClasses from '../../ui/Button/Button.module.css';
import classes from './DrugInfoEntry.module.css';
import Loader from '../../ui/Loader/Loader';


const DrugInfoEntry = (props) => {

    const [drugInfo, setDrugInfo] = useState({ name: "", price: "", packSize: "", quantity: "", manufacturer: "" });

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        price: false,
        packSize: false,
        quantity: false,
        manufacturer: false
    })
    const [isLoading, setIsLoading] = useState(false);

    //for exisiting transaction entries
    useEffect(() => {
        setIsLoading(true);
        if (props.id) {
            const requestBody = {
                query: `
                     query Drugs($id:ID) {
                       drugs(_id:$id) {
                        _id
                        name
                        price
                        quantity
                        packSize
                        manufacturer
                       }
                     }
                  `,
                variables: {
                    id: props.id
                }
            };

            async function fetchDrugInfo() {
                const resData = await graphqlRequest(requestBody);
                setIsLoading(false);
                if (resData.error) {
                    alert("An error occured!");
                } else {
                    const reducedDrug = { ...resData.data.drugs[0] };
                    setDrugInfo(reducedDrug);

                }
            }

            fetchDrugInfo();

        } else {
            //set to initial value
            setDrugInfo({ name: "", price: "", quantity: "", manufacturer: "", packSize: "" });
            setIsLoading(false);
        }
        setFieldErrors({
            name: false,
            price: false,
            quantity: false,
            manufacturer: false,
            packSize: false
        })
    }, [props]);

    const validateField = (value) => {
        if (value && value !== "") {
            return false;
        } else {
            return true;
        }
    }

    const onFieldChange = (event, fieldName) => {
        setDrugInfo({ ...drugInfo, [fieldName]: event.target.value });
    }

    const submitHandler = async () => {

        let allError = false;

        allError = validateField(drugInfo.name) || validateField(drugInfo.price) || validateField(drugInfo.packSize) ||
            validateField(drugInfo.quantity) || validateField(drugInfo.manufacturer);

        if (allError) {
            setFieldErrors({
                name: validateField(drugInfo.name),
                price: validateField(drugInfo.price),
                packSize: validateField(drugInfo.packSize),
                quantity: validateField(drugInfo.quantity),
                manufacturer: validateField(drugInfo.manufacturer)
            })
            return;
        } else {
            setFieldErrors({
                name: false,
                price: false,
                packSize: false,
                quantity: false,
                manufacturer: false
            })
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
                     packSize: ${+drugInfo.packSize},
                     manufacturer: "${drugInfo.manufacturer}"
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
                       packSize: ${+drugInfo.packSize},
                       manufacturer: "${drugInfo.manufacturer}"
                     }
               ) 
            }
         `
        }

        requestBody = {
            query: queryValue
        };

        setIsLoading(true);
        const resData = await graphqlRequest(requestBody);
        setIsLoading(false);
        if (resData.error) {
            alert("An error occured!");
        } else {
            props.cancelModal();
            if (props.id) {
                props.entryChangeHandler("update", props.id, { ...drugInfo });
            } else {
                props.entryChangeHandler("create", null, { ...drugInfo, _id: resData.data.createDrug });
            }
        }
    }

    return (
        <Fragment>
            {isLoading ? <Loader /> :
                <Fragment>
                    <div >
                        <section>
                            <label className={classes["section-label"]} htmlFor="drugName">Drug Item Name:</label>
                            <textarea
                                id="drugName"
                                className={fieldErrors.name ? [classes["error"]] : null}
                                style={{ marginLeft: "0" }}
                                rows="1"
                                cols="20"
                                type="text"
                                placeholder="Name"
                                value={drugInfo.name}
                                onChange={(event) => onFieldChange(event, "name")} />
                        </section>
                        <section>
                            <label className={classes["section-label"]} htmlFor="price">Price:</label>
                            <input
                                id="price"
                                className={fieldErrors.price ? [classes["error"]] : null}
                                type="number"
                                placeholder="Price"
                                value={drugInfo.price}
                                onChange={(event) => onFieldChange(event, "price")} />
                        </section>
                        <section>
                            <label className={classes["section-label"]} htmlFor="packSize">Pack Size:</label>
                            <input
                                id="packSize"
                                className={fieldErrors.packSize ? [classes["error"]] : null}
                                type="number"
                                placeholder="Pack size"
                                value={drugInfo.packSize}
                                onChange={(event) => onFieldChange(event, "packSize")} />
                        </section>
                        <section>
                            <label className={classes["section-label"]} htmlFor="quantity">Quantity:</label>
                            <input
                                id="quantity"
                                className={fieldErrors.quantity ? [classes["error"]] : null}
                                type="number"
                                placeholder="Quantity"
                                value={drugInfo.quantity}
                                onChange={(event) => onFieldChange(event, "quantity")} />
                        </section>
                        <section>
                            <label className={classes["section-label"]} htmlFor="manufacturer">Manufacturer:</label>
                            <textarea
                                id="manufacturer"
                                className={fieldErrors.manufacturer ? [classes["error"]] : null}
                                style={{ marginLeft: "0" }}
                                rows="1"
                                cols="20"
                                type="text"
                                placeholder="Manufacturer"
                                value={drugInfo.manufacturer}
                                onChange={(event) => onFieldChange(event, "manufacturer")} />
                        </section>
                        <div />
                    </div>
                    <section style={{ textAlign: "center", marginTop: "30" }}>
                        <button className={buttonClasses.button} type="button" onClick={submitHandler}>{props.id ? "Update" : "Create"}</button>
                    </section>
                </Fragment>
            }

        </Fragment>
    )
}

export default DrugInfoEntry;

