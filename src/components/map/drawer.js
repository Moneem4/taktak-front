import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Collapse from './collapse';
import { camelCase } from 'lodash';

export default function PersistentDrawerLeft(props) {
  const { data, openDrawer, onDrawerClose } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    if (data && data.length && data[0].distance) {
      let sorter = [];
      sorter = data.sort((a, b) =>
        a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
      );
      setItems(sorter);
    }
  }, [data]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'inline-block',
      position: 'absolute',
      bottom: '-60px',
      right: '20px',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      background: '#fff',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.9)',
      },
    },
    drawer: {
      flexShrink: 0,
      display: open ? 'block' : 'none',
    },
    drawerPaper: {
      [theme.breakpoints.down('xs')]: {
        top: 244,
      },
      width: '647px',
      height: '500px',
      right: '23px',
      position: 'absolute',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    collapse: {
      padding: 10,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (openDrawer) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openDrawer]);

  const handleDrawerOpen = () => {
    setOpen(!open);
    if (!open) {
    } else {
    }
  };

  const handleDrawerClose = () => {
    onDrawerClose();
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <Toolbar>
          <IconButton
            background='white'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </div>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ArrowForwardIcon fontSize='large' />
            ) : (
              <ArrowForwardIcon fontSize='large' />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.collapse}>
          <Collapse data={items} />
        </div>
      </Drawer>
    </div>
  );
}
