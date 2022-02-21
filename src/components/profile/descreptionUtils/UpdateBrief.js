import React, { useState, useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import client from "../../../apollo/client";
import { UPDATE_USER } from "../../../graphql/auth/mutations";
import { UiContext } from "../../../context/UiContext";
import { UserContext } from "../../../context/UserContext";

const styles = (theme) => ({
  container: {
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    height: 300,
    width: 500,
    padding: 20,
  },
  inputBase: {
    color: theme.palette.common.black,
    width: "100%",
    fontSize: 14,
  },
  appBar: {
    borderBottom: "0.1px groove white",
  },
});

function UpdateBrief(props) {
  const { classes, user, setUser, activeUser } = props;
  const { setActiveUser } = useContext(UserContext);
  const [description, setDescription] = useState(activeUser.description);

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  async function submitChange() {
    const data = {
      description: description,
    };

    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id: activeUser.userId,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
        setActiveUser((user) => {
          return {
            ...user,
            description: description,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    handleClose();
  }

  return (
    <div className={classes.container}>
      <Grid container direction="row">
        <Grid item xs={11} style={{ marginTop: 10 }}>
          <Typography
            variant="h4"
            style={{ marginBottom: 10, color: "#175db3" }}
          >
            Brief
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Close" arrow>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
      <InputBase
        multiline
        rows={9}
        placeholder="Brief"
        className={classes.inputBase}
        value={description}
        onChange={handleChange}
      />
      <Divider />
      <Grid container direction="row" xs={12} style={{ marginTop: 20 }}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={submitChange}
          >
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(UpdateBrief);
