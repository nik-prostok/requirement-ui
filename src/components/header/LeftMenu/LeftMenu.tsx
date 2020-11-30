import * as React from 'react';
import {NavLink, useHistory} from "react-router-dom";

import clsx from 'clsx';
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import {useStyles} from "./LeftMenu.styles";
import {menuItems} from "../../../utils/constants/menu";
import {useEffect, useState} from "react";

export const DRAWER_WIDTH = 240;

export interface LeftMenuProps {
    isOpenMenu?: boolean;
    handleMenuClose: () => void;
};

export const LeftMenu = ({isOpenMenu = false, handleMenuClose}: LeftMenuProps) => {

    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    const [selectedMenuPath, setSelectedMenuPath] = useState<string>(history.location.pathname);

    useEffect(() => {
        console.log(history.location.pathname);
    }, [])

    const isSetPath = (path: string) => path === history.location.pathname;

    const onClickItem = (selectedPath: string) => {
        setSelectedMenuPath(selectedPath);
        history.push(selectedPath)
    }

    const listDrawerItems = () => {
        if (menuItems.length) {
            return (<List>
                {menuItems.map((menuItem, index) => (
                    <ListItem key={menuItem.path} button selected={isSetPath(menuItem.path)} onClick={() => onClickItem(menuItem.path)}>
                        <ListItemIcon>
                            {React.createElement(menuItem.icon)}
                        </ListItemIcon>
                        <ListItemText primary={menuItem.label}/>
                    </ListItem>
                ))}
            </List>)
        }
        return null;
    }

    return (
        <Drawer
            open={isOpenMenu}
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: isOpenMenu,
                [classes.drawerClose]: !isOpenMenu,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: isOpenMenu,
                    [classes.drawerClose]: !isOpenMenu,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleMenuClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </div>
            <Divider/>
            {listDrawerItems()}
        </Drawer>
    )
}
