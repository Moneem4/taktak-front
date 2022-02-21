import React, { useEffect ,useState} from "react";
import PropTypes from "prop-types";
import MessagesLeftSideBar from "../messages/MessagesLeftSideBar";
import SideBar from "./SideBar";
import { UiContext } from "../../context/UiContext";

function LeftSideBar(props) {
  const [pathname, setPathname] = useState(window.location.pathname);
useEffect(() => {
    setPathname(props.pathname)
}, [props.pathname])
  return <div>{pathname === "/messagerie" ?  <MessagesLeftSideBar />  : <SideBar />}</div>;
}

LeftSideBar.propTypes = {};

export default LeftSideBar;
