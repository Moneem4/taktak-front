import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const styles = (theme) => ({
  modal: {
    padding: "2rem",
    backgroundColor: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: "5px",
    marginBottom: "5rem",
    height: "185px",
    width: "350px"
  },
  title: {
    fontWeight: "bold",
    fontSize: "2.5rem",
    textAlign: "left",
    color: "#175db3",
    marginBottom: "1rem",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: "2rem",
    textAlign: "left",
    color: "#000000",
    marginTop: "2rem",
    marginBottom: "4rem",
    marginLeft: "2rem"
  },
  button: {
    borderRadius: "25%",
    backgroundColor: "#15A51C",
    color: "#fff",
    fontSize: 12,
    marginLeft: "70%",
    fontWeight: "bold",
    width: 100
  }
});

function ConfirmationModal(props) {
  const { classes, userId } = props;;

  return (
    <div className={classes.modal}>
        <Typography className={classes.title}>Modifier Profile</Typography>
        <hr />
        <Grid container direction="row">
            <Grid item xs={1}>
                <IconButton edge="end" color="inherit" aria-label="menu" >
                    <CheckCircleIcon style={{color: "#15A51C", fontSize: 20}} />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Typography className={classes.subTitle}>Profil modifié avec succès</Typography>
            </Grid>
        </Grid>
        <hr />
        <NavLink exact to={`/profile/${userId}`} >
            <Button variant="contained" className={classes.button} >OK</Button>
        </NavLink>
    </div>
 );
}

export default withStyles(styles)(ConfirmationModal);
