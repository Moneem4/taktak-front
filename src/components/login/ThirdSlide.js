import React, { useContext, useState, useEffect } from "react";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { POST_SIGNUP } from "../../graphql/auth/mutations";
import PropTypes from "prop-types";
import { UiContext } from "../../context/UiContext";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    border: 0,
    width: "100%",
    height: "100%",
    borderRadius: " 5px",
    background: "#fff",
    boxShadow: "2rem 2rem 50px rgba(0, 0, 0, 0.16)",
    position: "absolute",
    top: " 0 !important",
    transition: "0.3s",
    display: "flex",
    borderRadius: 4,
    position: "relative",
    // backgroundColor: "#ffffff",
    // border: 'none',
    // fontSize: 16,
    // padding: 'auto',
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#ffffff",
      boxShadow: '0 0 0 0 "#ffffff',
      margin: "auto",
    },
  },
}))(InputBase);

function ThirdSlide(props) {
  const { signUpPageNumber, setSignUpPageNumber } = useContext(UiContext);
  const { signUpForm, setSignUpForm, errors, setErrors } = useContext(
    UserContext
  );
  const [country, setCountry] = useState("Tunisia");
  const [countryCode, setCountryCode] = useState("+216");
  const handleChangeCountry = (event) => {
    setCountry(event.target.value.split(" ")[0]);
    setCountryCode(event.target.value.split(" ")[1]);
  };
  function goNext() {
    setSignUpPageNumber(4);
  }
  function handleChange(e) {
    setSignUpForm((prev) => ({
      ...prev,
      countryCode: countryCode,
      [e.target.name]: e.target.value,
    }));
    console.log(signUpForm);
  }
  /// create Account
  const [createAccount] = useMutation(POST_SIGNUP, {
    onCompleted: async (data) => {
      console.log(data);
      if (data) {
        goNext();
        //validate phone number send SMS
      }
    },
    onError: (err) => {
      console.log(err);
      setErrors({ signUpError: err.message });
    },
  });

  const Submit = async (e) => {
    e.preventDefault();
    setErrors((prevState) => {
      return {
        ...prevState,
        signUpError: null,
      };
    });

    const data = {
      email: signUpForm.email,
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      password: signUpForm.password,
      phoneNumber: signUpForm.countryCode.concat(signUpForm.phone),
      // birthDate: 'String',
      // location: 'String',
      // city: 'String',
      // description: 'String',
    };
    console.log(data);
    await createAccount({
      variables: {
        input: data,
      },
    });
  };

  return (
    <ul className="orbit-container">
      {/* Slide  */}
      <li className="orbit-slide">
        <span className="helper">
          Veuillez introduire votre numéro mobile pour continuer.
        </span>
        <div className="country-dropdown-wrapper">
          <div className="options"></div>

          <div className="dropdown-filter" id="country-dropdown">
            <FormControl
              style={{
                padding: "0 4rem",
                height: "10rem",
                border: 0,
                borderRadius: " 5px",
                background: "#fff",
                boxShadow: "none",
                fontSize: "3rem",
                marginBottom: "2rem",
                width: "100%",
              }}
            >
              <Select
                className="countries"
                value={country.name}
                onChange={handleChangeCountry}
                // input={<BootstrapInput />}
                defaultValue={"Tunisia +216"}
              >
                <MenuItem value={"Tunisia +216"}>
                  <div className="chosen-country">
                    <img src="assets/img/svg/tunisia-flag.svg" />
                    <span>Tunisie (+216)</span>
                  </div>
                </MenuItem>
                <MenuItem value={"Algeria +111"}>
                  <div className="chosen-country">
                    <img src="assets/img/svg/tunisia-flag.svg" />
                    <span>Algeria (+111)</span>
                  </div>
                </MenuItem>
                <MenuItem value={"Maroc +333"}>
                  <div className="chosen-country">
                    <img src="assets/img/svg/tunisia-flag.svg" />
                    <span>Maroc (+333)</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="input-item country-code-wrapper">
            {!errors.signUpError ? (
              <>
                <span className="country-code">{countryCode}</span>
                <input
                  type="number"
                  placeholder="numéro tel"
                  name="phone"
                  value={signUpForm.phone}
                  onChange={handleChange}
                />
              </>
            ) : (
              <input
                style={{ color: "red" }}
                type="text"
                value={errors.signUpError}
                name="error"
                readonly
              />
            )}
          </div>
        </div>

        <div className="buttons-container phone-number">
          <button className="signup-button button-download">
            <div className="phone-switch">
              <i className="icon-phone" />
              <span className="download">Télécharger</span>
              <span className="app">Application Mobile</span>
            </div>
            <div className="android">
              <i className="icon-android" />
              <span>Android</span>
            </div>
            <div className="ios">
              <i className="fab fa-apple" />
              <span>ios</span>
            </div>
          </button>
          <button
            className="signup-button button-next normal-p"
            onClick={Submit}
          >
            Vérifiez mon numéro
          </button>
        </div>
      </li>

      {/* End Slide  */}
    </ul>
  );
}

ThirdSlide.propTypes = {};

export default ThirdSlide;
