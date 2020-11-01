import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const CheckBox = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <Fragment>
            <FormGroup row>
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleChange} name="checkedA" />}
                    label="Prepaid"
                />
            </FormGroup>
            {isChecked && <input type="text"/>}
        </Fragment>
    )

}

export default CheckBox;