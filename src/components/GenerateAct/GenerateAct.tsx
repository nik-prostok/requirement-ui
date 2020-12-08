import * as React from 'react';
import {useEffect, useState} from "react";

import {
    Button,
    Card,
    CardContent,
    CircularProgress, createStyles,
    FormControl,
    Grid,
    InputLabel, Link, MenuItem, Select, Theme,
    Typography
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import WarningIcon from "@material-ui/icons/Warning";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {makeStyles} from "@material-ui/core/styles";

import {Pim} from "../../framework/Pims/interfaces/pims";
import {PimsApi} from "../../framework/Pims/api/getPims.api";
import {useSelector} from "react-redux";
import {RootState} from "../../store/createStore";
import {Subsystem} from "../../framework/Subsystems/interfaces/subsystems";
import {SubsystemApi} from "../../framework/Subsystems/api/getSubsystems.api";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 240,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export const GenerateAct = () => {

    const classes = useStyles();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccessGenerate, setIsSuccessGenerate] = useState<boolean>(false);

    const [selectedPimId, setSelectedPimId] = useState<number>();
    const [selectedSubsystemId, setSubsystemId] = useState<number>();

    const [pims, setPims] = useState<Pim[]>([]);
    const [subsystems, setSubsystems] = useState<Subsystem[]>([]);
    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    const handleChangePim = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPimId(event.target.value as number);
    };

    const handleChangeSubsystem = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSubsystemId(event.target.value as number);
    };

    useEffect(() => {
        setSelectedPimId(0);
        setSubsystemId(0);
        if (selectedTargetObjectId) {
            fetchPims();
            fetchSubsystems();
        }
    }, [selectedTargetObjectId])

    const fetchPims = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            setPims(await PimsApi.getPimsByObjectId(selectedTargetObjectId));
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchSubsystems = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            setSubsystems(await SubsystemApi.getSubsystemsByObjectId(selectedTargetObjectId));
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const renderGenerateForm = () => (
        !isLoading ? <Grid container direction={'column'} spacing={3}>
            <Grid item>
                <Typography variant="h6">
                    Сгенерировать акт
                </Typography>
            </Grid>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <InputLabel>ПиМ</InputLabel>
                    <Select value={selectedPimId} onChange={handleChangePim}>
                        <MenuItem disabled value={0}>
                            Выберите ПиМ
                        </MenuItem>
                        {pims.map(pim => <MenuItem value={pim.id}>ПиМ {pim.id}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <InputLabel>Подсистема</InputLabel>
                    <Select value={selectedSubsystemId} onChange={handleChangeSubsystem}>
                        <MenuItem disabled value={0}>
                            Выберите подсистему
                        </MenuItem>
                        {subsystems.map(subsystem => <MenuItem value={subsystem.id}>{subsystem.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>

            </Grid>
            <Grid item container direction={"row-reverse"} spacing={3}>
                <Grid item>
                    <Button
                        disabled={!selectedSubsystemId || !selectedPimId}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon/>}
                    >
                        <Link
                            color={'inherit'}
                            href={`localhost:8080/api/act?pimId=${selectedPimId}&subsystemId=${selectedSubsystemId}`}
                            rel="noopener noreferrer"
                            target="_blank">
                            Сгенерировать
                        </Link>
                    </Button>

                </Grid>
                {isLoading && <Grid item>
                    <CircularProgress/>
                </Grid>}
                {isError && <Grid item>
                    <WarningIcon fontSize={"large"} color={'error'}/>
                </Grid>}
                {isSuccessGenerate && <Grid item>
                    <DoneAllIcon fontSize={"large"} color={'primary'}/>
                </Grid>}
            </Grid>
        </Grid> : renderLoader()
    )

    const renderLoader = () => (
        <CircularProgress size={50}/>
    )

    const renderEmptyForm = () => (
        <Typography variant={'h6'}>Для генерации выберите объект</Typography>
    )

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Card>
                    <CardContent>
                        {selectedTargetObjectId ? renderGenerateForm() : renderEmptyForm()}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
