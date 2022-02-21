import React, { useContext } from "react";
import { Route, Redirect } from "react-router";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";

export default function AuthRoute({ component: Component, ...rest }) {
  const { activeUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        activeUser.userId ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}
