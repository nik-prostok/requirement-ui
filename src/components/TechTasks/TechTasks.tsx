import * as React from "react";
import {useEffect, useState} from "react";

import {
    createStyles,
    Grid,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store/createStore";
import {AddTechTask} from "./AddTechTask/AddTechTask";
import {TechTasksList} from "./ListTechTask/TechTaskList";
import {TechTask} from "./ListTechTask/interfaces/TechTaskList.interface";
import {TechTaskListApi} from "./ListTechTask/api/TechTasksList.api";
import {GenerateAct} from "./GenerateAct/GenerateAct";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const TechTasks = () => {

    const classes = useStyles();

    const [techTasksList, setTechTasksList] = useState<TechTask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        if (selectedTargetObjectId) fetchTechTasksList();
    }, [selectedTargetObjectId])

    const onAddTechTask = () => {
        if (selectedTargetObjectId) fetchTechTasksList();
    }

    const fetchTechTasksList = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            setTechTasksList(await TechTaskListApi.getTechTaskListByObjectId(selectedTargetObjectId));
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <AddTechTask onAddTechTask={onAddTechTask}/>
            </Grid>
            <Grid item xs={7}>
                <TechTasksList techTasksList={techTasksList} isErrorRender={isError} isLoadingRender={isLoading}/>
            </Grid>
            <Grid item xs={5}>
                <GenerateAct/>
            </Grid>
        </Grid>
    )
}
