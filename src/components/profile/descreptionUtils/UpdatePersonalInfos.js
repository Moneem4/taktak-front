import React, { useState, useContext } from "react";
import { UiContext } from "../../../context/UiContext";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import client from "../../../apollo/client";
import { UPDATE_USER } from "../../../graphql/auth/mutations";
import { UserContext } from "../../../context/UserContext";

const styles = (theme) => ({
  container: {
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    height: 455,
    width: 500,
    padding: 20,
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
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  selectCountry: {
    width: "100%",
    height: "5ch",
    backgroundColor: "white",
    color: "black",
    fontSize: 13,
    textAlign: "start",
    border: "0.1px groove darkgrey",
    borderRadius: "3px",
    paddingLeft: 12,
  },
});

const languagesList = [
  { language: "Ar" },
  { language: "Fr" },
  { language: "En" },
];

function UpdatePersonalInfos(props) {
  const { classes, user, setUser } = props;
  const { setActiveUser } = useContext(UserContext);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [stateUserData, setStateUserData] = useState({
    birthDate: user.birthDate,
    country: user.location,
    city: user.city,
    languages: [],
    email: user.email,
    phoneNumber: user.phoneNumber,
  });

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  const handleDateChange = (date) => {
    const dateBirth =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    console.log("date:", dateBirth);
    setStateUserData({
      ...stateUserData,
      birthDate: dateBirth,
    });
  };

  const selectLangues = (event, val) => {
    setStateUserData({ ...stateUserData, languages: val });
  };

  const handleChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    const value = e.target.value;

    if (e.target.value === "" || re.test(e.target.value)) {
      setStateUserData({ ...stateUserData, phoneNumber: value });
    }
  };

  async function submitChange() {
    var languageList = stateUserData.languages.map((e) => e.language);

    const data = {
      birthDate: stateUserData.birthDate,
      location: stateUserData.country,
      city: stateUserData.city,
      languages: languageList,
      phoneNumber: stateUserData.phoneNumber,
    };

    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id: user.userId,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
        setActiveUser((user) => {
          return {
            ...user,
            birthDate: stateUserData.birthDate,
            location: stateUserData.country,
            city: stateUserData.city,
            languages: languageList,
            phoneNumber: stateUserData.phoneNumber,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    handleClose();
  }

  const selectCountry = (val) => {
    setStateUserData({ ...stateUserData, country: val });
  };

  const selectCity = (val) => {
    setStateUserData({ ...stateUserData, city: val });
  };

  return (
    <div className={classes.container}>
      <Grid container direction="row">
        <Grid item xs={11}>
          <Typography
            variant="h4"
            style={{ marginBottom: 10, color: "#175db3" }}
          >
            Informations personnelles
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
      <Divider style={{ marginBottom: 20 }} />
      <Grid container direction="row" style={{ marginBottom: 10 }}>
        <Grid item xs={5}>
          <Typography className={classes.labelTitle}>
            Date de naissance
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              value={stateUserData.birthDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              InputProps={{
                className: classes.textField,
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
      >
        <Grid item xs={4} className={classes.labelTitle}>
          Pays
        </Grid>
        <Grid item xs={7}>
          <CountryDropdown
            defaultOptionLabel="Choisir pays..."
            value={stateUserData.country}
            name={"country"}
            onChange={selectCountry}
            className={classes.selectCountry}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
      >
        <Grid item xs={4} className={classes.labelTitle}>
          Region
        </Grid>
        <Grid item xs={7}>
          <RegionDropdown
            blankOptionLabel="No country selected..."
            defaultOptionLabel="Now select a region..."
            country={stateUserData.country}
            value={stateUserData.city}
            name={"city"}
            onChange={selectCity}
            className={classes.selectCountry}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
        style={{ marginBottom: 10 }}
      >
        <Grid item xs={4}>
          <Typography className={classes.labelTitle}>Langues</Typography>
        </Grid>
        <Grid item xs={7} style={{ height: 70, overflow: "scroll" }}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={languagesList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.language}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.language}
              </React.Fragment>
            )}
            style={{ width: "100%" }}
            onChange={selectLangues}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder="Langues" />
            )}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
        style={{ marginBottom: 10 }}
      >
        <Grid item xs={4} className={classes.labelTitle}>
          E-mail
        </Grid>
        <Grid item xs={7}>
          <InputBase
            className={classes.textField}
            //onChange={handleChange}
            value={user.local.email}
            name={"email"}
            disabled
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="baseline"
        style={{ marginBottom: 10 }}
      >
        <Grid item xs={4} className={classes.labelTitle}>
          Phone
        </Grid>
        <Grid item xs={7}>
          <InputBase
            className={classes.textField}
            onChange={handleChangePhone}
            value={stateUserData.phoneNumber}
            name={"phone"}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container direction="row" style={{ marginTop: 10 }}>
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

export default withStyles(styles)(UpdatePersonalInfos);
