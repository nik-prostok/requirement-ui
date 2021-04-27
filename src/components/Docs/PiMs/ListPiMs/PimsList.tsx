import * as React from "react";
import {useSelector} from "react-redux";

import {RootState} from "../../../../store/createStore";
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
import {Pim} from "./interfaces/pims.interface";

export interface TechTaskListProps {
    pimsList: Pim[];
    isLoadingRender?: boolean;
    isErrorRender?: boolean;
}

export const PimsList = ({pimsList, isErrorRender = false, isLoadingRender = false}: TechTaskListProps) => {

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
                    {pimsList.map((pim) => (
                        <TableRow key={pim._id}>
                            <TableCell component="th" scope="row">
                                {pim.namePiM}
                            </TableCell>
                            <TableCell align="right">{pim._id}</TableCell>
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
                <Typography variant={'h6'}>Для просмотра документов ПиМ, выберите объект</Typography>}
                {isLoadingRender && <CircularProgress size={50}/>}
                {isErrorRender && <WarningIcon fontSize={"large"} color={'error'}/>}
            </Grid>
        </Paper>
    )

    return (!selectedTargetObjectId || isLoadingRender || isErrorRender) ?
        renderStatusMessage() : renderTable()
}
