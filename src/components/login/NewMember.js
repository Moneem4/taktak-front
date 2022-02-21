import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import FirstSlide from "./FirstSlide";
import SecondeSlide from "./SecondeSlide";
import ThirdSlide from "./ThirdSlide";
import FourthSlide from "./FourthSlide";
import { UiContext } from "../../context/UiContext";
import { Button } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";

function NewMember(props) {
  const { signUpPageNumber, setSignUpPageNumber } = useContext(UiContext);
  const { signUpForm, setSignUpForm, setErrors } = useContext(UserContext);

  function handleChange(e) {
    setSignUpForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(signUpForm);
  }
  function goBack() {
    setSignUpPageNumber((prev) => prev - 1);
    setErrors((prevState) => {
      return {
        ...prevState,
        signUpError: null,
      };
    });
  }
  console.log(signUpPageNumber);
  let backButton = (
    <Button
      onClick={goBack}
      style={{
        marginRight: "2rem",
        fontWeight: "normal",
        fontSize: "3rem",
        color: "#484848",
        opacity: "0.5",
        outline: "none",
        cursor: "pointer",
        bottom: 10,
        position: "absolute",
      }}
    >
      <i
        className="fal fa-long-arrow-alt-left"
        style={{
          marginRight: "2rem",
          fontWeight: "normal",
          fontSize: "3rem",
          color: "#484848",
          opacity: 0.5,
        }}
      ></i>
      Retour
    </Button>
  );
  let show = <FirstSlide handleChange={handleChange} />;
  if (signUpPageNumber === 2) {
    show = (
      <div>
        <SecondeSlide handleChange={handleChange} /> {backButton}
      </div>
    );
  } else if (signUpPageNumber === 3) {
    show = (
      <div>
        <ThirdSlide handleChange={handleChange} /> {backButton}
      </div>
    );
  } else if (signUpPageNumber === 4) {
    show = (
      <div>
        <FourthSlide handleChange={handleChange} /> {backButton}
      </div>
    );
  }

  return <div>{show}</div>;
}

NewMember.propTypes = {};

export default NewMember;
