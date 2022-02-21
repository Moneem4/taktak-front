import React from "react";
import ListMenu from "./ListMenu";
import MenuSideBar from "../MenuSideBar";

function ConsulterMenu() {
  return (
    <div>
      <div className="proposer-moi-page">
        <div className="proposer-moi-page-content container">
          <div className="proposer-moi-page-content-feed">
            <div className="feed-main">
              <ListMenu />
            </div>
            <MenuSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsulterMenu;
