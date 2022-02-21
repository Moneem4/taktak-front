import React from 'react';
import PropTypes from 'prop-types';
import WithStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReservationEncours from './ReservationEncours';
import SuiviCommande from '../commande/SuiviCommande';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    appBar: {
        background: 'transparent',
        color: "#ff6900",
    }
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
 
function BookingPageProcess(props) {
    const { classes } = props
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                >
                    <LinkTab label="Réservations" href="/drafts" {...a11yProps(0)} style={{fontSize: "x-large" }}/>
                    <LinkTab label="Commandes" href="/trash" {...a11yProps(1)} style={{fontSize: "x-large" }}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ReservationEncours />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SuiviCommande />
            </TabPanel>
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
}
  
function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
}

export default WithStyles(styles)(BookingPageProcess)