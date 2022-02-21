import React, { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AvatarUser from "../atoms/AvatarUser";
import AvatarRestaurant from "../atoms/AvatarRestaurant";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 15,
  },
});

function SwitchProfile(props) {
  const classes = useStyles();
  const { setShowModal } = props;
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { myRestaurantsList, selectedProfile, setSelectedProfile } = useContext(RestaurantContext);
  
  const handleClose = () => {
    setShowModal(!props.showModal);
  };

  const myProfilesList = myRestaurantsList && myRestaurantsList.map((el, index) => {
    const item = {
      type: "RESTAURANT",
      profile: el
    }
    return item
  })

  const itemUser = {
    type: "USER",
    profile: activeUser
  }
  myProfilesList.push(itemUser)

  function changeProfile(el) {
    setSelectedProfile(el);
    
    if(el.type === "RESTAURANT"){
      setActiveUser({...activeUser, isRestaurant: true, connectedRestaurentId: el.profile._id})
    }else{
      setActiveUser({...activeUser, isRestaurant: false, connectedRestaurentId: ""})
    }

    handleClose()
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Switch Profile
        </Typography>
        {myProfilesList
            .filter((option) => option.profile !== selectedProfile.profile)
            .map((el, index) => (
                el.type === "RESTAURANT" ?
                    <div style={{ display: "flex", marginTop: 10 }} onClick={() => changeProfile(el)}>
                        <AvatarRestaurant activeUser={el.profile} link={true} />
                        <span className="resto-name-switch-profile" >
                            <strong>{el.profile.name}</strong>
                        </span>
                    </div>
                :
                    <div style={{ display: "flex" , marginTop: 10}} onClick={() => changeProfile(el)}>
                        <AvatarUser activeUser={el.profile} />
                        <span className="resto-name-switch-profile" >
                            <strong>{el.profile.firstName}</strong>
                        </span>
                    </div>
                ))
            }
      </CardContent>
    </Card>
  );
}

export default SwitchProfile;
