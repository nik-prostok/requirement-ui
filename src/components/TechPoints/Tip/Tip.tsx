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
import {Mode} from "../interfaces/Modes";
import {Pim} from "../../../framework/Pims/interfaces/pims";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {PimsApi} from "../../../framework/Pims/api/getPims.api";
import {ModesApi} from "../api/Modes.api";

interface TipProps {
    onConfirm: (description: string, selectedPim: number, selectedModeId: number) => void,
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
    const [selectedPimId, setSelectedPimId] = useState<number>(0);
    const [selectedModeId, setSelectedModeId] = useState<number>(0);

    const [modes, setModes] = useState<Mode[]>([]);
    const [pims, setPims] = useState<Pim[]>([]);

    useEffect(() => {
        setSelectedPimId(0);
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

    const fetchModes = async (pimId: number) => {
        setIsLoading(true);
        setIsError(false);
        try {
            setModes(await ModesApi.fetchModesByPimId(pimId));
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleChangePim = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPimId(event.target.value as number);
        fetchModes(event.target.value as number);
    };

    const handleChangeMode = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedModeId(event.target.value as number);
    };

    const onChangeDescription = (event: React.ChangeEvent<{ value: unknown }>) => {
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
                            <InputLabel>Режим</InputLabel>
                            <Select disabled={!selectedPimId} value={selectedModeId} onChange={handleChangeMode}>
                                <MenuItem disabled value={0}>
                                    Выберите режим
                                </MenuItem>
                                {modes.map(mode => <MenuItem value={mode.id}>{mode.simulatedMode}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <TextField label="Описание" onChange={onChangeDescription}/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!selectedPimId || !selectedModeId || !description}
                            color="primary"
                            variant={"contained"}
                            onClick={event => {
                                event.preventDefault();
                                onConfirm(description, selectedPimId, selectedModeId);
                            }}>Сохранить</Button>
                    </Grid>
                </Grid>
                /*<form
                    className="Tip__card"
                >
                    <TextField label="Описание" onChange={onChangeDescription}/>
                    <Button variant={"contained"} onClick={event => {
                        event.preventDefault();
                        onConfirm(description);
                    }}>Сохранить</Button>
                </form>*/
            )}
        </div>
    );
}

/*
export class Tip extends React.Component<TipProps, TipState> {

    constructor(props: TipProps | Readonly<TipProps>) {
        super(props);
        this.state = {
            compact: true,
            text: "",
        }
    }

    // for TipContainer
    componentDidUpdate(nextProps: TipProps, nextState: TipState) {
        const {onUpdate} = this.props;

        if (onUpdate && this.state.compact !== nextState.compact) {
            onUpdate();
        }
    }

    render() {
        const {onConfirm, onOpen, tipText} = this.props;
        const {compact} = this.state;

        return (
            <div className="Tip">
                {compact ? (
                    <div
                        className="Tip__compact"
                        onClick={() => {
                            onOpen();
                            this.setState({compact: false});
                        }}
                    >
                        {tipText}
                    </div>
                ) : (
                    <form
                        className="Tip__card"
                    >
                        <TextField label="Описание" />
                        <Button variant={"contained"} onClick={event => {
                            event.preventDefault();
                            onConfirm();
                        }}>Сохранить</Button>
                    </form>
                )}
            </div>
        );
    }
}
*/
