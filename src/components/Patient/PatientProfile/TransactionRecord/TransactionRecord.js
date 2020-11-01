import React, { Fragment, useState,Suspense } from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PrintIcon from '@material-ui/icons/Print'
import { IconButton } from '@material-ui/core';


import TransactionEntry from './TransactionEntry/TransactionEntry';
import PrintEntry from './PrintTransaction/PrintTransaction';
import Modal from '../../../Modal/Modal';
import classescss from './TransactionRecord.module.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(drugItem1, drugItem1Qty, drugItem2, drugItem2Qty, paidAmount, transactionDate, prepaid) {
    return { drugItem1, drugItem1Qty, drugItem2, drugItem2Qty, paidAmount, transactionDate, prepaid };
}

const rows = [
    createData("Eliquis 5mg", "60 boxes", null, 0, 50000, "11/05/2020", true),
    createData("Pradaxa 150mg", "60 boxes", null, 0, 70000, "11/05/2020", true,),
];

const TransactionRecord = (props) => {
    const classes = useStyles();
    const [creatingNewEntry, setCreatingNewEntry] = useState(false);
    // const [printEntry, setPrintEntry] = useState(false);

    const addHandler = () => {
        setCreatingNewEntry(true);
    }

    const cancelCreationHandler = () => {
        setCreatingNewEntry(false);
    }

    const printHandler = () => {

        // setPrintEntry(true);
    }

    // const cancelPrintHandler = () => {
    //     setPrintEntry(false);
    // }

    const openInNewTab = (url) => {
        const newWindow = window.open("/print", '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }


    return (
        <Fragment>
            <h2>{props.patientInfo[0].caseCode + " " + props.patientInfo[0].chineseName + "(" + props.patientInfo[0].englishName + ")"}</h2>
            <Modal show={creatingNewEntry} modalClosed={cancelCreationHandler}>
                {TransactionEntry()}
            </Modal>
            <div className={classescss['icon-container']}>
                <IconButton onClick={addHandler}>
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
                            <TableCell align="right">Prepaid</TableCell>
                            <TableCell align="right">Print</TableCell>
                            <TableCell align="right">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.transactionDate}>
                                <TableCell align="right">{row.drugItem1}</TableCell>
                                <TableCell align="right">{row.drugItem1Qty}</TableCell>
                                <TableCell align="right">{row.drugItem2}</TableCell>
                                <TableCell align="right">{row.drugItem2Qty}</TableCell>
                                <TableCell align="right">{row.paidAmount}</TableCell>
                                <TableCell align="right">{row.transactionDate}</TableCell>
                                <TableCell align="right">{row.prepaid}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openInNewTab()}>
                                        <PrintIcon style={{ fill: "green", cursor: 'pointer' }} />
                                    </IconButton></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default TransactionRecord;