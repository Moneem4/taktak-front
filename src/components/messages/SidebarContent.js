import React, {useContext, useEffect} from 'react';
import { UiContext } from "../../context/UiContext";
import MessagesLeftSideBar from "./MessagesLeftSideBar";
import SideBar from "../layout/SideBar";

function SidebarContent(props) {
    const { sidebar, setSidebar} = useContext(UiContext);

    useEffect(() => {   
        const getUrlFromPath = () => {
          const paths = window.location.href.split("/");
          
          let url = paths[3];
          
          return url;
        };
    
        if (getUrlFromPath() === "messagerie") {
          setSidebar("messagerie");
        } else {
          setSidebar("");
        }
    },[]);

    return (
        <div>
            <div style={{ display: sidebar === "messagerie" ? "block" : "none" }}>
              <MessagesLeftSideBar />
            </div>
            <div style={{ display: sidebar === "" ? "block" : "none" }}>
              <SideBar />
            </div>
        </div>
    )
}

SidebarContent.propTypes = { }

export default SidebarContent