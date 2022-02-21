import React, { useState, useContext } from "react";
import { UiContext } from "../../context/UiContext";
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
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assets/img/svg/taktak_user.svg";
import Badge from "@material-ui/core/Badge";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import client from "../../apollo/client";
import { UPDATE_USER } from "../../graphql/auth/mutations";
import { UserContext } from "../../context/UserContext";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const styles = (theme) => ({
  container: {
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    height: 360,
    width: 550,
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
  labelTitle: {
    fontSize: "1.4rem",
    textAlign: "left",
    marginLeft: "1vw",
    width: "-webkit-fill-available",
    fontWeight: "bold",
    color: "#ff6900",
  },
  textField: {
    color: "#484848",
    height: "5ch",
    backgroundColor: "white",
    width: "100%",
    fontSize: 13,
    textAlign: "start",
    border: "0.1px groove darkgrey",
    borderRadius: "3px",
    paddingLeft: 12,
  },
});

const topTags = [
  { tag: "Food" },
  { tag: "Foodies" },
  { tag: "Foodist" },
  { tag: "Pizza" },
  { tag: "Yummy" },
];

function UpdateProfileHeader(props) {
  const { classes, activeUser } = props;
  const { setActiveUser } = useContext(UserContext);

  const [userState, setUserState] = useState({
    firstName: activeUser.firstName,
    lastName: activeUser.lastName,
    gender: activeUser.gender,
    avatar: activeUser.avatar,
    tags: [],
  });

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setUserState({ ...userState, [field]: value });
  };

  const handleTagsChange = (event, value) => {
    setUserState({ ...userState, tags: value });
  };

  async function submitChange() {
    var tagsList = userState.tags.map((e) => e.tag);

    const data = {
      firstName: userState.firstName,
      lastName: userState.lastName,
      tags: tagsList,
      //gender: userState.gender
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
            firstName: userState.firstName,
            lastName: userState.lastName,
            tags: userState.tags,
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
        <Grid item xs={11}>
          <Typography variant="h4" style={{ color: "#175db3" }}>
            Profile
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
      <Grid container direction="row" style={{ marginTop: 20 }}>
        <Grid item xs={2}>
          {activeUser.avatar ? (
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              style={{ height: 50, width: 50 }}
            >
              <Avatar
                alt="Remy Sharp"
                src={activeUser.avatar}
                style={{ height: "100%", width: "100%" }}
              />
            </StyledBadge>
          ) : (
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              style={{ height: 50, width: 50 }}
            >
              <Avatar
                alt="Remy Sharp"
                src={avatar}
                style={{ height: "100%", width: "100%" }}
              />
            </StyledBadge>
          )}
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            xs={12}
            style={{ marginBottom: 10 }}
          >
            <Grid item xs={3} className={classes.labelTitle}>
              Nom
            </Grid>
            <Grid item xs={8}>
              <InputBase
                className={classes.textField}
                onChange={handleChange}
                value={userState.lastName}
                name={"lastName"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            xs={12}
            style={{ marginBottom: 10 }}
          >
            <Grid item xs={3} className={classes.labelTitle}>
              Prénom
            </Grid>
            <Grid item xs={8}>
              <InputBase
                className={classes.textField}
                onChange={handleChange}
                value={userState.firstName}
                name={"firstName"}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            xs={12}
            style={{ marginBottom: 10 }}
          >
            <Grid item xs={3} className={classes.labelTitle}>
              Gender
            </Grid>
            <Grid item xs={8}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={userState.gender}
                onChange={handleChange}
              >
                <Grid container xs={12}>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            xs={12}
            style={{ marginBottom: 10 }}
          >
            <Grid item xs={3} className={classes.labelTitle}>
              Tags
            </Grid>
            <Grid item xs={8} style={{ height: 70, overflow: "scroll" }}>
              <Autocomplete
                multiple
                limitTags={1}
                id="multiple-limit-tags"
                options={topTags}
                getOptionLabel={(option) => option.tag}
                onChange={(event, value) => handleTagsChange(event, value)}
                name={"tags"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Tags"
                    Style={{ fontSize: 14 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row" xs={12} style={{ marginTop: 10 }}>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
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

export default withStyles(styles)(UpdateProfileHeader);
