import * as React from "react";
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
import SaveIcon from "@material-ui/icons/Save";
import WarningIcon from "@material-ui/icons/Warning";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {makeStyles} from "@material-ui/core/styles";
import {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

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

export interface AddDocProps {
    onSaveDoc: (nameDoc: string, file: File) => void;
    isLoading?: boolean;
    isError?: boolean
    isSuccessLoaded?: boolean;
    titleForm?: string;
}

export const AddDoc = ({titleForm = '', onSaveDoc, isLoading = false, isError = false, isSuccessLoaded= false}: AddDocProps) => {

    const classes = useStyles();

    const [nameDoc, setNameDoc] = useState<string>('');

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
        setNameDoc(event.target.value as string);
    }

    const onSaveDocHandler = () => {
        onSaveDoc(nameDoc, acceptedFiles[0]);
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container direction={'column'} spacing={3}>
                    <Grid item>
                        <Typography variant="h6">
                            {`Добавить ${titleForm}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <TextField value={nameDoc} onChange={onChangeNameTechTask} label="Название документа"/>
                    </Grid>
                    <Grid item>
                        <div {...getRootProps()} className={classes.dropZone}>
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Перетащите файл сюда...</p> :
                                    <p>{`Перетащите или выберите файл ${titleForm} в формате pdf`}</p>
                            }
                        </div>
                        <aside>
                            {acceptedFile()}
                        </aside>
                    </Grid>
                    <Grid item container direction={"row-reverse"} spacing={3}>
                        <Grid item>
                            <Button
                                onClick={onSaveDocHandler}
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
