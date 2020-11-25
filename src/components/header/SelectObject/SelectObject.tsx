import * as React from "react";
import {useState} from "react";

import {createStyles, fade, FormControl, MenuItem, Paper, Select, Theme} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";
import {TargetObject} from "./interfaces/TargetObject";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
            minWidth: 200,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

    }),
);

export const SelectObject = () => {

    const classes = useStyles();

    const [idSelectedObject, setIdSelectedObject] = useState<string>('');
    const [listObjects, setListObjects] = useState<TargetObject[]>([
        {
            id: '123',
            officialName: 'Стрелка'
        }, {
            id: '456',
            officialName: 'Белка'
        }
    ]);

    const handleOnSelectObject = (event: React.ChangeEvent<{ value: unknown }>) => {
        setIdSelectedObject(event.target.value as string);
    }

    return (
        <Paper style={{margin: '10px'}}>
            <FormControl className={classes.formControl}>
                <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={idSelectedObject}
                    onChange={handleOnSelectObject}
                >
                    <MenuItem disabled value='' >
                        Объект
                    </MenuItem>
                    {listObjects.map(targetObject => (
                        <MenuItem key={targetObject.id} value={targetObject.id}>
                            {targetObject.officialName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    )
}
