import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {TechTask} from "./interfaces/TechTaskList.interface";
import {RootState} from "../../../store/createStore";
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

export const TechTasksList = () => {

    const [techTasksList, setTechTasksList] = useState<TechTask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessLoaded, setIsSuccessLoaded] = useState<boolean>(false);
    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    const fetchTechTasksList = async () => {
        setIsLoading(true);
        setIsSuccessLoaded(false);
        setIsError(false);
        try {
            setTechTasksList(await TechTaskListApi.getTechTaskListByObjectId(selectedTargetObjectId));
        } catch {
            setIsError(true);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (selectedTargetObjectId) fetchTechTasksList();
    }, [selectedTargetObjectId])

    const renderTable = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Название ТЗ</TableCell>
                        <TableCell align="right">ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {techTasksList.map((techTask) => (
                        <TableRow key={techTask.id}>
                            <TableCell component="th" scope="row">
                                {techTask.name}
                            </TableCell>
                            <TableCell align="right">{techTask.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    const renderStatusMessage = () => {
        if (!selectedTargetObjectId || isLoading || isError) return (
            <Paper style={{padding: '40px'}}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    {!selectedTargetObjectId &&
                    <Typography variant={'h6'}>Для просмотра ТЗ, выберите объект</Typography>}
                    {isLoading && <CircularProgress size={50}/>}
                    {isError && <WarningIcon fontSize={"large"} color={'error'}/>}
                </Grid>
            </Paper>)
        return null;
    }

    return (
        <>
            {renderTable()}
            {renderStatusMessage()}
        </>
    )
}
