import * as React from "react";
import {useEffect, useState} from "react";

import {
    createStyles,
    Grid,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PiMs} from "./PiMs/PiMs";
import {TechTasks} from "./TechTask/TechTasks";

const useStyles = makeStyles((theme: Theme) => createStyles({
    gridContainer: {
        padding: 0,
        margin: 0
    }
}));

export const Docs = () => {

    const classes = useStyles();

    return (
        <Grid container direction={'column'} spacing={1}>
            <Grid item>
                <PiMs/>
            </Grid>
            <Grid item>
                <TechTasks/>
            </Grid>
        </Grid>
    )
}
