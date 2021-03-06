import React, { useState } from 'react';
import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core';
import { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: '#ffffff',
            backgroundColor: 'rgb(171, 16, 50)',
        },
        "& tbody td": {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: "#fffbf2",
            cursor: 'pointer'
        }
    }
}))

export default function useTable(records, headCells, filterFn,pages) {

    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    const TblContainer = props => (
        <Table stickyHeader className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId);
        }

        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(ele => (
                            Array.isArray(ele) ?
                                ele.map((innerEle, i) => {
                                    return (
                                        <Fragment>
                                            <TableCell key={innerEle["drugItem" + (+(i+1))].id}
                                                sortDirection={orderBy === innerEle["drugItem" + (+(i+1))].id ? order : false}>
                                                {innerEle["drugItem" + (+(i+1))].label}
                                            </TableCell>
                                            <TableCell key={innerEle["drugQty" + (+(i+1))]}
                                                sortDirection={orderBy === innerEle["drugQty" + (+(i+1))] ? order : false}>
                                                {innerEle["drugQty" + (+(i+1))].label}
                                            </TableCell>
                                        </Fragment>
                                    )
                                })
                                :
                                <TableCell key={ele.id}
                                    sortDirection={orderBy === ele.id ? order : false} align="left" width="220">
                                    {ele.disableSorting ? ele.label :
                                        <TableSortLabel
                                            active={orderBy === ele.id}
                                            direction={orderBy === ele.id ? order : "asc"}
                                            onClick={() => { handleSortRequest(ele.id) }} >
                                            {ele.label}
                                        </TableSortLabel>}
                                </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const stableSort = (array, comparator) => {
        const sortArray = array.map((ele, index) => [ele, index]);

        sortArray.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        })

        return sortArray.map(ele => ele[0]);
    }

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }

        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }

    const recordsAfterPaginationAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records ? filterFn.fn(records).length : 0}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    };
}