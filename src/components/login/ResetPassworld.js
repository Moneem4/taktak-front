import React, { useState, useContext } from "react";
import client from "../../apollo/client";
import {
  RESET_PASSWORD,
  POST_SIGNIN,
  LOAD_ME,
} from "../../graphql/auth/mutations";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";
function ResetPassword(props) {
  const [newPasswordForm, setNewPasswordForm] = useState({
    password: "",
    verifiedPassword: "",
    token: "",
  });
  const [errors, setErrors] = useState({
    verfiedPasswordError: null,
    passwordError: null,
    tokenError: null,
  });
  //login
  async function login(formData) {
    await client
      .mutate({
        mutation: POST_SIGNIN,
        variables: {
          input: formData,
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
  ///ResetPassword
  async function resetPassword(resetPasswordToken, password) {
    await client
      .mutate({
        mutation: RESET_PASSWORD,
        variables: {
          resetPasswordToken,
          password,
        },
      })
      .then((res) => {
        console.log("resultat  ", res);
        // if(res.data.verifyEmail){
        //    setA(true)
        //    const data = {
        //      email: loginForm.email,
        //      password: newPasswordForm.password,
        //    };
        //  login(data)
        //   setTimeout(() => {
        //    history.push('/')
        //  }, 2500)

        // }
      })
      .catch((error) => {
        // setAuthentificationError(error.graphQLErrors[0].message)
      });
  }
  const { loginForm, setIsAuthenticated } = useContext(UserContext);
  const submit = async (e) => {
    e.preventDefault();

    const resetPasswordToken = loginForm.email;
    const password = newPasswordForm.token;

    await resetPassword(resetPasswordToken, password);
  };
  function handleChange(e) {
    setNewPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(newPasswordForm);
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

  function trySubmit() {
    console.log(errors);
    if (
      validatePassword(newPasswordForm.password) &&
      validateConfirmedPassword(
        newPasswordForm.password,
        newPasswordForm.verifiedPassword
      ) &&
      newPasswordForm.token.length == 4
    ) {
      submit();
    } else if (!validatePassword(newPasswordForm.password)) {
      setErrors((prevState) => {
        return {
          ...prevState,
          passwordError: "le mot de passe doit contenir au moins 8 caractères",
        };
      });
      setNewPasswordForm((prevState) => {
        return {
          ...prevState,
          password: "",
          verifiedPassword: "",
        };
      });
    } else if (
      !validateConfirmedPassword(
        newPasswordForm.password,
        newPasswordForm.verifiedPassword
      )
    ) {
      setErrors((prevState) => {
        return {
          ...prevState,
          verfiedPasswordError: "mot de passe incorrect",
        };
      });
      setNewPasswordForm((prevState) => {
        return {
          ...prevState,
          verifiedPassword: "",
        };
      });
    } else if (newPasswordForm.token.length != 4) {
      setErrors((prevState) => {
        return {
          ...prevState,
          tokenError: "code incorrect",
        };
      });
      alert("code incorrect");
    }
  }
  return (
    <div className="login-page">
      <div className="auth-brand" id="auth-brand">
        <img className="auth-bg" src="assets/img/auth-bg.png" />
        <i className="icon-logo logo" />
        <span>3ala kif kifek</span>
        <p>All right reserved 2020 . TAKTAK</p>
      </div>
      <div className="login-page-form auth-form">
        <div className="auth-form-inner">
          <div className="auth-form-header">
            <div className="who-you-are">Propriétaire de Resto ?</div>
            <div className="lang">
              Français <i className="icon-world" />
            </div>
          </div>
          <div className="auth-form-body">
            <ul className="tabs" data-tabs id="login-tabs">
              <li className="tabs-title is-active">
                <a aria-selected="true">Mot de passe oublié</a>
              </li>
            </ul>
            <div className="tabs-content" data-tabs-content="login-tabs">
              <ul className="orbit-container">
                {/* Slide  */}

                <li className="orbit-slide one is-active ">
                  <div className="input-item">
                    {!errors.passwordError ? (
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        value={newPasswordForm.password}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="password"
                        placeholder={errors.passwordError}
                        name="password"
                        value={newPasswordForm.password}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                  <div className="input-item">
                    {!errors.verfiedPasswordError ? (
                      <input
                        type="password"
                        placeholder="Vérifier mot de passe"
                        name="verifiedPassword"
                        value={newPasswordForm.verifiedPassword}
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="password"
                        placeholder={errors.verfiedPasswordError}
                        name="verifiedPassword"
                        value={newPasswordForm.verifiedPassword}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                  <span className="helper">
                    Merci de saisir le code envoyé par SMS à votre mobile
                  </span>
                  <div className="input-item code-verif">
                    <input
                      maxlength="4"
                      type="text"
                      placeholder="----"
                      onChange={handleChange}
                      name="token"
                      value={newPasswordForm.token}
                    />
                    )
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
                      onClick={trySubmit}
                      className="signup-button button-next normal-p"
                    >
                      Submit
                    </button>
                  </div>
                </li>
                {/* End Slide  */}
              </ul>
            </div>
          </div>

          <div className="auth-form-footer" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
