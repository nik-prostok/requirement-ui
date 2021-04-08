import * as React from "react";
import {Grid} from "@material-ui/core";
import {AddDoc} from "../AddDocs/AddDoc";
import {AddDocsApi} from "../AddDocs/api/AddDocsApi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {TechTaskListApi} from "../TechTask/ListTechTask/api/TechTasksList.api";
import {TechTask} from "./ListTechTask/interfaces/TechTaskList.interface";
import {TechTasksList} from "../TechTask/ListTechTask/TechTaskList";

export interface TechTasksProps {
    onTechTasksAdd?: () => void;
}

export const TechTasks = ({onTechTasksAdd}: TechTasksProps) => {

    const [techTasksList, setTechTasksList] = useState<TechTask[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessLoaded, setIsSuccessLoaded] = useState<boolean>(false);

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        if (selectedTargetObjectId) fetchTechTasksList();
    }, [selectedTargetObjectId])

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

    const onSaveTechTask = async (nameTechTask: string, file: File) => {
        setIsLoading(true);
        setIsSuccessLoaded(false);
        setIsError(false);
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('targetObjectId', selectedTargetObjectId);
            bodyFormData.append('nameTechTask', nameTechTask);
            bodyFormData.append('techTaskDoc', file);
            await AddDocsApi.addTechTask(bodyFormData);
            fetchTechTasksList();
            setIsSuccessLoaded(true);
        } catch {
            setIsError(true);
        } finally {
            if (onTechTasksAdd) {
                onTechTasksAdd();
            }
            setIsLoading(false);
        }
    }

    return (
        <Grid container spacing={2} direction={"row"}>
            <Grid item xs={3}>
                <AddDoc
                    onSaveDoc={onSaveTechTask}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccessLoaded={isSuccessLoaded}
                    titleForm={'ТЗ'}
                />
            </Grid>
            <Grid item xs={5}>
                <TechTasksList techTasksList={techTasksList} isErrorRender={isError} isLoadingRender={isLoading}/>
            </Grid>
        </Grid>
    )
}
