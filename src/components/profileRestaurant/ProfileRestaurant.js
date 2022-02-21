import React, { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/UiContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import DescriptionResto from "./description/DescriptionResto";
import ProfileRestoHeader from "./ProfileRestoHeader";
import ProfileRestoNavBar from "./ProfileRestoNavBar";
import PersonaliserArticle from "../customizemenu/personalizeMenu/PersonaliserArticle";
import MenuList from "../customizemenu/personalizeMenu/MenuList";
import SidebarProfileResto from "./SidebarProfileResto";
import Photos from "./photos/Photos";
import Menu from "./menu/Menu";
import Evaluation from "./evaluation/Evaluation";
import TableDeBoard from "./tableDeBoard/TableDeBoard";
import AjouterCategories from "./menu/AjouterCategories";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateArticle from "./menu/createArticle/CreateArticle";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListMenu from "../customizemenu/myMenu/ListMenu";
import DetailCommande from "./tableDeBoard/DetailCommande";
import ProfileRestaurantStories from "./ProfileRestaurantStories";
import RestaurantQRCode from "./qrCode/RestaurantQRCode";

function ProfileRestaurant(props) {
  const { classes } = props;
  const { getIndex } = useContext(UiContext);
  const { getRestaurantData, myRestaurantsList, updateRestaurant, restaurant, setRestaurant } =
    useContext(RestaurantContext);

  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    return url;
  };

  //const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    getRestaurantData(getUrlFromPath(), setRestaurant);
  }, [props]);

  if (myRestaurantsList) {
    var indexResto = getIndex(getUrlFromPath(), myRestaurantsList, "_id");
  } else {
    var indexResto = -1;
  }

  let isMyResto = indexResto >= 0;

  const handleImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      updateRestaurant(restaurant._id, img, "backgroundImage", setRestaurant);
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("backgroundImageInput");
    fileInput.click();
  };

  return (
    <div>
      {restaurant ? (
        <div className="profile-restaurant-page">
          <div className="profile-restaurant-page-content">
            <div
              className="profile-page-header"
              style={{
                backgroundImage: `url(https://${restaurant.backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              button
              onClick={() => handleEditPicture()}
            >
              {isMyResto && (
                <input
                  type="file"
                  id="backgroundImageInput"
                  onChange={handleImageChange}
                  hidden="hidden"
                  accept="image/*"
                />
              )}
            </div>
            <div className="profile-restaurant-page-content-feed container">
              <div className="feed-main">
                <Router>
                  {restaurant && (
                    <ProfileRestoHeader
                      restaurant={restaurant}
                      setRestaurant={setRestaurant}
                      isMyResto={isMyResto}
                    />
                  )}
                  <ProfileRestaurantStories />
                  {restaurant && <ProfileRestoNavBar restaurant={restaurant} />}
                  <div
                    className="tabs-content"
                    data-tabs-content="example-tabs"
                  >
                    <Switch>
                      <Route exact path="/profileRestaurant/:id">
                        <DescriptionResto
                          restaurant={restaurant}
                          isMyResto={isMyResto}
                        />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/photos">
                        <Photos restaurant={restaurant} restaurantId={getUrlFromPath()} />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/menu">
                        <Menu restaurant={restaurant} isMyResto={isMyResto} />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/qrcode">
                        <RestaurantQRCode restaurant={restaurant} />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/personalizedMenu" >
                        <ListMenu restaurant={restaurant}  />
                      </Route>
                      <Route
                        exact
                        path="/profileRestaurant/:id/customizeArticle/:id"
                        component={PersonaliserArticle}
                      />
                      <Route exact path="/profileRestaurant/:id/customizeMenu">
                        <MenuList restaurant={restaurant} />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/evaluation">
                        <Evaluation restaurant={restaurant} />
                      </Route>
                      {isMyResto && 
                      <Route exact path="/profileRestaurant/:id/table-de-board">
                        <TableDeBoard restaurant={restaurant} />
                      </Route>
                      }
                      <Route exact path="/detailCommande/:id">
                        <DetailCommande restaurant={restaurant} />
                      </Route>
                      <Route
                        exact
                        path="/profileRestaurant/:id/ajouterCategories"
                      >
                        <AjouterCategories restaurant={restaurant} />
                      </Route>
                      <Route exact path="/profileRestaurant/:id/nouveauArticle">
                        <CreateArticle restaurant={restaurant} />
                      </Route>
                    </Switch>
                  </div>
                </Router>
              </div>
              <SidebarProfileResto restaurant={restaurant} />
            </div>
            <div className="alerte-add-product">
              <span>Votre article est ajouté avec succès</span>
              <i className="fal fa-times close-alert-menu" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LinearProgress style={{ marginBottom: 10 }} />
          <LinearProgress color="secondary" />
        </div>
      )}
    </div>
  );
}

export default ProfileRestaurant;
