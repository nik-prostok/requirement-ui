import * as React from 'react';

import clsx from 'clsx';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    CssBaseline
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";
import {LeftMenu} from "./LeftMenu/LeftMenu";
import {useStyles} from "./Header.styles";
import {SelectObject} from "../SelectObject/SelectObject";

export interface HeaderProps {
};

export const Header: React.FunctionComponent<HeaderProps> = ({children}) => {
    const classes = useStyles();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleMenuOpen = () => {
        setIsOpenMenu(true);
    };

    const handleMenuClose = () => {
        setIsOpenMenu(false);
    };

    const renderAppBar = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: isOpenMenu,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenuOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: isOpenMenu,
                    })}
                >
                    <MenuIcon/>
                </IconButton>

                <Typography className={classes.title} variant="h6">
                    Система формирования акта
                </Typography>
                <SelectObject/>
            </Toolbar>
        </AppBar>
    )

    return (
        <div className={classes.root}>
            <CssBaseline/>
            {renderAppBar()}
            <LeftMenu isOpenMenu={isOpenMenu} handleMenuClose={handleMenuClose}/>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
}

