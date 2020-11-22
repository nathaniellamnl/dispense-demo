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

import Loader from '../../../../components/Loader/Loader';
import Button from '../../../Button/Button';
import { graphqlServerUrl } from '../../../../assets/String';
import Modal from '../../../Modal/Modal';
import classescss from './TransactionRecord.module.css';
const TransactionEntry = React.lazy(() => import('./TransactionEntry/TransactionEntry'));

const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

const TransactionRecord = (props) => {
    const classes = useStyles();
    const [openEntry, setOpenEntry] = useState({ open: false, transactionId: null });
    const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, transactionId: null });
    const [transactionRecord, setTransactionRecord] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [longestEntryLength, setLongestEntryLength] = useState(0);

    const openEntryHandler = (transactionId) => {
        setOpenEntry({ open: true, transactionId: transactionId });
    }

    const closeEntryHandler = () => {
        setOpenEntry({ open: false, transactionId: null });
    }

    const openDeleteModalHandler = (transactionId) => {
        setOpenDeleteModal({ open: true, transactionId: transactionId });
    }

    const closeDeleteModalHandler = () => {
        setOpenDeleteModal({ open: false, transactionId: null });
    }

    const deleteHandler = () => {

        const requestBody = {
            query: `
                 mutation DeleteTransaction($transactionId:ID!) {
                   deleteTransaction(_id:$transactionId)
                 }
              `,
            variables: {
                transactionId: openDeleteModal.transactionId
            }
        };

        setIsDeleting(true);
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
            setIsDeleting(false);
            closeDeleteModalHandler();
        }).catch(err => {
            alert("An unexpected error occured!")
            setIsDeleting(false);
        })
    }

    //fetch transactionrecord
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
    }, [props]);

    useEffect(() => {
        if (transactionRecord) {
            let length = 0;
            transactionRecord.map((tx) => {
                length = Math.max(length, tx.drugs.length);
            })

            setLongestEntryLength(length);
        }
    }, [transactionRecord]);

    const openInNewTab = (id) => {
        const newWindow = window.open("/print/" + id, '_blank', 'noopener,noreferrer')
        // if (newWindow) newWindow.opener = null
    }

    return (
        <Fragment>
            <div className={classescss["record-container"]}>
                <h2>{props.patientInfo[0].caseCode + " " + props.patientInfo[0].chineseName + "(" + props.patientInfo[0].englishName + ")"}</h2>

                {/* Modal pops up when clicked */}
                <Modal show={openEntry.open} modalClosed={closeEntryHandler}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TransactionEntry cancelModal={closeEntryHandler} patientId={props.patientId} transactionId={openEntry.transactionId} />
                    </Suspense>
                </Modal>
                <Modal show={openDeleteModal.open} modalClosed={closeDeleteModalHandler}>
                    {isDeleting ? <Loader /> :
                        <Fragment>
                            <p>Are you sure you want to delete this transaction entry?</p>
                            <Button buttonNames={["Delete", "Cancel"]} action={deleteHandler} cancel={closeDeleteModalHandler} />
                        </Fragment>}
                </Modal>
                {/*  */}

                <div className={classescss['icon-container']}>
                    <IconButton onClick={() => openEntryHandler(null)}>
                        <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                    </IconButton>
                    <span>Add new entry</span>
                </div>
                {transactionRecord && transactionRecord.length === 0 ?
                    <p>The patient does not have any transaction record.</p> :
                    <TableContainer component={Paper} style={{ maxHeight: 450 }}>
                        <Table stickyHeader className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell align="center">Print</TableCell>
                                    {[...Array(longestEntryLength)].map((x, i) =>
                                        <Fragment key={i}>
                                            <TableCell align="right">Drug&nbsp;Item&nbsp;{i + 1}</TableCell>
                                            <TableCell align="right">Drug&nbsp;Item&nbsp;{i + 1}&nbsp;Qty</TableCell>
                                        </Fragment>
                                    )}
                                    <TableCell align="right">Paid&nbsp;Amount&nbsp;</TableCell>
                                    <TableCell align="right">Transaction&nbsp;Date&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactionRecord ?
                                    transactionRecord.map((row, index) => (
                                        <TableRow key={row._id} style={index % 2 ? { background: "#e9e9e9" } : { background: "white" }}>
                                            <TableCell align="center">
                                                <IconButton onClick={() => openEntryHandler(row._id)}>
                                                    <EditIcon style={{ fill: "#1053ab", cursor: 'pointer' }} />
                                                </IconButton>
                                                <IconButton onClick={() => openDeleteModalHandler(row._id)}>
                                                    <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => openInNewTab(row._id)}>
                                                    <PrintIcon style={{ fill: "#ab9910", cursor: 'pointer' }} />
                                                </IconButton>
                                            </TableCell>
                                            {[...Array(longestEntryLength)].map((x, i) =>
                                                <Fragment key={i}>
                                                    <TableCell align="right">{i >= row.drugs ? null : row.drugs[i]}</TableCell>
                                                    <TableCell align="right">{i >= row.quantities ? null : row.quantities[i]}</TableCell>
                                                </Fragment>
                                            )}
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.transactionDate.substring(0, 10)}</TableCell>
                                        </TableRow>
                                    )) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        </Fragment>
    )
}

export default TransactionRecord;