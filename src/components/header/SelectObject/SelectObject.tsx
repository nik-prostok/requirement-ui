import * as React from "react";
import {useEffect, useState} from "react";

import {CircularProgress, createStyles, fade, FormControl, MenuItem, Paper, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import {
    fetchTargetObject,
    setSelectedTargetObjectById
} from "../../../store/modules/targetObjects/TargetObjects.action";
import {RootState} from "../../../store/createStore";

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
        loader: {
            color: theme.palette.secondary.light
        }
    }),
);

export const SelectObject = () => {

    const classes = useStyles();

    const {targetObjects, isLoading} = useSelector((state: RootState) => {
        return {
            targetObjects: state.targetObjects.targetObjects.targetObjectsList,
            isLoading: state.targetObjects.targetObjects.isFetching
        }
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTargetObject())
    }, [])

    const [idSelectedObject, setIdSelectedObject] = useState<string>('');

    const handleOnSelectObject = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedObjectId: string = event.target.value as string;
        setIdSelectedObject(selectedObjectId);
        dispatch(setSelectedTargetObjectById(selectedObjectId))
    }

    return (
        <>
            {isLoading && <CircularProgress className={classes.loader}/>}
            <Paper style={{margin: '10px'}}>
                <FormControl className={classes.formControl}>
                    <Select
                        disabled={isLoading}
                        displayEmpty
                        value={idSelectedObject}
                        onChange={handleOnSelectObject}
                    >
                        <MenuItem disabled value=''>
                            Выберите объект
                        </MenuItem>
                        {targetObjects.map(targetObject => (
                            <MenuItem key={targetObject.id} value={targetObject.id}>
                                {targetObject.officialName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>
        </>
    )
}
