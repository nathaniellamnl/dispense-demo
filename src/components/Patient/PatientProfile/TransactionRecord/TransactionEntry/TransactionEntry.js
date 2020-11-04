import React, { useState, useRef, Fragment, useReducer, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import classes from './TransactionEntry.module.css';
import drugChart from '../../../../../assets/DrugChart';

const drugPurchaseReducer = (currentPurchaseState, action) => {
    switch (action.type) {
        case 'Purchase':
            return {
                ...currentPurchaseState,
                transactionDate: action.transactionDate,
                drugs: action.drugs,
                quantities: action.quantities,
                remark: action.remark,
                amount: action.amount,
                creatingNew: false
            };
        case 'Calculate':
            return {
                ...currentPurchaseState,
                amount: action.amount,
                creatingNew: true
            };
        case 'Back':
            return {
                ...currentPurchaseState,
                creatingNew: false
            }
        default:
            throw new Error('Should not get there!');
    }
};

const TransactionEntry = () => {
    const [drugNames, setDrugNames] = useState([]);
    const [drugItem, setDrugItem] = useState(1);
    const [purchaseState, dispatch] = useReducer(drugPurchaseReducer, { creatingNew: true });
    const { register, handleSubmit, errors } = useForm();

    const paidAmount = useRef();
    const remark = useRef();
    const transactionDate = useRef();

    let drugItemRef = useRef({});
    let drugQtyRef = useRef({});
    let drugItemAutoRef = useRef({});
    

    const addDrugItemHandler = () => {
        setDrugItem(drugItem + 1);
    }

    useEffect(() => {

        for (let i = 1; i <= drugItem; i++) {
            
            if (drugItemRef.current && drugItemRef.current[i - 1] && purchaseState.drugs) {
                let drugChosen;
                for(const drug of drugChart) {
                   if(purchaseState.drugs[i - 1]==drug.name){
                    drugChosen = {...drug};
                   }   
                }
                console.log("Chosen Drug: "+drugChosen.name + drugChosen.name);
                drugItemAutoRef.current[i - 1].value = drugChosen;
            }
            if (drugQtyRef.current && drugQtyRef.current[i - 1] && purchaseState.quantities) {
                drugQtyRef.current[i - 1].value = purchaseState.quantities[i - 1]
            }
        }

        if (paidAmount.current) {
            paidAmount.current.value = purchaseState.amount;
        }

        if (transactionDate.current && purchaseState.transactionDate) {
            transactionDate.current.value = purchaseState.transactionDate;
        }

        if (remark.current && purchaseState.transactionDate) {
            remark.current.value = purchaseState.remark;
        }

    }, [purchaseState])

    const onSubmit = (data) => {
        const prices = [];
        const drugs = [];
        const quantities = [];

        // let drugNamesCopy = [...drugNames];
        
        for (let i = 1; i <= drugItem; i++) {

            for (const drug of drugChart) {
                if (data["drugItem" + i] == drug.name) {
                    prices.push(drug.price);
                    
                    // drugNamesCopy[i-1] = drug;
                }
            }

            console.log(data["drugItem" + i]);
            drugs.push(data["drugItem" + i]);
            // setDrugNames(drugNamesCopy);
        }

        let amount = 0;
        for (let i = 1; i <= prices.length; i++) {
            quantities.push(data["drugItem" + i + "Unit"]);
            amount += prices[i - 1] * data["drugItem" + i + "Unit"];
        }

        dispatch({
            type: 'Purchase',
            drugs: drugs,
            quantities: quantities,
            transactionDate: data.transactionDate,
            remark: data.remark,
            amount: amount
        });
    }

    const onBackHandler = () => {
        dispatch({
            type: 'Back',
        });
    }

    const onSubmitAmount = (data) => {
        dispatch({
            type: 'Calculate',
            amount: data.amount
        });
    }

    const onAutoCompleteChangeHandler = (event, value) => {
        
        // for (let i = 1; i <= drugItem; i++) {

        //     for (const drug of drugChart) {
        //         if (data["drugItem" + i] == drug.name) {
        //             prices.push(drug.price);
                    
        //             drugNamesCopy[i-1] = drug;
        //         }
        //     }

        //     setDrugNames(drugNamesCopy);
        // }
        const drugNamesCopy = [...drugNames];
        drugNamesCopy[i - 1] = event.target.value;
        setDrugNames(drugNamesCopy);
    }

    const generateDrugItem = () => {
        const drugsBought = [];
        for (let i = 1; i <= drugItem; i++) {
            drugsBought.push(
                (
                    <Fragment>
                        <section className={classes['section-container']}>
                            <div className={classes['section-child']}>
                                <Autocomplete
                                    value={drugNames.length>0? drugNames[i-1]:null}
                                    onChange={onAutoCompleteChangeHandler}
                                    id={"drugItem" + i}
                                    options={drugChart}
                                    getOptionLabel={(option) => option["name"]}
                                    style={{ width: 400, height: 50 }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={"Drug Item " + i}
                                            variant="outlined"
                                            name={"drugItem" + i}
                                            helperText={errors["drugItem" + i] ? errors["drugItem" + i].message : false}
                                            error={errors["drugItem" + i] ? true : false}
                                            inputRef={(ref) => {
                                                drugItemRef.current[i - 1] = ref;
                                                register(ref, { required: "This is required" })
                                            }}
                                        />}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes['section-chlid--vertical']}>
                                <label htmlFor={"drugItem" + i + "Unit"}>Drug Item {i} Quantity:</label>
                                <input
                                    type="text"
                                    id={"drugItem" + i + "Unit"}
                                    name={"drugItem" + i + "Unit"}
                                    ref={(ref) => {
                                        drugQtyRef.current[i - 1] = ref;
                                        register(ref, { required: true });
                                    }}></input>
                                <span>Unit(s)</span>
                            </div>
                        </section>
                        <hr />
                    </Fragment>
                )
            )
        }
        return drugsBought;
    }

    return (
        <Fragment>
            { purchaseState.creatingNew ? (
                <form onSubmit={handleSubmit(onSubmit)} className={classes['form']}>
                    <section >
                        <label htmlFor="transactionDate">Transaction Date:</label>
                        <input
                            className={classes['spacer']}
                            type="date" id="transactionDate" name="transactionDate"
                            ref={(ref) => {
                                transactionDate.current = ref;
                                register(ref);
                            }} />
                        {/* {errors.transactionDate && <p>This is required</p>} */}
                    </section>
                    {generateDrugItem()}
                    <section className={classes['icon-container__modal']}>
                        <IconButton onClick={addDrugItemHandler}>
                            <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                        </IconButton>
                        <span>Add new drug item</span>
                    </section>
                    <section className={classes['remark-container']}>
                        <label htmlFor="remark" >Remark:</label>
                        <textarea
                            style={{ resize: "none" }}
                            className={classes['spacer']}
                            rows="3"
                            cols="60"
                            id="remark"
                            name="remark"
                            ref={(ref) => {
                                remark.current = ref;
                                register(ref);
                            }} />
                    </section>
                    <section className={classes['button-container']}>
                        <button className={classes.button} type="submit">Create</button>
                    </section>
                </form>) :
                (
                    <form onSubmit={handleSubmit(onSubmitAmount)} className={classes['form']}>
                        <section >
                            <label htmlFor="transactionDate">The total paid amount:</label>
                            <input
                                name="amount"
                                className={classes['spacer']}
                                type="number" id="amount" name="amount"
                                ref={(ref) => {
                                    paidAmount.current = ref;
                                    register(ref);
                                }} />
                            {/* {errors.transactionDate && <p>This is required</p>} */}
                        </section>

                        <section className={classes["two-buttons-container"]} >
                            <button className={classes["button"]} type="submit">Confirm</button>
                            <button className={classes["button"]} onClick={onBackHandler}>Back</button>
                        </section>

                    </form>
                )}
        </Fragment>
    )
}

export default TransactionEntry;

