import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function AvatarUser(props) {
  const { activeUser } = props;
  
  let a = activeUser.avatar ? (
    <Avatar src={`https://${activeUser.avatar}`} />
  ) : (
    <Avatar style={{ fontSize: 15 }}>
      {activeUser.firstName &&
        activeUser.firstName[0].concat(activeUser.lastName[0]).toUpperCase()}
    </Avatar>
  );

  const [loaded, setLoaded] = useState(a);
  useEffect(() => {
    setLoaded(a);
  }, [activeUser.avatar]);

  return (
    props.link ?   
      <NavLink exact to={`/profile/${activeUser.userId}`}>
        <div>{activeUser && loaded}</div>
      </NavLink> :
        <div>{activeUser && loaded}</div>
  );
}

AvatarUser.defaultProps = { link : true }

export default AvatarUser;
