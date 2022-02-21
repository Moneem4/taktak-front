import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { UiContext } from "../../context/UiContext";
import { getNodeText } from "@testing-library/react";
import { ErrorSharp } from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";

function FirstSlide(props) {
  const { signUpPageNumber, setSignUpPageNumber } = useContext(UiContext);
  const { signUpForm, setSignUpForm, setErrors, errors } = useContext(
    UserContext
  );

  function goNext() {
    if (signUpForm.firstName != "" && signUpForm.lastName != "") {
      setSignUpPageNumber(2);
    } else if (signUpForm.firstName === "") {
      setErrors((prevState) => {
        return {
          ...prevState,
          firstNameError: "First Name Required",
        };
      });
    } else if (signUpForm.lastName === "") {
      setErrors((prevState) => {
        return {
          ...prevState,
          lastNameError: "Last Name Required",
        };
      });
    }
  }

  return (
    <ul className="orbit-container">
      <li className="orbit-slide one is-active">
        <div className="input-item">
          {!errors.firstNameError ? (
            <input
              type="text"
              placeholder="Nom"
              name="firstName"
              value={signUpForm.firstName}
              onChange={props.handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder={errors.firstNameError}
              name="firstName"
              value={signUpForm.firstName}
              onChange={props.handleChange}
            />
          )}
        </div>
        <div className="input-item">
          {!errors.lastNameError ? (
            <input
              type="text"
              placeholder="Prenom"
              name="lastName"
              value={signUpForm.lastName}
              onChange={props.handleChange}
            />
          ) : (
            <input
              type="text"
              placeholder={errors.lastNameError}
              name="lastName"
              value={signUpForm.lastName}
              onChange={props.handleChange}
            />
          )}
        </div>
        {/* <div className="buttons-container">
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
        
            <button onClick={goNext}  className="signup-button button-next go-next">
              Suivant
            </button>
         
        </div>
      */}
        <button className="login-submit" onClick={goNext}>
          Suivant
        </button>
        <div className="socials">
          <button className="phone">
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
          <button className="google">
            <i className="icon-google" />
            Google
          </button>
          <button className="facebook">
            <i className="icon-facebook" />
            Facebook
          </button>
        </div>
      </li>
    </ul>
  );
}

FirstSlide.propTypes = {};

export default FirstSlide;
