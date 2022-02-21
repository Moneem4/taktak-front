import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UiContext } from "../../context/UiContext";
import client from "../../apollo/client";
import { useMutation } from "@apollo/client";
import {
  VERIFY_EMAIL,
  POST_SIGNIN,
  LOAD_ME,
} from "../../graphql/auth/mutations";

import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function FourthSlide(props) {
  const history = useHistory();
  const { signUpForm, setIsAuthenticated, isAuthenticated } = useContext(
    UserContext
  );
  const [a, setA] = useState(null);
  useEffect(() => {
    setIsAuthenticated(a);
  }, [a]);

  async function login(formData) {
    const data = {
      email: signUpForm.email,
      password: signUpForm.password,
    };
    console.log(data);
    await client
      .mutate({
        mutation: POST_SIGNIN,
        variables: {
          input: data,
        },
        // refetchQueries: [{ query: LOAD_ME }],
      })
      .then(async (res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.login.accessToken);
        localStorage.setItem("refreshToken", res.data.login.refreshToken);

        await client
          .query({
            query: LOAD_ME,
            context: {
              headers: {
                "access-token": res.data.login.accessToken,
              },
            },
          })
          .then(() => {
            setIsAuthenticated(true);
          });
      })
      .catch((error) => {
        console.log(error);
        // setAuthenticationError(error.graphQLErrors[0].message)
        alert(error);
      });
  }

  async function verifyEmail(email, emailToken) {
    await client
      .mutate({
        mutation: VERIFY_EMAIL,
        variables: {
          email,
          emailToken,
        },
      })
      .then((res) => {
        console.log("resultat  ", res);
        if (res.data.verifyEmail) {
          setA(true);
          const data = {
            email: signUpForm.email,
            password: signUpForm.password,
          };
          login(data);
          setTimeout(() => {
            history.push("/");
          }, 2500);
        }
      })
      .catch((errors) => {
        console.log("errors  ", errors);
        alert(errors);
      });
  }

  const Submit = async (e) => {
    e.preventDefault();
    const data = {
      email: signUpForm.email,
      emailToken: signUpForm.token,
    };
    const email = signUpForm.email;
    const emailToken = signUpForm.token;

    await verifyEmail(email, emailToken);
  };

  return (
    <ul className="orbit-container">
      {/* Slide  */}
      <li className="orbit-slide">
        <span className="helper">
          Merci de saisir le code envoyé par SMS à votre mobile
        </span>
        <div className="input-item country-code-wrapper final-orbit">
          <img className="flag" src="assets/img/svg/tunisia-flag.svg" />
          <input
            className="input-number"
            type="text"
            placeholder={`(${signUpForm.countryCode}) ${signUpForm.phone}`}
          />
          {/* <i className="fal fa-pen" /> */}
        </div>
        <div className="input-item code-verif">
          <input
            type="text"
            placeholder="----"
            onChange={props.handleChange}
            name="token"
            value={signUpForm.token}
          />
          <span className="loading-line-placeholder" />
          <span className="loading-line" />
        </div>
        <div className="resend-code">
          <span>
            Rien reçu? <button>Renvoyez SMS</button>
          </span>
        </div>
        <div>
          <button
            onClick={Submit}
            className="signup-button button-next normal-p"
          >
            Submit
          </button>
        </div>
      </li>
      {/* End Slide  */}
    </ul>
  );
}

FourthSlide.propTypes = {};

export default FourthSlide;
