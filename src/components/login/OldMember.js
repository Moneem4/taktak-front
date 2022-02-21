import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { UiContext } from "../../context/UiContext";
import client from "../../apollo/client";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { UserContext } from "../../context/UserContext";

import {
  POST_SIGNIN,
  LOAD_ME,
  FORGOT_PASSWORD,
} from "../../graphql/auth/mutations";
import { locatedError } from "graphql";
import { CircularProgress } from "@material-ui/core";
import { GET_USER_Following } from "../../graphql/user/user";

function OldMember(props) {
  const [loader, setLoader] = useState({ forgetPasswordLoader: false });

  const {
    getFollowers,
    getFollowing,
    getUserRestaurantFollowed,
    loginForm,
    setLoginForm,
    toggleAuthentication,
    setIsAuthenticated,
    isAuthenticated,
    activeUser,
    setActiveUser,
    getRestaurantByUserId,
    followers,
    follwing,
    setFollowing,
  } = useContext(UserContext);

  function handleChange(e) {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(loginForm);
  }

  const handleCheck = (event) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  async function login(formData) {
    const data = {
      email: loginForm.email,
      password: loginForm.password,
    };

    await client
      .mutate({
        mutation: POST_SIGNIN,
        variables: {
          input: data,
        },
        // refetchQueries: [{ query: LOAD_ME }],
      })
      .then(async (res) => {
       await localStorage.setItem("accessToken", res.data.login.accessToken);
      await  localStorage.setItem("refreshToken", res.data.login.refreshToken);

        await client
          .query({
            query: LOAD_ME,
          })
          .then(async (data) => {
            await toggleAuthentication();
            console.log(isAuthenticated);
            setActiveUser((user) => {
              return {
                ...user,
                userId: data.data.me._id,
                local: data.data.me.local,
                firstName: data.data.me.firstName,
                lastName: data.data.me.lastName,
                gender: data.data.me.gender,
                tags: data.data.me.tags,
                uFollowersCount: data.data.me.uFollowersCount,
                rFollowersCount: data.data.me.rFollowersCount,
                uFollowsCount: data.data.me.uFollowsCount,
                description: data.data.me.description,
                birthDate: data.data.me.birthDate,
                birthDateDisplay: data.data.me.birthDateDisplay,
                phoneNumber: data.data.me.phoneNumber,
                city: data.data.me.city,
                languages: data.data.me.languages,
                avatar: data.data.me.avatar,
                tags: data.data.me.tags,
                photos: data.data.me.photos,
                stories: data.data.me.stories,
                followers: data.data.me.followers,
                following: data.data.me.following,
                // resetPasswordToken: String
                // resetPasswordExpires: Float
                fullName: data.data.me.fullName,
                // isVerified: Boolean!
                // isOnline: Boolean!
                // isLocked: Boolean!
                // reason: String!
                // isActive: Boolean!
                // stripeId: String
                // type: UserType!
                // ccLast4: String
                // createdAt: String
                // updatedAt: String
                // deletedAt: String
              };
            });

            //  getRestaurantFollowed(data.data.me._id);
            //  getFollowers(data.data.me._id)
            getFollowing(data.data.me._id);
            let id = data.data.me._id;
            return id;
          })
          .then(async (id) => {
            getFollowers(id);
            return id;
          })
          .then(async (id) => {
            getUserRestaurantFollowed(id);
            return id;
          })
          .then(async (id) => {
            return id;
          });
      })
      .catch((error) => {
        console.log(error);
        // setAuthenticationError(error.graphQLErrors[0].message)
        alert(error);
      });
  }

  async function forgotPassword(email) {
    setLoader((prev) => ({
      ...prev,
      forgotPasswordLoader: true,
    }));
    await client
      .mutate({
        mutation: FORGOT_PASSWORD,
        variables: {
          input: email,
        },
      })
      .then(async (res) => {
        if (res.data.forgotPassword) {
          goToResetPassword();
          setLoader((prev) => ({
            ...prev,
            forgotPasswordLoader: false,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        // setAuthenticationError(error.graphQLErrors[0].message)
        alert(error);
        setLoader((prev) => ({
          ...prev,
          forgotPasswordLoader: false,
        }));
      });
  }
  let history = useHistory();
  function goToResetPassword(e) {
    history.push("/resetPassworld");
  }
  const submit = async (e) => {
    e.preventDefault();
    // setAuthentificationError(null)
    await login(loginForm);
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 45,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(18px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: theme.palette.common.white,
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#ff6900",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
      "&$checked": {
        color: theme.palette.common.white,
      },
      color: "#ff6900",
    },
    track: {
      borderRadius: 26 / 2,
      border: theme.palette.common.white,
      backgroundColor: theme.palette.common.white,
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <div className="tabs-panel is-active" id="login">
      <div className="form-inputs">
        <div className="input-item">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-item">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
          />
          {!loader.forgotPasswordLoader ? (
            <span
              onClick={() => forgotPassword(loginForm.email)}
              className="forgot-password"
            >
              Mot de passe oublié?
            </span>
          ) : (
            <span className="forgot-password">
              <CircularProgress color="#ff6900" />
            </span>
          )}
        </div>
      </div>
      <div className="switchs">
        <div className=" remembe-me">
          <input
            className="switch-input"
            id="remember-me-radio"
            type="checkbox"
            name="remember-me-radio"
          />

          <FormControlLabel
            control={
              <IOSSwitch
                checked={loginForm.rememberMe}
                onChange={handleCheck}
                name="rememberMe"
              />
            }
          />
          <span>Se rappeler de moi</span>
        </div>
        <div className="remembe-me">
          {/* <input className="switch-input" id="remember-me-radio-2" type="checkbox" name="remember-me-radio-2" />
                  <label className="switch-paddle" for="remember-me-radio-2">
                    <span className="show-for-sr"></span>
                  </label> */}
          <FormControlLabel
            control={
              <IOSSwitch
                checked={loginForm.keepMe}
                onChange={handleCheck}
                name="keepMe"
              />
            }
          />
          <span>Maintenir la session active</span>
        </div>
      </div>
      <button className="login-submit" onClick={submit}>
        Connexion
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
    </div>
  );
}

OldMember.propTypes = {};

export default OldMember;
