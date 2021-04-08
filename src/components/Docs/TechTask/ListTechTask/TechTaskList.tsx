import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {TechTask} from "./interfaces/TechTaskList.interface";
import {RootState} from "../../../../store/createStore";
import {TechTaskListApi} from "./api/TechTasksList.api";
import {
    CircularProgress, Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

export interface TechTaskListProps {
    techTasksList: TechTask[];
    isLoadingRender?: boolean;
    isErrorRender?: boolean;
}

export const TechTasksList = ({techTasksList, isErrorRender = false, isLoadingRender = false}: TechTaskListProps) => {

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    const renderTable = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <b>Название ТЗ</b>
                        </TableCell>
                        <TableCell align="right"><b>ID</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {techTasksList.map((techTask) => (
                        <TableRow key={techTask._id}>
                            <TableCell component="th" scope="row">
                                {techTask.titleTechTask}
                            </TableCell>
                            <TableCell align="right">{techTask._id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    const renderStatusMessage = () => (
        <Paper style={{padding: '40px'}}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {!selectedTargetObjectId &&
                <Typography variant={'h6'}>Для просмотра ТЗ, выберите объект</Typography>}
                {isLoadingRender && <CircularProgress size={50}/>}
                {isErrorRender && <WarningIcon fontSize={"large"} color={'error'}/>}
            </Grid>
        </Paper>
    )

    return (!selectedTargetObjectId || isLoadingRender || isErrorRender) ?
        renderStatusMessage() : renderTable()
}
