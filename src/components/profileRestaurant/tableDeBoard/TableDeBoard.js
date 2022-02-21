import React, {useState, useContext,useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import { useParams } from "react-router";
import RestaurantCommandeItem from './RestaurantCommandeItem';
import RevenuByProductsList from './RevenuByProductsList';
import RevenuPash from './RevenuPash';
import RatioLikes from './RatioLikes';
import RatioComments from './RatioComments';
import RatioShares from './RatioShares';
import RatioFollowers from './RatioFollowers';
import Reservation from './Reservation';

function TableDeBoard(props) {
  const { restaurant } = props;  
  const { getCommandebyRestaurantId, getReservationByRestaurantId, getDayRevenue, getDayAverage, 
    getBeverageSalesDaily, getBestSellers, getProductivity, getCustomerSatisfaction } = useContext(RestaurantContext);
  const [restaurantCommande,setRestaurantCommande]=useState([]);
  const [engagementChoice, setEngagementChoice] = useState("followers");
  let { id } = useParams();
  
  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    return url;
  };
  
  const sort =restaurantCommande &&  restaurantCommande.slice().sort(function(a, b){
    if(a.status < b.status) { return -1; }
    if(a.status > b.status) { return 1; }
    return 0;
  })

  const [todayRevenue, setTodayRevenue] = useState(0);
  const [todayAverage, setTodayAverage] = useState(0);
  const [todayBeverageSales, setTodayBeverageSales] = useState(0);
  const [todayBestSeller, setTodayBestSeller] = useState();
  const [productivity, setPrductivity] = useState(0);
  const [satisfaction, setSarisfaction] = useState(0);

  useEffect(() => {
    getCommandebyRestaurantId(id,setRestaurantCommande);
    getDayRevenue(getUrlFromPath(), setTodayRevenue);
    getDayAverage(getUrlFromPath(), setTodayAverage);
    getBeverageSalesDaily(getUrlFromPath(), setTodayBeverageSales);
    getBestSellers(getUrlFromPath(), setTodayBestSeller);
    getProductivity(getUrlFromPath(), setPrductivity);
    getCustomerSatisfaction(getUrlFromPath(), setSarisfaction);
  }, []);

  const [reservationsList, setReservationsList] = useState(null);
  useEffect(() => {
    getReservationByRestaurantId(restaurant._id, setReservationsList);
  }, [props]);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeChoice(type) {
    setEngagementChoice(type);
    handleClose();
  }
  
  return (
    <div className="tabs-panel is-active" id="panel5">
      <div className="dashboard">
        <div className="indicators">
          <div className="indicator money">
            <div className="indicator-icon">
              <i className="icon-money" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Day Revenue </span>
                <span className="indicator-value">{todayRevenue ? todayRevenue.toFixed(2) : 0} dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator cart">
            <div className="indicator-icon">
              <i className="icon-cart" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Day Average </span>
                <span className="indicator-value">{todayAverage ? todayAverage.toFixed(2) : 0} dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator trend">
            <div className="indicator-icon">
              <i className="icon-trend-up" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Beverage Sales </span>
                <span className="indicator-value">{todayBeverageSales ? todayBeverageSales.toFixed(2) : 0} dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator trend">
            <div className="indicator-icon">
              <i className="icon-trend-up" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Best Sellers </span>
                <span className="indicator-value">{todayBestSeller ? todayBestSeller.articleName : ""}</span>
                <span className="indicator-value">{todayBestSeller ? todayBestSeller.articleRevenue.toFixed(2) : 0} dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator trend">
            <div className="indicator-icon">
              <i className="icon-trend-up" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Productivity </span>
                <span className="indicator-value">{productivity ? productivity.toFixed(2) : 0} dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator trend">
            <div className="indicator-icon">
              <i className="icon-trend-up" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Customer Satisfaction </span>
                <span className="indicator-value">{satisfaction ? satisfaction.toFixed(2) : 0} %</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
        </div>
        <div className="my-stats-line">
          <div className="my-stats-line-title">
            <span> Revenue By Products </span>
            <span>
              Daily follow-up <i className="icon-dot-arrow-bottom" />
            </span>
          </div>
          {/*<div className="my-stats-line-indicators">
            <span className="stats-indicator">
              <span />
              <span>Indicateur 1</span>
            </span>
            <span className="stats-indicator">
              <span /> <span>Indicateur 1</span>
            </span>
          </div>
          <div className="my-stats-line-body">
            <img src="../../assets/img/chart-line.jpg" />
          </div>*/}
          <RevenuByProductsList restaurantId={getUrlFromPath()} />
        </div>
        <div className="my-stats-line">
          <div className="my-stats-line-title">
            <span> Revenue Pash </span>
            <span>
              Daily follow-up <i className="icon-dot-arrow-bottom" />
            </span>
          </div>
          {/*<RevenuPash restaurantId={getUrlFromPath()} />*/}
        </div>
        <div className="my-stats-line">
          <div className="my-stats-line-title">
            <span> Engagement Metrics </span>
            <span onClick={handleClick}>
              {engagementChoice} <i className="fal fa-sort-down" aria-hidden="true" />
            </span>
            <div
              className="filter-pane"
              data-dropdown
              data-auto-focus="true"
              style={{ display: anchorEl ? "block" : "none" }}
            >
              <ul className="filtre-my-besties-items">
                <li>
                  <div className="filter-header" onClick={handleClose}>
                    Filtrez l’affichage des engagement metrics
                    <i className="fal fa-sort-up" aria-hidden="true" />
                  </div>
                </li>
                <li>
                  <div className="filter-content">
                    <span className="content-title" onClick={()=>changeChoice("likes")}>Likes</span>
                    <span className="content-title" onClick={()=>changeChoice("comments")}>Comments</span>
                    <span className="content-title" onClick={()=>changeChoice("shares")}>Shares</span>
                    <span className="content-title" onClick={()=>changeChoice("followers")}>Followers</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ display: engagementChoice === "likes" ? "block" : "none" }}>
            <RatioLikes restaurantId={getUrlFromPath()} />
          </div>
          <div style={{ display: engagementChoice === "comments" ? "block" : "none" }}>
            <RatioComments restaurantId={getUrlFromPath()} />
          </div>
          <div style={{ display: engagementChoice === "shares" ? "block" : "none" }}>
            <RatioShares restaurantId={getUrlFromPath()} />
          </div>
          <div style={{ display: engagementChoice === "followers" ? "block" : "none" }}>
            <RatioFollowers restaurantId={getUrlFromPath()} />
          </div>
        </div>
        {/*<div className="my-stats">
          <div className="my-stats-title">
            <span> Visulisation Stats </span>
            <span>
              30 Jours
              <i className="fal fa-sort-down" aria-hidden="true" />
            </span>
          </div>
          <div className="my-stats-body">
            <div className="chart-container">
              <img src="../../assets/img/svg/chart.svg" />
              <span className="number-of-reservation">1456 Réservations</span>
            </div>
            <div className="chart-info">
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
            </div>
          </div>
        </div>*/}
        <div className="my-booking">
          <div className="my-booking-title">
            <span> Réservations </span>
            <span>Les plus récents </span>
          </div>
          <div className="my-booking-highlight">
            <span className="icon-notifications" />
            <span>
              <strong>5</strong> nouvelles réservations
            </span>
            <div className="my-booking-persons">
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
            </div>
            <button>Examiner</button>
          </div>
          <div className="my-booking-body">
            {reservationsList && reservationsList.map((el) => (
              <Reservation reservation={el} restaurant={restaurant} />
            ))}
          </div>
        </div>
        <div className="my-booking">
          <div className="my-booking-title">
            <span> Commandes </span>
            <span>Les plus récents </span>
          </div>
          <div className="my-booking-highlight">
            <span className="icon-notifications" />
            <span>
              <strong>{restaurantCommande && restaurantCommande.length} novelles commandes</strong> 
            </span>
            <div className="my-booking-persons">
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
            </div>
            <button>Examiner</button>
          </div>{}
          {  sort && sort.map((commande) => (
            <RestaurantCommandeItem commande={commande} setRestaurantCommande={setRestaurantCommande}/>
          ))}
        </div>      
        <div className="divider" />
      </div>
    </div>
  );
}

export default TableDeBoard;