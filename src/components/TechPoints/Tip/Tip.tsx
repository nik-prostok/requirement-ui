import * as React from 'react';

import "./Tip.style.css";
import {
    Button,
    createStyles,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Mode, Pim} from "../../../framework/Pims/interfaces/pims";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {PimsApi} from "../../../framework/Pims/api/getPims.api";
import {ModesApi} from "../api/Modes.api";

interface TipProps {
    onConfirm: (description: string, selectedPim: string, selectedModeId: string) => void,
    onOpen: () => void,
    onUpdate?: () => void,
    tipText: string;
    selectedTargetObjectId: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 150,
        },
    }),
);

export const Tip = ({onConfirm, onOpen, onUpdate, tipText, selectedTargetObjectId}: TipProps) => {

    const classes = useStyles();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [compactMode, setCompactMode] = useState(true);
    const [description, setDescription] = useState('');
    const [selectedPim, setSelectedPim] = useState<Pim | null>(null);
    const [selectedModeId, setSelectedModeId] = useState<string>('');

    const [modes, setModes] = useState<Mode[]>([]);
    const [pims, setPims] = useState<Pim[]>([]);

    useEffect(() => {
        setSelectedPim(null);
        if (selectedTargetObjectId) {
            fetchPims();
        }
    }, [selectedTargetObjectId])

    useEffect(() => {
        if (onUpdate) {
            onUpdate();
        }
    }, [compactMode]);

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

    useEffect(() => {
        if (selectedPim) {
            setModes(selectedPim.modes)
        }
    }, [selectedPim])

    const handleChangePim = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPim(event.target.value as Pim);
    };

    const handleChangeMode = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedModeId(event.target.value as string);
    };

    const onChangeName = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDescription(event.target.value as string);
    }

    return (
        <div className="Tip">
            {compactMode ? (
                <div
                    className="Tip__compact"
                    onClick={() => {
                        onOpen();
                        setCompactMode(false);
                    }}
                >
                    {tipText}
                </div>
            ) : (
                <Grid className="Tip__card" container direction={'column'} spacing={1}>
                    <Grid item>
                        <Typography variant="subtitle1">
                            Добавить ТП
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <TextField label="Название пункта" onChange={onChangeName}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel>ПиМ</InputLabel>
                            <Select value={selectedPim} onChange={handleChangePim}>
                                <MenuItem disabled value={0}>
                                    Выберите ПиМ
                                </MenuItem>
                                {pims.map(pim => <MenuItem value={pim as any}>{pim.namePiM}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Режим</InputLabel>
                            <Select disabled={!selectedPim} value={selectedModeId} onChange={handleChangeMode}>
                                <MenuItem disabled value={0}>
                                    Выберите режим
                                </MenuItem>
                                {modes.map(mode => <MenuItem value={mode._id}>{mode.modeNo} {mode.modeName}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!selectedPim || !selectedModeId || !description}
                            color="primary"
                            variant={"contained"}
                            onClick={event => {
                                event.preventDefault();
                                onConfirm(description, selectedPim ? selectedPim._id : '', selectedModeId);
                            }}>Сохранить</Button>
                    </Grid>
                </Grid>

            )}
        </div>
    );
}
