import React, { useState } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

export default function useCRUD(records, openModalHandler) {

    const deleteHandler = () => {
        openModalHandler(true);

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

        fetch(graphqlServerUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('dispenseToken')
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed");
            }
            return res.json();
        }).then(resData => {
            setIsDeleting(false);
            closeDeleteModalHandler();
            operationHandler("delete",openDeleteModal.transactionId,null);
        }).catch(err => {
            alert(err);
            setIsDeleting(false);
        })
 
    }

    const DeleteButton = (props) => {
        return (
            <IconButton onClick={() => openDeleteModalHandler(row._id)}>
                <DeleteIcon style={{ fill: "black", cursor: 'pointer' }} />
            </IconButton>
        )
    }


    const recordsAfterOperation = () => {
        return records;
    }

    return {
        recordsAfterOperation,
        DeleteButton
    };
}