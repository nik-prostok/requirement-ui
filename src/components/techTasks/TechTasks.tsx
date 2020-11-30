import * as React from "react";
import {useCallback} from "react";

import {
    Box, Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    Container,
    createStyles,
    Grid,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AddTechTask} from "./AddTechTask/AddTechTask";
import {TechTasksList} from "./ListTechTask/TechTaskList";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const TechTasks = () => {


    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <AddTechTask/>
            </Grid>
            <Grid item xs={7}>
                <TechTasksList/>
            </Grid>
        </Grid>
    )
}
