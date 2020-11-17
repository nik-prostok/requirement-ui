import * as React from 'react';

import clsx from 'clsx';
import {
    AppBar,
    createStyles,
    IconButton,
    Theme,
    Typography,
    Toolbar,
    Drawer,
    List,
    ListItem, ListItemIcon, ListItemText, Divider, useTheme, CssBaseline
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {useState} from "react";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(12, 2, 2, 12),
        },
    }),
);

export interface HeaderProps {
};

export const Header: React.FunctionComponent<HeaderProps> = ({children}) => {
    const classes = useStyles();
    const theme = useTheme();

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
        setIsOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setIsOpenDrawer(false);
    };

    const renderAppBar = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: isOpenDrawer,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: isOpenDrawer,
                    })}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    Система управления требованиями
                </Typography>
            </Toolbar>
        </AppBar>
    )

    const listDrawerItems = () => (
        <>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Объекты'}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Добавить ТЗ'}/>
                </ListItem>
            </List>
            <Divider/>
        </>
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            {renderAppBar()}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpenDrawer,
                    [classes.drawerClose]: !isOpenDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isOpenDrawer,
                        [classes.drawerClose]: !isOpenDrawer,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                {listDrawerItems()}
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
}

