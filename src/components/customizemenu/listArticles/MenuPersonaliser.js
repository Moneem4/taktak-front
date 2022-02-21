import React from "react";
import MenuSideBar from "../MenuSideBar";
import ListCustomizedMenu from "./ListCustomizedMenu";

function MenuPersonaliser() {
  return (
    <div>
      <div className="proposer-moi-page">
        <div className="proposer-moi-page-content container">
          <div className="proposer-moi-page-content-feed">
            <div className="feed-main">
              <ListCustomizedMenu />
            </div>
            <MenuSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuPersonaliser;
