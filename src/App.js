import React, { useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/SideBar";

import Login from "./components/login/Login";
import { useState } from "react";
import Profile from "./components/profile/Profile";

import Chat from "./components/chat/Chat";
import AutourdeMoi from "./components/autourDeMoi/AutourdeMoi";
import ProposerMoiUnRestaurant from "./components/ProposerMoiUnRestaurant/ProposerMoiUnRestaurant";
import SoFastSoHot from "./components/ProposerMoiUnRestaurant/SoFastSoHot";
import Besties from "./components/Besties/Besties";
import Blog from "./components/blog/Blog";
import Notifications from "./components/notifications/Notifications";
import AutourDeMoiResult from "./components/autourDeMoi/AutourDeMoiResult";
import RedigerVotreArticle from "./components/blog/RedigerVotreArticle";
import ExprimerVous from "./components/blog/ExprimerVous";
import ExprimerVousPost from "./components/blog/ExprimerVousPost";
import BookingPageProcess from "./components/bookingPageProcess/BookingPageProcess";
import BookingPage from "./components/booking/BookingPage";
import BookingPageProcessCTA from "./components/booking/BookingPageProcessCTA";
import BookingProcess from "./components/booking/BookingProcess";
import BookingSteps from "./components/booking/BookingSteps";
import ProfileRestaurant from "./components/profileRestaurant/ProfileRestaurant";
import GestionResidus from "./components/residus/GestionResidus";
import GestionResidusUser from "./components/residusUser/GestionResidusUser";
import Messages from "./components/messages/Messages";
import TakTakPoints from "./components/taktakPoints/TakTakPoints";
import GrilleDeValeurs from "./components/taktakPoints/GrilleDeValeurs";
import MangerAvecInconnu from "./components/mangerAvec/MangerAvecInconnu";
import CreateStory from "./components/stories/CreateStory";

import ResetPassword from "./components/login/ResetPassworld";

// import "../src/assets/stylesheets/css/flickity.min.css";
// import "../src/assets/stylesheets/lib/slick-theme.css";
// import "../src/assets/stylesheets/lib/slick.css";
import "../src/assets/stylesheets/css/sidebar.css";
import "../src/assets/stylesheets/css/feeds.css";
import "../src/assets/stylesheets/css/navbar.css";
import "../src/assets/stylesheets/css/cards.css";
import "../src/assets/stylesheets/css/shared.css";
import "../src/assets/stylesheets/css/main.css";
import "../src/assets/stylesheets/css/login.css";
import "../src/assets/stylesheets/css/autour-de-moi.css";
import "../src/assets/stylesheets/css/proposer-moi.css";
import "../src/assets/stylesheets/css/my-besties.css";
import "../src/assets/stylesheets/css/blog.css";
import "../src/assets/stylesheets/css/notifications.css";
import "../src/assets/stylesheets/css/menu-customize.css";
import "../src/assets/stylesheets/lib/slick.css";
import "../src/assets/stylesheets/css/user-foodlist-profile.css";
import "../src/assets/stylesheets/css/booking-page.css";
import "../src/assets/stylesheets/css/booking-page-process.css";
import "../src/assets/stylesheets/css/profile-restaurant.css";
import "../src/assets/stylesheets/css/gestion-de-residus.css";
import "../src/assets/stylesheets/css/faire-un-don.css";
import "../src/assets/stylesheets/css/inbox.css";
import "../src/assets/stylesheets/css/taktak-points.css";
import "../src/assets/stylesheets/css/eat-with-Stranger.css";
import "../src/assets/stylesheets/css/suivi-commande.css";
import "../src/assets/stylesheets/css/paiement.css";
import "../src/assets/stylesheets/css/onboarding.css";
import "../src/assets/fonts/style.css"
import "../src/assets/stylesheets/css/suivi-commandeRestaurant.css"
import "../src/assets/fonts/style.css";

import Loader from "./components/layout/Loader";
import MessagesLeftSideBar from "./components/messages/MessagesLeftSideBar";
import SidebarContent from "./components/messages/SidebarContent";

import MenuPersonaliser from "./components/customizemenu/listArticles/MenuPersonaliser";
import ConsulterMenu from "./components/customizemenu/myMenu/ConsulterMenu";
import PersonaliserArticle from "./components/customizemenu/personalizeMenu/PersonaliserArticle";
import ListMenu from "./components/customizemenu/myMenu/ListMenu";
import SuiviCommande from "./components/commande/SuiviCommande";
import DetailCommande from "./components/commande/DetailCommande";

import Payement from "./components/payement/Payement";
import PayementResult from "./components/payement/PayementResult";
import MenuList from "./components/customizemenu/personalizeMenu/MenuList";
import PayementResidus from "./components/payementResidus/PayementResidus";
import PayementResultResidus from "./components/payementResidus/PayementResultResidus";
import OnBoarding from "./components/onBoarding/OnBoarding";
import CreateRestaurant from "./components/profileRestaurant/createRestaurant/CreateRestaurant";
import PostPage from "./components/post/PostPage";
import UpdateProfile from "./components/profile/updateProfile/UpdateProfile";

import SearchRestaurant from "./components/searchRestaurant/SearchRestaurant";

import LeftSideBar from "./components/layout/LeftSideBar";
import AuthRoute from "./components/util/AuthRoute";
import { UserContext } from "./context/UserContext";
import DetailArticleBlog from "./components/blog/DetailArticleBlog";
import DraftArticle from "./components/blog/DraftArticle";
import Promos from "./components/promos/Promos";

function App() {
  const history = useHistory();

  const [pathname, setPathname] = useState(window.location.pathname);

  const { activeUser, loaduser, userById, isAuthenticated, selectedUser } =
    useContext(UserContext);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuthenticated && token) loaduser();
  }, [token]);

  // useEffect(() => {
  //  return isAuthenticated

  // }, [isAuthenticated]);

  useEffect(() => {
    return history;
  }, [history]);

  return (
    <div>
      {isAuthenticated && token && (
        <div className="feeds-page">
          <Router>
            {/*sideBarContent*/}
            {/* <div style={{ display: sidebar === "messagerie" ? "block" : "none" }}>
              <MessagesLeftSideBar />
            </div>
            <div style={{ display: sidebar === "" ? "block" : "none" }}>
              <SideBar />
            </div> */}
            {pathname === "/messagerie" ? <MessagesLeftSideBar /> : <SideBar />}

            <div className="feeds-page-content container">
              <Navbar />
              <Chat />
              <Switch>
                <Route exact path="/updateProfile">
                  <UpdateProfile selectedUser={selectedUser} />
                </Route>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts/:id" component={PostPage} />
                <Route exact path="/autourDeMoi" component={AutourdeMoi} />
                <Route
                  exact
                  path="/proposerMoiUnRestaurant"
                  component={SoFastSoHot}
                />
                <Route exact path="/besties" component={Besties} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/promos" component={Promos} />
                <Route exact path="/profile" component={Profile} />

                {/* 
                <Route exact path="/profile/" component={Profile}/>
                <Route exact path="/profile/photos" component={Profile} />
                <Route exact path="/profile/checkins" component={Profile} />
                <Route exact path="/profile/checkins/location" component={Profile} />
                <Route exact path="/profile/evaluations" component={Profile} />

                <Route exact path="/profile/dashboard" component={Profile} />

                <Route exact path="/customizeMenu" component={MenuPersonaliser} />
                <Route exact path="/customizeMenu/listMenu" component={ConsulterMenu} />
                <Route exact path="/customizeMenu/listMenu/:id" component={PersonaliserArticle} />
                
                <Route exact path="/autourDeMoi/:name" component={AutourDeMoiResult} />

                <Route exact path="/profile/dashboard" component={Profile} /> */}

                <Route
                  exact
                  path="/customizeMenu"
                  component={MenuPersonaliser}
                />
                <Route
                  exact
                  path="/customizeMenu/listMenu"
                  component={ConsulterMenu}
                />
                <Route
                  exact
                  path="/customizeMenu/listMenu/:id"
                  component={PersonaliserArticle}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/personalizedMenu"
                  component={ProfileRestaurant}
                />

                <Route
                  exact
                  path="/profileRestaurant/:id/customizeArticle/:id"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/customizeMenu"
                  component={ProfileRestaurant}
                />
                <Route exact path="/customizeMenu/menu" component={MenuList} />
                <Route
                  exact
                  path="/autourDeMoi/:name"
                  component={AutourDeMoiResult}
                />

                <Route exact path="/profile/:userId" component={Profile} />
                <Route exact path="/profile/:userId/" component={Profile} />
                <Route
                  exact
                  path="/profile/:userId/photos"
                  component={Profile}
                />
                <Route
                  exact
                  path="/profile/:userId/checkins"
                  component={Profile}
                />
                <Route
                  exact
                  path="/profile/:userId/checkins/:location"
                  component={Profile}
                />
                <Route
                  exact
                  path="/profile/:userId/evaluations"
                  component={Profile}
                />
                <Route
                  exact
                  path="/profile/:userId/dashboard"
                  component={Profile}
                />

                <Route
                  exact
                  path="/profileRestaurant/:id"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/photos"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/menu"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/evaluation"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/table-de-board"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/qrcode"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/ajouterCategories"
                  component={ProfileRestaurant}
                />
                <Route
                  exact
                  path="/profileRestaurant/:id/nouveauArticle"
                  component={ProfileRestaurant}
                />

                <Route
                  exact
                  path="/blog/nouveauArticle"
                  component={RedigerVotreArticle}
                />

                <Route
                  exact
                  path="/blog/draftArticle/:id"
                  component={DraftArticle}
                />

                <Route
                  exact
                  path="/blog/exprimerVous"
                  component={ExprimerVous}
                />
                <Route
                  exact
                  path="/blog/exprimerVous/:id"
                  component={ExprimerVousPost}
                />

                <Route
                  exact
                  path="/booking-page-process-CTA"
                  component={BookingPageProcessCTA}
                />
                <Route
                  exact
                  path="/bookingProcess/:id"
                  component={BookingProcess}
                />
                <Route
                  exact
                  path="/bookingPageProcess"
                  component={BookingPageProcess}
                />
                <Route exact path="/booking/:id" component={BookingPage} />
                <Route
                  exact
                  path="/booking/:id/bookingProcess"
                  component={BookingSteps}
                />
                
                <Route
                  exact
                  path="/gestionResidus"
                  component={GestionResidus}
                />
               
                 <Route
                  exact
                  path="/gestionResidusUser"
                  component={GestionResidusUser}
                />
                <Route exact path="/messagerie">
                  <Messages changeNavbar={(e) => setPathname(e)} />
                </Route>

                <Route exact path="/messagerie/:id">
                  <Messages changeNavbar={(e) => setPathname(e)} />
                </Route>

                <Route exact path="/taktakPoints" component={TakTakPoints} />

                <Route
                  exact
                  path="/taktakPoints/grille"
                  component={GrilleDeValeurs}
                />

                <Route exact path="/mangerAvec" component={MangerAvecInconnu} />

                <Route exact path="/suivi-commandeRestaurant" component={SuiviCommande} />

                <Route
                  exact
                  path="/detail-commande/:id"
                  component={DetailCommande}
                />

                <Route exact path="/payer/:id" component={Payement} />

                <Route exact path="/payer/:id/result" component={PayementResult} />
                <Route exact path="/payerResidus/:id" component={PayementResidus}/>
                <Route exact path="/payerResidus/:id/result" component={PayementResultResidus} />
                <Route exact path="/onBoarding" component={OnBoarding} />

                <Route
                  exact
                  path="/createRestaurant"
                  component={CreateRestaurant}
                />

                <Route
                  exact
                  path="/searchRestaurant/:searchValue"
                  component={SearchRestaurant}
                />

                <Route
                  exact
                  path="/blog/articleBlog/:id"
                  component={DetailArticleBlog}
                />

                <Route
                  exact
                  path="/story/create"
                  component={CreateStory}
                />
              </Switch>
            </div>
          </Router>
        </div>
      )}
      {!isAuthenticated && !token && (
        <Router>
          <Switch>
            <Route
              exact
              path="/login/resetPassworld"
              component={ResetPassword}
            />
            <Route exact path="/resetPassworld" component={ResetPassword} />
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      )}
      {!isAuthenticated && token && <Loader />}
    </div>
  );
}

export default App;
