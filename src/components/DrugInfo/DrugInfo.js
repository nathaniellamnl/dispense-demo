import React, { Fragment, useState, useEffect } from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

import Loader from '../Loader/Loader';
import useTable from '../Table/useTable';
import { graphqlServerUrl } from '../../assets/String';
import classes from './DrugInfo.module.css';
import { Font } from '@react-pdf/renderer';

const headCells = [
    { id: "name", label: "Drug Item" },
    { id: "price", label: "Price" },
    { id: "quantity", label: "Available Quantity" },
    { id: "edit", label:"Edit", disableSorting: true}
]

const DrugInfo = (props) => {
    const [drugs, setDrugs] = useState([
        {name:"Aspirin 80mg", price:"80",quantity:"500"},
        {name:"Omeprazole 20mg", price:"60",quantity:"100"},
        {name:"Bisolvon 8mg", price:"50",quantity:"200"},
        {name:"Ciprofloxacin 250mg", price:"40",quantity:"300"},
        {name:"Digoxin 0.625mg", price:"30",quantity:"400"},
        {name:"Edoxaban 80mg", price:"20",quantity:"600"},
    ]);

    const [filterFn, setFilterFn] = useState({
        fn: items => items,
        value:null
    });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    } = useTable(drugs, headCells, filterFn);

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
            setDrugs(resData.data.druginfos);
        }).catch(err => {
            alert(err);
        })
    }, []);

    const handleSearch = e =>{
        let target = e.target;
        setFilterFn({
            fn: items => {
                if(target.value === "") {
                    return items;
                } else {
                    console.log(items[0].name.toLowerCase()); 
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()));
                }
            },
            value:target.value
        })
    }

    return (
        <div className={classes.Layout}>
            <textarea 
            value={filterFn.value}
            placeholder="Search" 
            rows="1"
            cols="160"
            onChange={handleSearch}
            />
            <TblContainer>
                <TblHead />
                <TableBody>
                    {recordsAfterPaginationAndSorting().map(ele => (
                        <TableRow key={ele._id}>
                            <TableCell>{ele.name}</TableCell>
                            <TableCell>{ele.price}</TableCell>
                            <TableCell>{ele.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TblContainer>
            <TblPagination />
        </div>
    )
}

export default DrugInfo; 