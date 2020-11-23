import * as React from 'react';
import {NavLink} from "react-router-dom";

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

export const DRAWER_WIDTH = 240;

export interface LeftMenuProps {
    isOpenMenu?: boolean;
    handleMenuClose: () => void;
};

export const LeftMenu = ({isOpenMenu = false, handleMenuClose}: LeftMenuProps) => {

    const classes = useStyles();
    const theme = useTheme();

    const listDrawerItems = () => {
        if (menuItems.length) {
            return (<List>
                {menuItems.map((menuItem, index) => (
                    <NavLink className={classes.routerLink} to={menuItem.path} key={index}>
                        <ListItem button>
                            <ListItemIcon>
                                {React.createElement(menuItem.icon)}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.label}/>
                        </ListItem>
                        <Divider/>
                    </NavLink>
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
