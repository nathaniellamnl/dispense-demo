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
import useWindowDimensions from '../../Utilities/useWindowDimensions';

const DrugInfo = (props) => {
    const [drugs, setDrugs] = useState([
        { name: "Loading", price: "", quantity: "" },
    ]);

    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items.map(x => {
                x.name.toLowerCase();
                return x;
            })
        },
        value: null
    });

    const [openEntry, setOpenEntry] = useState({ open: false, id: null });
    const [showCalculationResults, setShowCalculationResults] = useState({ calculationResults: "", show: false });
    const [desiredQuantity, setDesiredQuantity] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, id: null });
    const [isDeleting, setIsDeleting] = useState(false);
    const { width, height } = useWindowDimensions();

    let headCells;;
    if (width > 800) {
        headCells = [
            { id: "name", label: "Drug Item" },
            { id: "price", label: "Price" },
            { id: "packSize", label: "Pack Size" },
            { id: "quantity", label: "Available Quantity" },
            { id: "manufacturer", label: "Manufacturer" },
            { id: "edit", label: "Edit", disableSorting: true }
        ]
    } else if (width > 450) {
        headCells = [
            { id: "name", label: "Drug Item" },
            { id: "price", label: "Price" },
            { id: "edit", label: "Edit", disableSorting: true }
        ]
    } else {
        headCells = [
            { id: "name", label: "Drug Item" },
            { id: "edit", label: "Edit", disableSorting: true }
        ]
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    } = useTable(drugs, headCells, filterFn, [5, 10, 15]);

    useEffect(() => {
        const requestBody = {
            query: `
                 query Drugs {
                   drugs{
                       _id
                       name 
                       price
                       quantity
                       packSize
                       manufacturer
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
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()));
                }
            },
            value: target.value
        })
    }

    const desiredQuantityHandler = (event) => {
        setDesiredQuantity(parseInt(event.target.value));
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

    const calculateBestDeal = () => {
        const alternatives = filterFn.fn(drugs);
        let dp = [];
        dp.push({ id: [], quantity: 0, price: 0 });

        for (let i = 1; i <= desiredQuantity; i++) {
            let dpPrice = Number.MAX_VALUE;
            let dpItem = alternatives[0];
            let dpQuantity = 0;

            for (let j in alternatives) {
                if (i - alternatives[j].packSize > 0) {
                    const price = dp[i - alternatives[j].packSize].price + alternatives[j].price;

                    if (price < dpPrice) {
                        dpPrice = price;
                        dpItem = alternatives[j]._id;
                        dpQuantity = alternatives[j].packSize;
                    }

                } else {
                    if (alternatives[j].price < dpPrice) {
                        dpPrice = alternatives[j].price;
                        dpItem = alternatives[j]._id;
                        dpQuantity = alternatives[j].packSize;
                    }
                }
            }

            let currDP;
            if (i - dpQuantity > 0) {
                currDP = { ...dp[i - dpQuantity] };
                currDP.id = [...dp[i - dpQuantity].id];
                currDP.id.push(dpItem);
                currDP.quantity += dpQuantity;
                currDP.price = dpPrice;

            } else {
                currDP = { id: [dpItem], quantity: parseInt(dpQuantity), price: parseInt(dpPrice) };
            }
            dp.push(currDP);
        }

        let drugIdCount = {};
        for (const ele of dp[desiredQuantity].id) {
            if (drugIdCount[ele]) {
                drugIdCount[ele] += 1;
            } else {
                drugIdCount[ele] = 1;
            }
        }

        const listedDrugs = filterFn.fn(drugs);
        let calculationResultsString = "The best deal would be to buy ";
        for (const [key, value] of Object.entries(drugIdCount)) {

            const drug = listedDrugs.filter(ele => ele._id == key)[0];
            calculationResultsString += drug.name + "(" + drug.manufacturer + ") " + drug.packSize + "'s x " + value + ", ";
        }
        setShowCalculationResults({ calculationResults: calculationResultsString.replace(/..$/, "."), show: true });
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
            <div className={classes["search-container"]}>
                <textarea
                    value={filterFn.value ? filterFn.value : ""}
                    placeholder="Search"
                    rows="1"
                    cols="30"
                    onChange={handleSearch}
                />
                <div style={{ height: "20px" }}/> {/* sapcer*/}
                <input style={{ padding: "15px" }} type="number" placeholder="Desired quantity" value={desiredQuantity} onChange={desiredQuantityHandler} />
                <button className={classes["calculate-button"]} disabled={desiredQuantity > 0? false:true} onClick={calculateBestDeal}>
                    Calculate
                </button>
            </div>
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
            <Modal show={showCalculationResults.show} modalClosed={() => setShowCalculationResults({ calculationResults: "", show: false })}>
                <p>{showCalculationResults.calculationResults}</p>
            </Modal>
            <Modal show={openDeleteModal.open} modalClosed={closeDeleteModalHandler}>
                {isDeleting ? <Loader /> :
                    <Fragment>
                        <p style={{ fontSize: "large" }}>Are you sure you want to delete this entry?</p>
                        <Button buttonNames={["Delete", "Cancel"]} action={deleteHandler} cancel={closeDeleteModalHandler} />
                    </Fragment>}
            </Modal>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                <span style={{ width: "50px" }} /> {/*spacer */}
                <IconButton onClick={() => openEntryHandler(null)}>
                    <AddCircleIcon style={{ fill: "green", cursor: 'pointer' }} />
                </IconButton>
                <span>Add new entry</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

            </div>
            <Paper>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {recordsAfterPaginationAndSorting().map(ele => (
                            <TableRow key={ele._id} >
                                <TableCell align="left" width="220" key={ele._id + "name"} >{ele.name}</TableCell>
                                {width > 450 && <TableCell align="left" width="220" key={ele._id + "price"}>{ele.price}</TableCell>}
                                {width > 800 &&
                                    (<Fragment>
                                        <TableCell align="left" width="220" key={ele._id + "packSize"}>{ele.packSize}</TableCell>
                                        <TableCell align="left" width="220" key={ele._id + "quantity"}>{ele.quantity}</TableCell>
                                        <TableCell align="left" width="220" key={ele._id + "manufacturer"}>{ele.manufacturer}</TableCell>
                                    </Fragment>
                                    )}
                                <TableCell align="left" width="220" key={ele._id + "edit"}>
                                    <Fragment key={ele._id + "Fragment1"}>
                                        {drugs.length > 1 ?
                                            <Fragment key={ele._id + "Fragment2"}>
                                                <IconButton onClick={() => openEntryHandler(ele._id)} key={ele._id + "Edit"}>
                                                    <EditIcon style={{ fill: "#1053ab", cursor: 'pointer' }} key={ele._id + "EditIcon"} />
                                                </IconButton>
                                                <IconButton onClick={() => openDeleteModalHandler(ele._id)} key={ele._id + "Delete"}>
                                                    <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} key={ele._id + "DeleteIcon"} />
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