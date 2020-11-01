import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { IconButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';

import Checkbox from '../../../../Checkbox/Checkbox'
import classes from './TransactionEntry.module.css';


const drugs = [
    { drug: "Eliquis 5mg" },
    { drug: "Eliquis 2.5mg" },
    { drug: "Pradaxa 150mg" },
]

const type = [
    { type: "SFI" },
    { type: "Regular" },
    { type: "VMOHSH" },
    { type: "VMONFNC" },
    { type: "TMMG" }
]

const TransactionEntry = () => {
    const [drugItem, setDrugItem] = useState(2);
    const { register, handleSubmit, errors } = useForm();

    const addDrugItemHandler = () => {
        setDrugItem(drugItem + 1);
    }

    const onSubmit = (data) => {
        console.log(data);
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
                                    id={"drugItem" + i}
                                    options={drugs}
                                    getOptionLabel={(option) => option.drug}
                                    style={{ width: 200, height: 50 }}
                                    renderInput={(params) =>
                                        <TextField 
                                            {...params}
                                            label={"Drug Item " + i}
                                            variant="outlined"
                                            name={"drugitem"+i}
                                            helperText= {errors["drugitem"+i]? errors["drugitem"+i].message: false}
                                            error={errors["drugitem"+i]? true: false}
                                            inputRef={register({
                                                required: "This is required"
                                            })} />}
                                />
                            </div>
                            <div className={classes.spacer}></div>
                            <div className={classes['section-chlid--vertical']}>
                                <label htmlFor={"drugItem" + i + "Quantity"}>Drug Item {i} Quantity:</label>
                                <input type="text" id={"drugItem" + i + "QuantityBox"} name={"drugItem" + i + "QuantityBox"} ref={register({ required: true })}></input>
                                <span>box(es)</span>
                                <input type="text" id={"drugItem" + i + "QuantityCap"} name={"drugItem" + i + "QuantityCap"} ref={register({ required: true })}></input>
                                <span>capsule(s)</span>
                            </div>
                            <div className={classes['div-container--horiz']}>
                                <Checkbox />
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
        <form onSubmit={handleSubmit(onSubmit)} className={classes['form']}>
            <section >
                <label htmlFor="transactionDate">Transaction Date:</label>
                <input
                    className={classes['spacer']}
                    type="date" id="transactionDate" name="transactionDate"
                    ref={register()} />
                {/* {errors.transactionDate && <p>This is required</p>} */}
            </section>
            {generateDrugItem()}
            <section className={classes['icon-container__modal']}>
                <IconButton onClick={addDrugItemHandler}>
                    <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                </IconButton>
                <span>Add new drug item</span>
            </section>

            <section className={classes['section-child']}>
                <Autocomplete
                    id="txtype"
                    options={type}
                    getOptionLabel={(option) => option.type}
                    style={{ width: 200, height: 50 }}
                    renderInput={(params) => <TextField {...params} label="Transaction Type" variant="outlined" />}
                />
            </section>
            <section className={classes['remark-container']}>
                <label htmlFor="remark" >Remark:</label>
                <textarea style={{ resize: "none" }} className={classes['spacer']} rows="3" cols="60" id="remark" name="remark" ref={register()} />
            </section>
            <section >
                <label htmlFor="paidAmount">Paid Amount:</label>
                <input
                    className={classes['spacer']}
                    type="number" id="paidAmount" name="paidAmount"
                    ref={register()} />
            </section>
            <section className={classes['button-container']}>
                <button className={classes.button} type="submit">Create</button>
            </section>
        </form>
    )
}

export default TransactionEntry;

