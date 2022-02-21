import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UserContext } from "../../../context/UserContext";
import CustomizeMenuCard from "./CustomizeMenuCard";

function ListCustomizedMenu(props) {
  const { classes } = props;
  const { activeUser } = useContext(UserContext);
  const { getPersonalizedMenuByUserId } = useContext(RestaurantContext);

  const [menus, setMenus] = useState(null);

  useEffect(() => {
   getPersonalizedMenuByUserId(activeUser.userId, setMenus);
  }, []);

  return ( 
    <div>
      {menus &&
        menus.map((item) => (
          <CustomizeMenuCard menu={item} setMenus={setMenus} />
        ))}
    </div>
  );
}

export default ListCustomizedMenu;
