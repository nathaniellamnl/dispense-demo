import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import { graphqlServerUrl } from '../../../../assets/String';
import Modal from '../../../Modal/Modal';
import classescss from './TransactionRecord.module.css';
const TransactionEntry = React.lazy(() => import('./TransactionEntry/TransactionEntry'));


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const TransactionRecord = (props) => {
    const classes = useStyles();
    const [openEntry, setOpenEntry] = useState(false);
    const [transactionRecord, setTransactionRecord] = useState();
    const [selectedTransaction, setSelectedTransaction] = useState();
    // const [printEntry, setPrintEntry] = useState(false);

    const openEntryHandler = (transactionId) => {
        setSelectedTransaction(transactionId);
        setOpenEntry(true);
    }

    const deleteHandler = (transactionId) => {
        const requestBody = {
            query: `
                 mutation DeleteTransaction($transactionId:ID!) {
                   deleteTransaction(_id:$transactionId)
                 }
              `,
            variables: {
                transactionId:transactionId 
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

        }).catch(err => {

        })
    }

    const cancelCreationHandler = () => {
        setOpenEntry(false);
    }

    //readData
    useEffect(() => {
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
                id: props.patientId
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
            setTransactionRecord(resData.data.transactions);

        }).catch(err => {

        })
    }, [props.patientId]);

    const openInNewTab = (id) => {
        const newWindow = window.open("/print/" + id, '_blank', 'noopener,noreferrer')
        // if (newWindow) newWindow.opener = null
    }

    return (
        <Fragment>
            <h2>{props.patientInfo[0].caseCode + " " + props.patientInfo[0].chineseName + "(" + props.patientInfo[0].englishName + ")"}</h2>

            <Modal show={openEntry} modalClosed={cancelCreationHandler}>
                <Suspense fallback={<div>Loading...</div>}>
                    <TransactionEntry patientId={props.patientId} transactionId={openEntry && selectedTransaction? selectedTransaction:null}/>
                </Suspense>
            </Modal>
            <div className={classescss['icon-container']}>
                <IconButton onClick={() => openEntryHandler(null)}>
                    <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                </IconButton>
                <span>Add new entry</span>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Drug&nbsp;Item&nbsp;1</TableCell>
                            <TableCell align="right">Drug&nbsp;Item&nbsp;1&nbsp;Qty</TableCell>
                            <TableCell align="right">Drug&nbsp;Item&nbsp;2</TableCell>
                            <TableCell align="right">Drug&nbsp;Item&nbsp;2&nbsp;Qty</TableCell>
                            <TableCell align="right">Paid&nbsp;Amount&nbsp;</TableCell>
                            <TableCell align="right">Transaction&nbsp;Date&nbsp;</TableCell>
                            <TableCell align="center">Print</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionRecord ?
                            transactionRecord.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell align="right">{row.drugs[0]}</TableCell>
                                    <TableCell align="right">{row.quantities[0]}</TableCell>
                                    <TableCell align="right">{row.drugs[1]}</TableCell>
                                    <TableCell align="right">{row.quantities[1]}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.transactionDate.substring(0, 10)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => openInNewTab(row._id)}>
                                            <PrintIcon style={{ fill: "green", cursor: 'pointer' }} />
                                        </IconButton></TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => openEntryHandler(row._id)}>
                                            <EditIcon style={{ fill: "blue", cursor: 'pointer' }} />
                                        </IconButton>
                                        <IconButton onClick={() => deleteHandler(row._id)}>
                                            <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default TransactionRecord;