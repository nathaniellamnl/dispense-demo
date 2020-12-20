import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { Paper, TableBody, TableCell, TableRow, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { graphqlServerUrl } from '../../assets/String';
import Loader from '../../UI/Loader/Loader';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import DrugInfoEntry from '../DrugInfoEntry/DrugInfoEntry';
import useTable from '../../UI/Table/useTable';
import classes from './DrugInfo.module.css';

const headCells = [
    { id: "name", label: "Drug Item" },
    { id: "price", label: "Price" },
    { id: "quantity", label: "Available Quantity" },
    { id: "edit", label: "Edit", disableSorting: true }
]

const DrugInfo = (props) => {
    const [drugs, setDrugs] = useState([
        { name: "Loading", price: "", quantity: 0 },
    ]);

    const [filterFn, setFilterFn] = useState({
        fn: items => items,
        value: null
    });

    const [openEntry, setOpenEntry] = useState({ open: false, id: null });
    const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    } = useTable(drugs, headCells, filterFn,[5,10,15]);

    useEffect(() => {
        const requestBody = {
            query: `
                 query Drugs {
                   drugs{
                       _id
                       name 
                       price
                       quantity
                   }
                 }
              `
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
            resData.data.drugs.map(ele => {
                ele.price = +ele.price;
            })
            setDrugs(resData.data.drugs);
        }).catch(err => {
            alert(err);
        })
    }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    console.log(items[0].name.toLowerCase());
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()));
                }
            },
            value: target.value
        })
    }


    const openEntryHandler = (id) => {
        setOpenEntry({ open: true, id: id });
    }

    const closeEntryHandler = () => {
        setOpenEntry({ open: false, id: null });
    }

    const openDeleteModalHandler = (id) => {
        setOpenDeleteModal({ open: true, id: id });
    }

    const closeDeleteModalHandler = () => {
        setOpenDeleteModal({ open: false, id: null });
    }

    const deleteHandler = () => {
        const requestBody = {
            query: `
                 mutation DeleteDrug($id:ID!) {
                   deleteDrug(_id:$id)
                 }
              `,
            variables: {
                id: openDeleteModal.id
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
            operationHandler("delete", openDeleteModal.id, null);
        }).catch(err => {
            alert(err);
            setIsDeleting(false);
        })
    }

    const operationHandler = (operation, id, entry) => {
        const drugsCopy = [...drugs];
        switch (operation) {
            case "delete":
                const indexDelete = drugsCopy.findIndex(ele => ele._id === id);
                drugsCopy.splice(indexDelete, 1);
                setDrugs(drugsCopy);
                break;
            case "update":
                const indexUpdate = drugsCopy.findIndex(ele => ele._id === id);
                drugsCopy[indexUpdate] = { ...entry };
                setDrugs(drugsCopy);
                break;
            case "create":
                drugsCopy.push({ ...entry });
                setDrugs(drugsCopy);
                break;
        }
    }

    return (
        <div className={classes.Layout}>
            <textarea
                value={filterFn.value?filterFn.value:""}
                placeholder="Search"
                rows="1"
                cols="160"
                onChange={handleSearch}
            />
            <Modal show={openEntry.open} modalClosed={closeEntryHandler}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DrugInfoEntry
                        token={localStorage.getItem('dispenseToken')}
                        cancelModal={closeEntryHandler}
                        id={openEntry.id}
                        entryChangeHandler={operationHandler}
                    />
                </Suspense>
            </Modal>
            <Modal show={openDeleteModal.open} modalClosed={closeDeleteModalHandler}>
                {isDeleting ? <Loader /> :
                    <Fragment>
                        <p style={{ fontSize: "large" }}>Are you sure you want to delete this entry?</p>
                        <Button buttonNames={["Delete", "Cancel"]} action={deleteHandler} cancel={closeDeleteModalHandler} />
                    </Fragment>}
            </Modal>
            <div style={{display: "flex", alignItems:"center", justifyContent:"flex-end"}}>
                <IconButton onClick={() => openEntryHandler(null)}>
                    <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                </IconButton>
                <span>Add new entry</span>
            </div>
            <Paper>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPaginationAndSorting().map(ele => (
                            <TableRow key={ele._id} >
                                <TableCell align="left" width="220" key={ele._id + "name"} >{ele.name}</TableCell>
                                <TableCell align="left" width="220" key={ele._id + "price"}>{ele.price}</TableCell>
                                <TableCell align="left" width="220" key={ele._id + "quantity"}>{ele.quantity}</TableCell>
                                <TableCell align="left" width="220" key={ele._id + "edit"}>
                                    <Fragment>
                                        {drugs.length > 1 ?
                                            <Fragment>
                                                <IconButton onClick={() => openEntryHandler(ele._id)}>
                                                    <EditIcon style={{ fill: "#1053ab", cursor: 'pointer' }} />
                                                </IconButton>
                                                <IconButton onClick={() => openDeleteModalHandler(ele._id)}>
                                                    <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
                                                </IconButton>
                                            </Fragment>
                                            : null
                                        }
                                    </Fragment>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
        </div>
    )
}

export default DrugInfo; 