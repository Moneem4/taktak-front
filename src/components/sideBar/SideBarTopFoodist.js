import React, {useState} from "react";

function SideBarTopFoodist(props) {
    const [showPannel, setShowPannel] = useState("pannel1");
    const [activePannel, setActivePannel] = useState({
        pannel1: "tabs-title is-active",
        pannel2: "tabs-title",
        pannel3: "tabs-title",
    });

    function changePannel(pannel) {
        setShowPannel(pannel);
        
        if(pannel === "pannel1")
        {
           setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel1: "tabs-title is-active"}; })
           setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel2: "tabs-title"}; })
           setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel3: "tabs-title"}; })
        } else if(pannel === "pannel2")
        {
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel1: "tabs-title"}; })
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel2: "tabs-title is-active"}; })
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel3: "tabs-title"}; })
        } else if(pannel === "pannel3")
        {
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel1: "tabs-title"}; })
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel2: "tabs-title"}; })
            setActivePannel((prevActivePannel) => { return {...prevActivePannel, pannel3: "tabs-title is-active"}; })
        }  
    }

    return (
        <div className="top-foodies">
            <ul className="tabs" data-tabs id="foodies-tabs">
                <li className={activePannel.pannel1} onClick={() => changePannel("pannel1")}>
                    <a aria-selected="true">
                        TOP5 Foodies
                    </a>
                </li>
                <li className={activePannel.pannel2} onClick={() => changePannel("pannel2")}>
                    <a data-tabs-target="fpanel2" >
                        Best Photo
                    </a>
                </li>
                <li className={activePannel.pannel3} onClick={() => changePannel("pannel3")}>
                    <a data-tabs-target="fpanel3" >
                        Best Blogger
                    </a>
                </li>
            </ul>
            <div className="tabs-content foodies-tabs-content" data-tabs-content="foodies-tabs" >
                <div className="tabs-panel is-active" id="fpanel1" style={{ display: showPannel === "pannel1" ? "block" : "none" }}>
                    <div className="one-foodie">
                        <span className="one-foodie-number">#1</span>
                        <img className="avatar" src="../assets/img/avatar.png" />
                        <div className="one-foodie-info">
                            <span className="one-foodie-info-name">Imen</span>
                            <p>
                                38 Restos visités . 51 photos prises . 19 posts partagés
                            </p>
                        </div>
                    </div>
                    <div className="one-foodie">
                        <span className="one-foodie-number">#2</span>
                        <img className="avatar" src="../assets/img/avatar.png" />
                        <div className="one-foodie-info">
                            <span className="one-foodie-info-name">Imen</span>
                            <p>
                                38 Restos visités . 51 photos prises . 19 posts partagés
                            </p>
                        </div>
                    </div>
                    <div className="one-foodie">
                        <span className="one-foodie-number">#3</span>
                        <img className="avatar" src="../assets/img/avatar.png" />
                        <div className="one-foodie-info">
                            <span className="one-foodie-info-name">Imen</span>
                            <p>
                                38 Restos visités . 51 photos prises . 19 posts partagés
                            </p>
                        </div>
                    </div>
                </div>

                <div className="tabs-panel" id="fpanel2" style={{ display: showPannel === "pannel2" ? "block" : "none" }}>
                    <div className="one-foodie">
                        <span className="one-foodie-number">#1</span>
                        <img className="avatar" src="../assets/img/avatar.png" />
                        <div className="one-foodie-info">
                            <span className="one-foodie-info-name">Imen</span>
                            <p>
                                38 Restos visités . 51 photos prises . 19 posts partagés
                            </p>
                        </div>
                    </div>
                </div>

                <div className="tabs-panel" id="fpanel3" style={{ display: showPannel === "pannel3" ? "block" : "none" }}>
                    <div className="one-foodie">
                        <span className="one-foodie-number">#1</span>
                        <img className="avatar" src="../assets/img/avatar.png" />
                        <div className="one-foodie-info">
                            <span className="one-foodie-info-name">Imen</span>
                            <p>
                                38 Restos visités . 51 photos prises . 19 posts partagés
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
}

SideBarTopFoodist.propTypes = {};

export default SideBarTopFoodist;