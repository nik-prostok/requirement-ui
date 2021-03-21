import * as React from "react";
import {useCallback, useState} from "react";

import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    createStyles,
    Grid,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";

import DoneAllIcon from '@material-ui/icons/DoneAll';
import WarningIcon from '@material-ui/icons/Warning';
import SaveIcon from "@material-ui/icons/Save";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {AddTechTaskApi} from "./api/AddTechTask.api";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropZone: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#6e6e6e',
            borderStyle: 'dashed',
            backgroundColor: '#ffffff',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out'
        },
        card: {}
    }),
);

export interface AddTechTaskProps {
    onAddTechTask?: () => void;
}

export const AddTechTask = ({onAddTechTask}:AddTechTaskProps) => {

    const classes = useStyles();

    const [nameTechTask, setNameTechTask] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessLoaded, setIsSuccessLoaded] = useState<boolean>(false);

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
    }, [])

    const {acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: '.pdf',
        maxFiles: 1
    })

    const acceptedFile = () => {
        if (acceptedFiles.length) return (
            <>
                <Typography>
                    Прикрепленный файл:
                </Typography>
                {acceptedFiles.map(file => (
                    <li key={file.name}>
                        {file.name}
                    </li>
                ))}
            </>
        )
        return null
    }

    const onChangeNameTechTask = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNameTechTask(event.target.value as string);
    }

    const onSaveTechTask = async () => {
        setIsLoading(true);
        setIsSuccessLoaded(false);
        setIsError(false);
        try {
            let bodyFormData = new FormData();
            bodyFormData.append('targetObjectId', selectedTargetObjectId);
            bodyFormData.append('nameTechTask', nameTechTask);
            bodyFormData.append('techTaskDoc', acceptedFiles[0]);
            await AddTechTaskApi.addTechTask(bodyFormData);
            setIsSuccessLoaded(true);
        } catch {
            setIsError(true);
        } finally {
            if (onAddTechTask) {
                onAddTechTask();
            }
            setIsLoading(false);
        }
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction={'column'} spacing={3}>
                    <Grid item>
                        <Typography variant="h6">
                            Добавить ТЗ
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField value={nameTechTask} onChange={onChangeNameTechTask} label="Название документа"/>
                    </Grid>
                    <Grid item>
                        <div {...getRootProps()} className={classes.dropZone}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Перетащите файл сюда...</p> :
                                    <p>Перетащите или выберите файл ТЗ в формате pdf</p>
                            }
                        </div>
                        <aside>
                            {acceptedFile()}
                        </aside>
                    </Grid>
                    <Grid item container direction={"row-reverse"} spacing={3}>
                        <Grid item>
                            <Button
                                onClick={onSaveTechTask}
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon/>}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                        {isLoading && <Grid item>
                            <CircularProgress/>
                        </Grid>}
                        {isError && <Grid item>
                            <WarningIcon fontSize={"large"} color={'error'}/>
                        </Grid>}
                        {isSuccessLoaded && <Grid item>
                            <DoneAllIcon fontSize={"large"} color={'primary'}/>
                        </Grid>}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

}
