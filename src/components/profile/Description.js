import React from "react";
import UserStats from "./descreptionUtils/UserStats";
import Brief from "./descreptionUtils/Brief";
import Personal from "./descreptionUtils/Personal";
import Followers from "./descreptionUtils/Followers";
import Rflollows from "./descreptionUtils/Rflollows";

function Description(props) {
  const {  selectedUser, isntme } = props;
  // const { followers, follows, rFollows } = user;
  return (
    <div className="tabs-panel is-active" id="panel1">

      <UserStats isntme={isntme} selectedUser={selectedUser}  />
   
      <Brief  selectedUser={selectedUser} isntme={isntme}/>

      <Personal selectedUser={selectedUser} isntme={isntme}/>

      <Followers selectedUser={selectedUser} isntme={isntme}  />
      
      <Rflollows selectedUser={selectedUser} isntme={isntme}/>

    </div>
  );
}

Description.propTypes = {};

export default Description;
