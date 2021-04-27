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
import {Mode, Pim} from "../../Docs/PiMs/ListPiMs/interfaces/pims.interface";
import {makeStyles} from "@material-ui/core/styles";
import {PimsApi} from "../../Docs/PiMs/ListPiMs/api/getPims.api";

interface TipProps {
    onConfirm: (description: string) => void,
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


    useEffect(() => {
        if (onUpdate) {
            onUpdate();
        }
    }, [compactMode]);

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
                            <TextField label="Название режима" onChange={onChangeName}/>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Button
                            disabled={!description}
                            color="primary"
                            variant={"contained"}
                            onClick={event => {
                                event.preventDefault();
                                onConfirm(description);
                            }}>Сохранить</Button>
                    </Grid>
                </Grid>

            )}
        </div>
    );
}
