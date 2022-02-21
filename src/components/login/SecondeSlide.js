import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";

function SecondeSlide(props) {
  const { signUpPageNumber, setSignUpPageNumber } = useContext(UiContext);
  const { signUpForm, setSignUpForm, errors, setErrors } = useContext(
    UserContext
  );

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function validatePassword(password) {
    if (password.length > 7) {
      return true;
    } else {
      return false;
    }
  }

  function validateConfirmedPassword(password, confirmPassword) {
    if (password == confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  function goNext() {
    console.log(errors);
    if (
      validateEmail(signUpForm.email) &&
      validatePassword(signUpForm.password) &&
      validateConfirmedPassword(
        signUpForm.password,
        signUpForm.verifiedPassword
      )
    ) {
      setSignUpPageNumber(3);
    } else if (!validateEmail(signUpForm.email)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          emailError: "email incorrect",
        };
      });
      setSignUpForm((prevState) => {
        return {
          ...prevState,
          email: "",
        };
      });
    } else if (!validatePassword(signUpForm.password)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          passwordError: "le mot de passe doit contenir au moins 8 caractères",
        };
      });
      setSignUpForm((prevState) => {
        return {
          ...prevState,
          password: "",
          verifiedPassword: "",
        };
      });
    } else if (
      !validateConfirmedPassword(
        signUpForm.password,
        signUpForm.verifiedPassword
      )
    ) {
      setErrors((prevState) => {
        return {
          ...prevState,
          verfiedPasswordError: "mot de passe incorrect",
        };
      });
      setSignUpForm((prevState) => {
        return {
          ...prevState,
          verifiedPassword: "",
        };
      });
    }
  }
  return (
    <ul className="orbit-container">
      <li className="orbit-slide one is-active ">
        <div className="input-item">
          {!errors.emailError ? (
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={signUpForm.email}
              onChange={props.handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder={errors.emailError}
              name="email"
              value={signUpForm.email}
              onChange={props.handleChange}
            />
          )}
        </div>
        <div className="input-item">
          {!errors.passwordError ? (
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={signUpForm.password}
              onChange={props.handleChange}
            />
          ) : (
            <input
              type="password"
              placeholder={errors.passwordError}
              name="password"
              value={signUpForm.password}
              onChange={props.handleChange}
            />
          )}
        </div>
        <div className="input-item">
          {!errors.verfiedPasswordError ? (
            <input
              type="password"
              placeholder="Vérifier mot de passe"
              name="verifiedPassword"
              value={signUpForm.verifiedPassword}
              onChange={props.handleChange}
            />
          ) : (
            <input
              type="password"
              placeholder={errors.verfiedPasswordError}
              name="verifiedPassword"
              value={signUpForm.verifiedPassword}
              onChange={props.handleChange}
            />
          )}
        </div>

        <div className="buttons-container2">
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
            onClick={goNext}
            className="signup-button button-next go-next"
          >
            Suivant
          </button>
        </div>
      </li>
    </ul>
  );
}

SecondeSlide.propTypes = {};

export default SecondeSlide;
