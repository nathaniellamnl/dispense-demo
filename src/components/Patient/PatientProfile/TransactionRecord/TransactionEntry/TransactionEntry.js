import React, { useState, useRef, Fragment, useReducer, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';


import { graphqlServerUrl } from '../../../../../assets/String';
import classes from './TransactionEntry.module.css';
import drugNames from '../../../../../assets/DrugNames';
import drugChart from '../../../../../assets/DrugChart';

const drugPurchaseReducer = (currentPurchaseState, action) => {
    switch (action.type) {
        case 'Initialize':
            return {
                ...currentPurchaseState,
                ...action.transaction,
                amount:"",
                loading: false
            }
        case 'Purchase':
            return {
                ...currentPurchaseState,
                amount: action.amount,
                creatingNew: false
            };
        case 'Calculate':
            return {
                ...currentPurchaseState,
                amount: action.amount
            };
        case 'Back':
            return {
                ...currentPurchaseState,
                creatingNew: true,
            }
        case 'Update':
            return {
                ...action.currentState
            }
        case 'Reset':
            return {
                transactionDate: "",
                drugs: [""],
                quantities: [""],
                remark: "",
                amount: "",
                loading: true,
                creatingNew: true
            }
        default:
            throw new Error('Should not get there!');
    }
};

const TransactionEntry = (props) => {

    const [drugItem, setDrugItem] = useState(1);
    const [purchaseState, dispatch] = useReducer(drugPurchaseReducer,
        {
            transactionDate: "",
            drugs: [""],
            quantities: [""],
            remark: "",
            amount: "",
            creatingNew: true,
            loading: true,
        });
    const { register, handleSubmit, errors } = useForm();

    const addDrugItemHandler = () => {
        setDrugItem(drugItem + 1);
    }

    //for exisiting transaction entries
    useEffect(() => {
        if (props.transactionId) {
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
                       }
                     }
                  `,
                variables: {
                    id: props.transactionId
                }
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
            }).then(res => {
                const drugItemNum = res.data.transactions[0].drugs.length;
                setDrugItem(drugItemNum);
                dispatch({
                    type: 'Initialize',
                    transaction: { ...res.data.transactions[0], transactionDate: res.data.transactions[0].transactionDate.substring(0, 10) }
                });

            }).catch(err => {

            })
        } else {
            //set to initial value
            dispatch({ type: 'Reset' });
            setDrugItem(1);
        }
    }, [props]);

    const onSubmit = (data) => {
        let amount = 0;
        for (let i = 0; i < purchaseState.drugs.length; i++) {
            for (const drug of drugChart) {
                if (drug.name === purchaseState.drugs[i]) {
                    const drugItemNum = i+1;
                    amount += drug.price * data["drugItem" + drugItemNum + "Unit"];
                }
            }
        }
        dispatch({
            type: "Purchase",
            amount: amount
        });
    }

    const onBackHandler = () => {
        dispatch({
            type: 'Back',
        });
    }

    const onSubmitAmount = (data) => {
        let queryValue;

        if (props.transactionId) {
            queryValue = `  
            mutation UpdateTransaction($transactionId: ID!,$drugs: [String!]!,$quantities: [String!]! ,$id:ID!,$amount: Float!, $remark:String){
               updateTransaction(
                    _id: $transactionId,
                   transactionInput:{
                       transactionDate: "${new Date(purchaseState.transactionDate).toISOString()}",
                       drugs:$drugs,
                       quantities:$quantities,
                       patientId: $id, 
                       amount: $amount,
                       remark:$remark
                     }
               ) {
                  transactionDate
              }
            }
         `
          
        } else {
            queryValue = `  
            mutation CreateTransaction($drugs: [String!]!,$quantities: [String!]! ,$id:ID!,$amount: Float!,$remark:String){
               createTransaction(
                   transactionInput:{
                       transactionDate: "${new Date(purchaseState.transactionDate).toISOString()}",
                       drugs:$drugs,
                       quantities:$quantities,
                       patientId: $id, 
                       amount: $amount,
                       remark:$remark
                     }
               ) {
                  transactionDate
              }
            }
         `
        }

        
        const requestBody = {
            query: queryValue,
            variables: {
                drugs: purchaseState.drugs,
                quantities: purchaseState.quantities,
                id: props.patientId,
                amount: +data.amount,
                transactionId: props.transactionId,
                remark:purchaseState.remark
            }
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
            //close modal and display data in transaction record

            dispatch({
                type: 'Calculate',
                amount: data.amount
            });
        }).catch(err => {
            console.log(err);
        })

    }

    const onAutoCompleteChange = (i, event, value) => {
        const currentDrugs = [...purchaseState.drugs];
        currentDrugs[i - 1] = value.name;
        dispatch({ type: 'Update', currentState: { ...purchaseState, drugs: currentDrugs } })
    }

    const onQuantityChange = (i, event) => {
        const currentQuantities = [...purchaseState.quantities];
        currentQuantities[i - 1] = event.target.value;
        dispatch({ type: 'Update', currentState: { ...purchaseState, quantities: currentQuantities } })
    }

    const onTransactionDateChange = (event) => {
        dispatch({ type: 'Update', currentState: { ...purchaseState, transactionDate: event.target.value } })
    }

    const onAmountChange = (event) => {
        dispatch({ type: 'Update', currentState: { ...purchaseState, amount: event.target.value } })
    }

    const onRemarkChange = (event) => {
        dispatch({ type: 'Update', currentState: { ...purchaseState, remark: event.target.value } })
    }

    const generateDrugItem = () => {
        const drugsBought = [];

        for (let i = 1; i <= drugItem; i++) {
            drugsBought.push(
                (
                    <Fragment key={"fragment" + i}>
                        <section className={classes['section-container']}>
                            <div className={classes['section-child']}>
                                <Autocomplete
                                    value={purchaseState.drugs ? { name: purchaseState.drugs[i - 1] } : null}
                                    onChange={(event, value) => onAutoCompleteChange(i, event, value)}
                                    ref={(ref) => {
                                        register(ref);
                                    }}
                                    id={"drugItem" + i}
                                    options={[...drugNames, { name: "" }]}
                                    getOptionLabel={(option) => option["name"]}
                                    style={{ width: 400, height: 50 }}
                                    renderInput={(params) =>
                                        <TextField
                                            // value={purchaseState.drugs}
                                            {...params}
                                            label={"Drug Item " + i}
                                            variant="outlined"
                                            name={"drugItem" + i}
                                            helperText={errors["drugItem" + i] ? errors["drugItem" + i].message : false}
                                            error={errors["drugItem" + i] ? true : false}
                                            inputRef={(ref) => {
                                                register(ref, { required: "This is required" })
                                            }}
                                        />
                                    }
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes['section-chlid--vertical']}>
                                <label htmlFor={"drugItem" + i + "Unit"}>Drug Item {i} Quantity:</label>
                                <input
                                    onChange={(event) => onQuantityChange(i, event)}
                                    value={purchaseState.quantities ? purchaseState.quantities[i - 1] : null}
                                    type="text"
                                    id={"drugItem" + i + "Unit"}
                                    name={"drugItem" + i + "Unit"}
                                    ref={(ref) => {
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
                            onChange={(event) => onTransactionDateChange(event)}
                            value={purchaseState.transactionDate ? purchaseState.transactionDate : ""}
                            className={classes['spacer']}
                            type="date" id="transactionDate" name="transactionDate"
                            ref={(ref) => {
                                register(ref, { required: "This is required" });
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
                            onChange={(event) => onRemarkChange(event)}
                            value={purchaseState.remark}
                            style={{ resize: "none" }}
                            className={classes['spacer']}
                            rows="3"
                            cols="60"
                            id="remark"
                            name="remark"
                            ref={(ref) => {
                                register(ref);
                            }} />
                    </section>
                    <section className={classes['button-container']}>
                        <button className={classes.button} type="submit">{props.transactionId ? "Update" : "Create"}</button>
                    </section>
                </form>) :
                (
                    <form onSubmit={handleSubmit(onSubmitAmount)} className={classes['form']}>
                        <section >
                            <label htmlFor="transactionDate">The total paid amount:</label>
                            <input
                                onChange={(event) => onAmountChange(event)}
                                value={purchaseState.amount}
                                name="amount"
                                className={classes['spacer']}
                                type="number" id="amount" name="amount"
                                ref={(ref) => {
                                    register(ref);
                                }} />
                            {/* {errors.transactionDate && <p>This is required</p>} */}
                        </section>

                        <section className={classes["two-buttons-container"]} >
                            <button className={classes["button"]} type="submit">Confirm</button>
                            <button className={classes["button"]} type="button" onClick={onBackHandler}>Back</button>
                        </section>

                    </form>
                )}
        </Fragment>
    )
}

export default TransactionEntry;

