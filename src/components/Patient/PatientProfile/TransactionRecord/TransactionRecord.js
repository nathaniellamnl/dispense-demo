import React, { Fragment, useState, useEffect, Suspense } from 'react';
import useTable from '../../../../UI/Table/useTable';
import { TableBody, TableCell, TableRow, Paper, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PrintIcon from '@material-ui/icons/Print';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import useWindowDimensions from '../../../../Utilities/useWindowDimensions';
import Loader from '../../../../UI/Loader/Loader';
import Button from '../../../../UI/Button/Button';
import { graphqlServerUrl } from '../../../../assets/String';
import Modal from '../../../../UI/Modal/Modal';
import classescss from './TransactionRecord.module.css';
const TransactionEntry = React.lazy(() => import('./TransactionEntry/TransactionEntry'));

const TransactionRecord = (props) => {

    const [openEntry, setOpenEntry] = useState({ open: false, transactionId: null });
    const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, transactionId: null });
    const [transactionRecord, setTransactionRecord] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [longestEntryLength, setLongestEntryLength] = useState(0);
    const { width, height } = useWindowDimensions();
    const [filterFn, setFilterFn] = useState({
        fn: items => items,
        value: null
    });

    let headCells;
    if (width > 800) {
        headCells = [
            { id: "edit", label: "Edit", disableSorting: true },
            { id: 'print', label: "print", disableSorting: true },
            [...Array(longestEntryLength)].map((x, i) => {
                let drugItemKey = "drugItem" + (+(i + 1));
                let drugQtyKey = "drugQty" + (+(i + 1));
                return {
                    [drugItemKey]: {
                        id: "drugItem" + (+(i + 1)), label: "Drug Item " + (+(i + 1))
                    },
                    [drugQtyKey]: {
                        id: "drugQty" + (+(i + 1)), label: "Drug Qty " + (+(i + 1))
                    }
                }
            }),
            { id: "amount", label: "Paid Amount" },
            { id: "transactionDate", label: "Transaction Date" }
        ];


    } else if (width > 450) {
        headCells = [
            { id: "edit", label: "Edit", disableSorting: true },
            { id: "amount", label: "Paid Amount" },
            { id: "transactionDate", label: "Transaction Date" }
        ];
    } else {
        headCells = [
            { id: "edit", label: "Edit", disableSorting: true },
            { id: "transactionDate", label: "Transaction Date" }
        ]
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    } = useTable(transactionRecord, headCells, filterFn, [1, 2, 3]);

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
                'Authorization': 'Bearer ' + localStorage.getItem('dispenseToken')
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData => {
            setIsDeleting(false);
            closeDeleteModalHandler();
            operationHandler("delete", openDeleteModal.transactionId, null);
        }).catch(err => {
            alert(err);
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
                'Authorization': 'Bearer ' + localStorage.getItem('dispenseToken')
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData => {
            resData.data.transactions.map(ele => {
                ele.amount = +ele.amount;
            })
            setTransactionRecord(resData.data.transactions);

        }).catch(err => {
            alert(err);
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

    }

    const operationHandler = (operation, id, entry) => {
        const transactionRecordCopy = [...transactionRecord];
        switch (operation) {
            case "delete":
                const indexDelete = transactionRecordCopy.findIndex(ele => ele._id === id);
                transactionRecordCopy.splice(indexDelete, 1);
                setTransactionRecord(transactionRecordCopy);
                break;
            case "update":
                const indexUpdate = transactionRecordCopy.findIndex(ele => ele._id === id);
                transactionRecordCopy[indexUpdate] = { ...entry };

                setTransactionRecord(transactionRecordCopy);
                break;
            case "create":
                transactionRecordCopy.push({ ...entry });

                setTransactionRecord(transactionRecordCopy);
                break;
        }
    }

    return (
        <Fragment>
            <div className={classescss["record-container"]}>
                <h2>{props.patientInfo[0].caseCode + " " + props.patientInfo[0].chineseName + "(" + props.patientInfo[0].englishName + ")"}</h2>

                {/* Modal pops up when clicked */}
                <Modal show={openEntry.open} modalClosed={closeEntryHandler}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TransactionEntry
                            token={localStorage.getItem('dispenseToken')}
                            cancelModal={closeEntryHandler}
                            patientId={props.patientId}
                            transactionId={openEntry.transactionId}
                            entryChangeHandler={operationHandler}
                        />
                    </Suspense>
                </Modal>
                <Modal show={openDeleteModal.open} modalClosed={closeDeleteModalHandler}>
                    {isDeleting ? <Loader /> :
                        <Fragment>
                            <p style={{ fontSize: "large" }}>Are you sure you want to delete this transaction entry?</p>
                            <Button buttonNames={["Delete", "Cancel"]} action={deleteHandler} cancel={closeDeleteModalHandler} />
                        </Fragment>}
                </Modal>

                <div className={classescss['icon-container']}>
                    <IconButton onClick={() => openEntryHandler(null)}>
                        <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                    </IconButton>
                    <span>Add new entry</span>
                </div>
                {transactionRecord && transactionRecord.length === 0 ?
                    <p>The patient does not have any transaction record.</p> :
                    <Paper>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {transactionRecord ?
                                    recordsAfterPaginationAndSorting().map((row, index) => (
                                        <TableRow key={row._id} style={index % 2 ? { background: "#e9e9e9" } : { background: "white" }}>
                                            <TableCell align="left" width="20%">
                                                <IconButton onClick={() => openEntryHandler(row._id)}>
                                                    <EditIcon style={{ fill: "#1053ab", cursor: 'pointer' }} />
                                                </IconButton>
                                                <IconButton onClick={() => openDeleteModalHandler(row._id)}>
                                                    <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
                                                </IconButton>
                                            </TableCell>
                                            {width > 800 &&
                                                <Fragment>
                                                    <TableCell align="left" width="20%">
                                                        <IconButton onClick={() => openInNewTab(row._id)}>
                                                            <PrintIcon style={{ fill: "#ab9910", cursor: 'pointer' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                    {[...Array(longestEntryLength)].map((x, i) =>
                                                        <Fragment key={i}>
                                                            <TableCell align="left" width="10%">{i >= row.drugs ? null : row.drugs[i]}</TableCell>
                                                            <TableCell align="left" width="10%">{i >= row.quantities ? null : row.quantities[i]}</TableCell>
                                                        </Fragment>
                                                    )}
                                                </Fragment>}
                                            {width > 450 ? <TableCell align="left" width="20%">{row.amount}</TableCell> : null}
                                            <TableCell align="left" width="20%">{row.transactionDate.substring(0, 10)}</TableCell>
                                        </TableRow>
                                    )) : null}
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                }
            </div>
        </Fragment>
    )
}

export default TransactionRecord;