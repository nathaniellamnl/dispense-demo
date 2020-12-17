import React, { useState } from 'react';

import useCRUD from '../Utils/us'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function useCRUD(records, openModalHandler) {


    const deleteHandler = () => {
        openModalHandler(true);
    }

    const deleteIcon = () => {
        return (
            <IconButton onClick={() => openDeleteModalHandler(row._id)}>
                <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
            </IconButton>
        )
    }


    const recordsAfterOperation = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }

    return {
        recordsAfterOperation,
        deleteIcon
    };
}