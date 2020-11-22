import * as React from 'react';

import clsx from 'clsx';
import {
    AppBar,
    IconButton,
    Typography,
    Toolbar,
    CssBaseline, InputBase, Button,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";
import {LeftMenu} from "./LeftMenu/LeftMenu";
import {useStyles} from "./Header.styles";
import {SelectObject} from "./SelectObject/SelectObject";

import SearchIcon from '@material-ui/icons/Search';

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
                <Typography variant="h6">
                    Система управления требованиями
                </Typography>
                <SelectObject/>
                <Button color="inherit">Login</Button>
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

