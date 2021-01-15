import React, { Fragment, useState, useReducer, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { IconButton } from '@material-ui/core';

import { graphqlRequest } from '../../../../../utils/graphqlRequest';
import classes from './TransactionEntry.module.css';
import Loader from '../../../../../ui/Loader/Loader';

const TransactionEntry = (props) => {

    const [fieldErrors, setFieldErrors] = useState({
        transactionDate: false,
        drugs: [false],
        quantities: [false],
        amount: false,
    })
    const [isLoading, setIsLoading] = useState(true);
    const [drugInfo, setDrugInfo] = useState([{
        _id: "",
        name: "",
        price: "",
        quantity: ""
    }]);

    const calculate = (items, quantities) => {

        let amount = 0;
        for (let i = 0; i < items.length; i++) {
            for (const drug of drugInfo) {
                if (drug.name === items[i] && quantities) {
                    amount += drug.price * quantities[i];
                    break;
                }

            }
        }
        return amount;
    }

    const drugPurchaseReducer = (currentPurchaseState, action) => {
        switch (action.type) {
            case 'Initialize':
                return {
                    ...currentPurchaseState,
                    ...action.transaction,
                }
            case 'Submit':
                return {
                    ...currentPurchaseState,
                    amount: action.amount,
                };
            case 'Calculate':
                return {
                    ...currentPurchaseState,
                    quantities: action.quantities,
                    drugs: action.drugs,
                    amount: calculate(action.drugs, action.quantities),
                }
            case 'Update':
                return {
                    ...action.currentState
                }
            case 'AddItem':
                const newQtyAdd = [...currentPurchaseState.quantities];
                newQtyAdd.push("");
                const newDrugsAdd = [...currentPurchaseState.drugs];
                newDrugsAdd.push("");
                return {
                    ...currentPurchaseState,
                    quantities: newQtyAdd,
                    drugs: newDrugsAdd,
                }
            case 'DeleteItem':
                const newQtyRemove = [...currentPurchaseState.quantities];
                newQtyRemove.splice(action.index, 1);
                const newDrugsRemove = [...currentPurchaseState.drugs];
                newDrugsRemove.splice(action.index, 1);

                return {
                    ...currentPurchaseState,
                    quantities: newQtyRemove,
                    drugs: newDrugsRemove,
                    amount: calculate(newDrugsRemove, newQtyRemove)
                }
            case 'Reset':
                return {
                    transactionDate: "",
                    drugs: [""],
                    quantities: [""],
                    remark: "",
                    amount: "",
                }
            default:
                throw new Error('Should not get there!');
        }
    };

    const [purchaseState, dispatch] = useReducer(drugPurchaseReducer,
        {
            transactionDate: "",
            drugs: [""],
            quantities: [null],
            remark: "",
            amount: "",
        });
        
    const addDrugItemHandler = () => {
        dispatch({ type: "AddItem" });
    }

    const deleteDrugItemHandler = (index) => {
        dispatch({ type: "DeleteItem", index: index });
    }

    //for exisiting transaction entries
    useEffect(() => {
        setIsLoading(true);
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
                       drugs {
                           _id
                           name
                           price
                       }
                     }
                  `,
                variables: {
                    id: props.transactionId
                }
            };
            async function fetchTransactionInfo() {
                const resData = await graphqlRequest(requestBody);
                setIsLoading(false);
                if (resData.error) {
                    alert("An error occured!");
                } else {
                    dispatch({
                        type: 'Initialize',
                        transaction: { ...resData.data.transactions[0], transactionDate: resData.data.transactions[0].transactionDate.substring(0, 10) }
                    });
                    setDrugInfo(resData.data.drugs);

                }
            }

            fetchTransactionInfo();
        } else {
            //set to initial value   
            const requestBody = {
                query: `
                     query {
                       drugs {
                           _id
                           name
                           price
                       }
                     }
                  `
            };

            async function fetchDrugInfo() {
                const resData = await graphqlRequest(requestBody);
                setIsLoading(false);
                if (resData.error) {
                    alert('An error occured!');
                } else {
                    setDrugInfo(resData.data.drugs);
                    dispatch({ type: 'Reset' });
                }
            }

            fetchDrugInfo();
        }
        setFieldErrors({
            transactionDate: false,
            amount: false,
            drugs: [false],
            quantities: [false]
        })
    }, [props]);

    const validateField = (value) => {
        if (value && value !== "") {
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let allError = false;
        const drugErrors = [];
        const quantityErrors = [];

        for (const drug of purchaseState.drugs) {
            allError = allError || validateField(drug);
            drugErrors.push(validateField(drug));
        }

        for (const quantity of purchaseState.quantities) {
            allError = allError || validateField(quantity);
            quantityErrors.push(validateField(quantity));
        }

        allError = allError || validateField(purchaseState.transactionDate);

        if (allError) {
            setFieldErrors({
                drugs: drugErrors,
                quantities: quantityErrors,
                amount: false,
                transactionDate: validateField(purchaseState.transactionDate)
            })
            return;
        }

        let queryValue;

        if (props.transactionId) {
            queryValue = `  
            mutation UpdateTransaction($transactionId: ID!,$drugs: [String!]!,$quantities: [Int!]! ,$id:ID!,$amount: Float!, $remark:String){
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
            mutation CreateTransaction($drugs: [String!]!,$quantities: [Int!]! ,$id:ID!,$amount: Float!,$remark:String){
               createTransaction(
                   transactionInput:{
                       transactionDate: "${new Date(purchaseState.transactionDate).toISOString()}",
                       drugs:$drugs,
                       quantities:$quantities,
                       patientId: $id, 
                       amount: $amount,
                       remark:$remark
                     }
               ) 
            }
         `
        }

        const requestBody = {
            query: queryValue,
            variables: {
                drugs: purchaseState.drugs,
                quantities: purchaseState.quantities,
                id: props.patientId,
                amount: +purchaseState.amount,
                transactionId: props.transactionId,
                remark: purchaseState.remark
            }
        };

        setIsLoading(true);
        const resData = await graphqlRequest(requestBody);
        setIsLoading(false);
        if (resData.error) {
            alert("An error occured!");
        } else {
            props.cancelModal();
            if (props.transactionId) {
                props.entryChangeHandler("update", props.transactionId, { ...purchaseState, transactionDate: new Date(purchaseState.transactionDate).toISOString() });
            } else {
                props.entryChangeHandler("create", null, { ...purchaseState, _id: resData.data.createTransaction, transactionDate: new Date(purchaseState.transactionDate).toISOString() });
            }
        }
    }

    const cancelErrors = () => {
        const drugErrors = [];
        const quantityErrors = [];

        purchaseState.drugs.forEach(ele => {
            drugErrors.push(false);
            quantityErrors.push(false);
        });
        setFieldErrors({
            transactionDate: false,
            drugs: drugErrors,
            quantities: quantityErrors,
            amount: false
        })
    }
    const onAutoCompleteChange = (i, value) => {
        const currDrugs = [...purchaseState.drugs];
        currDrugs[i - 1] = value ? value.name : "";
        dispatch({ type: 'Calculate', drugs: currDrugs, quantities: purchaseState.quantities })
        cancelErrors();
    }

    const onQuantityChange = (i, event) => {

        const currentQuantities = [...purchaseState.quantities];
        currentQuantities[i - 1] = event.target.value ? parseInt(event.target.value) : "";
        dispatch({ type: 'Calculate', drugs: purchaseState.drugs, quantities: currentQuantities });
        cancelErrors();
    }

    const onOtherFieldChange = (event, fieldName) => {

        dispatch({ type: 'Update', currentState: { ...purchaseState, [fieldName]: event.target.value ? event.target.value : "" } });
        cancelErrors();
    }

    const generateDrugItem = () => {
        const drugsBought = [];

        for (let i = 1; i <= purchaseState.drugs.length; i++) {
            drugsBought.push(
                (
                    <Fragment key={"fragment" + i}>
                        <section className={classes['section-container']}>
                            <div >
                                <Autocomplete
                                    value={purchaseState.drugs ? { name: purchaseState.drugs[i - 1] } :
                                        {
                                            id: "",
                                            name: "",
                                            price: "",
                                            quantity: ""
                                        }}
                                    onChange={(event, value) => onAutoCompleteChange(i, value)}
                                    id={"drugItem" + i}
                                    options={Array.isArray(drugInfo) ? [...drugInfo, {
                                        id: "",
                                        name: "",
                                        price: "",
                                        quantity: ""
                                    }] : [{
                                        id: "",
                                        name: "",
                                        price: "",
                                    }]
                                    }

                                    getOptionLabel={(option) => option["name"]}
                                    style={{ width: 400, height: 50 }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={"Drug Item " + i}
                                            variant="outlined"
                                            name={"drugItem" + i}
                                            error={fieldErrors.drugs[i - 1]}
                                        />
                                    }
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes['section-chlid--vertical']}>
                                <label htmlFor={"drugItem" + i + "Unit"}>Drug Item {i} Quantity:</label>
                                <input
                                    className={fieldErrors.quantities[i - 1] ? classes["error"] : null}
                                    onChange={(event) => onQuantityChange(i, event)}
                                    value={purchaseState.quantities ? purchaseState.quantities[i - 1] : ""}
                                    type="number"
                                    id={"drugItem" + i + "Unit"}
                                    name={"drugItem" + i + "Unit"}
                                ></input>
                                <div>Unit(s)</div>
                            </div>
                            <div className={classes.spacer}></div>
                            {i === 1 ? null :
                                (
                                    <section className={classes['icon-container']}>
                                        <IconButton onClick={() => deleteDrugItemHandler(i - 1)}>
                                            <RemoveCircleIcon style={{ fill: "red", cursor: 'pointer' }} />
                                        </IconButton>
                                        <span>Remove drug item</span>
                                    </section>
                                )}
                        </section>
                        <hr style={{ marginTop: 10 }} />
                    </Fragment>
                )
            )
        }
        return drugsBought;
    }

    return (
        <Fragment>
            { isLoading ? <Loader /> :
                (
                    <form onSubmit={onSubmit} className={classes['form']}>
                        <section >
                            <label htmlFor="transactionDate">Transaction Date:</label>
                            <input
                                className={fieldErrors.transactionDate ? [classes["error"], classes["spacer"]].join(' ') : classes["spacer"]}
                                onChange={(event) => onOtherFieldChange(event, "transactionDate")}
                                value={purchaseState.transactionDate ? purchaseState.transactionDate : ""}
                                type="date" id="transactionDate" name="transactionDate"
                            />
                        </section>
                        {generateDrugItem()}
                        <section className={classes['icon-container']}>
                            <IconButton onClick={addDrugItemHandler}>
                                <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                            </IconButton>
                            <span>Add new drug item</span>
                        </section>
                        <section className={classes['remark-container']}>
                            <label htmlFor="remark" >Remark:</label>
                            <textarea
                                onChange={(event) => onOtherFieldChange(event, "remark")}
                                value={purchaseState.remark ? purchaseState.remark : ""}
                                style={{ resize: "none" }}
                                className={classes['spacer']}
                                rows="3"
                                cols="60"
                                id="remark"
                                name="remark"
                            />
                        </section>
                        <section className={classes['amount-container']}>
                            <label htmlFor="amount">Total paid amount:</label>
                            <input
                                className={fieldErrors.amount ? [classes["error"], classes["spacer"]].join(' ') : classes["spacer"]}
                                onChange={(event) => onOtherFieldChange(event, "amount")}
                                value={purchaseState.amount}
                                name="amount"
                                type="number" id="amount" name="amount"
                            />
                            <div>
                                {/* spacer */}
                            </div>
                            <span>(You can modify the amount as some customers might accidentally have paid a wrong amonut)</span>
                        </section>
                        <section className={classes['button-container']}>
                            <button className={classes.button} type="submit">{props.transactionId ? "Update" : "Create"}</button>
                        </section>
                    </form>)
            }
        </Fragment>

    )
}

export default TransactionEntry;

