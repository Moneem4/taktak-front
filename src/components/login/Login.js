import React, {useState} from "react";
import PropTypes from "prop-types";
import OldMember from "./OldMember";
import NewMember from "./NewMember";
import FirstSlide from "./FirstSlide";
import SecondeSlide from "./SecondeSlide";
import ThirdSlide from "./ThirdSlide";

function Login(props) {
  const [formType, setFormType] = useState(true);

  let form;
  if (formType) {
    form =( <OldMember  />);
  } else {
    form = (<NewMember/>);
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
              <li className="tabs-title is-active" className={formType? "tabs-title is-active" : "tabs-title" }>
                <a
                
                  aria-selected="true"
                  onClick={()=>setFormType(true)}
                >
                  Déjà membre
                </a>
              </li>
              <li className={!formType? "tabs-title is-active" : "tabs-title" }>
                <a data-tabs-target="signup" onClick={()=>setFormType(false)}>
                  Nouveau membre
                </a>
              </li>
            </ul>
            <div className="tabs-content" data-tabs-content="login-tabs">
             {form}
            </div>
            
         
          </div>
         
       
          <div className="auth-form-footer" />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
