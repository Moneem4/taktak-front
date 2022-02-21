import React from "react";
import RCardMiniPost from "./results/RCardMiniPost";
import Slider from "infinite-react-carousel";
import FoodCategory from "./FoodCategory";
import RestauranCard from "../profile/checkins/RestauranCard";
import SoftRestaurantCard from "./results/SoftRestaurantCard";
import Rcards from "../profile/descreptionUtils/Rcards";
import ResultsSideBar from "./ResultsSideBar";
import MobileAppAd from "../ads/MobileAppAd";
import SodexoAd from "../ads/SodexoAd";
import EpicEatsFiltre from "./results/EpicEatsFiltre";

function Results(props) {

  const location="Sousse"
  const restaurants = [
    {
      _id: 1,
      name: "restaurant1",
      profileImage: "https://picsum.photos/500/400",
      location: "Tunis",
      rate: 4,
      horaire: "",
      isOpen: true,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices quam ac augue efficitur porttitor. Nunc gravida tortor vestibulum."
    },
    {
      _id: 2,
      name: "restaurant1",
      profileImage: "https://picsum.photos/400/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices quam ac augue efficitur porttitor. Nunc gravida tortor vestibulum."
    },
    {
      _id: 3,
      name: "restaurant2",
      profileImage: "https://picsum.photos/401/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/301" },
        { name: "Ali", profileImage: "https://picsum.photos/200/302" },
        { name: "Ali", profileImage: "https://picsum.photos/200/303" },
        { name: "Ali", profileImage: "https://picsum.photos/200/304" },
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices quam ac augue efficitur porttitor. Nunc gravida tortor vestibulum."
    },
  ];

  const softRestaurants = [
    {
      _id: 1,
      name: "restaurant1",
      profileImage: "https://picsum.photos/500/400",
      location: "Tunis",
      rate: 4,
      horaire: "",
      isOpen: true,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
      ],
      promo: '40%'
    },
    {
      _id: 2,
      name: "restaurant2",
      profileImage: "https://picsum.photos/400/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
        { name: "Ali", profileImage: "https://picsum.photos/200/300" },
      ],
      promo: '40%'
    },
    {
      _id: 3,
      name: "restaurant3",
      profileImage: "https://picsum.photos/401/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/301" },
        { name: "Ali", profileImage: "https://picsum.photos/200/302" },
        { name: "Ali", profileImage: "https://picsum.photos/200/303" },
        { name: "Ali", profileImage: "https://picsum.photos/200/304" },
      ],
      promo: '40%'
    },
    {
      _id: 4,
      name: "restaurant4",
      profileImage: "https://picsum.photos/401/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/301" },
        { name: "Ali", profileImage: "https://picsum.photos/200/302" },
        { name: "Ali", profileImage: "https://picsum.photos/200/303" },
        { name: "Ali", profileImage: "https://picsum.photos/200/304" },
      ],
      promo: null
    },
    {
      _id: 5,
      name: "restaurant5",
      profileImage: "https://picsum.photos/401/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/301" },
        { name: "Ali", profileImage: "https://picsum.photos/200/302" },
        { name: "Ali", profileImage: "https://picsum.photos/200/303" },
        { name: "Ali", profileImage: "https://picsum.photos/200/304" },
      ],
      promo: null
    },
    {
      _id: 6,
      name: "restaurant6",
      profileImage: "https://picsum.photos/401/400",
      location: "Tunis",
      rate: 3,
      horaire: "",
      isOpen: false,
      infos: [
        "À emporter Disponible",
        "Vin et bière",
        "Sièges intérieurs",
        "Wifi",
        "Projection sportive en direct",
        "Parking privé",
      ],
      friendsBeenThereNumber: 34,
      friendsBeenThere: [
        { name: "Ali", profileImage: "https://picsum.photos/200/301" },
        { name: "Ali", profileImage: "https://picsum.photos/200/302" },
        { name: "Ali", profileImage: "https://picsum.photos/200/303" },
        { name: "Ali", profileImage: "https://picsum.photos/200/304" },
      ],
    },
  ];

  const settings = {
    rows: 1,
    slidesPerRow: 4,
    shift: 0,
    padding: 10,
  };

  const settings1 = {
    rows: 1,
    slidesPerRow: 1,
    shift: 0,
    padding: 10,
    dots: true,
  };

  const categories = [
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
    { name: "cat1", image: "../" },
  ];

  const items = categories.map((el) => (
    <div
      style={{
        margin: "0.3rem",
        whiteSpace: "nowrap",
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        height: "16rem !important",
        width: "21rem !important",
      }}
    >
      <FoodCategory category={el} />
    </div>
  ));
  const items1 = restaurants.map((el) => <RestauranCard restaurant={el} />);
  const softRestaurantItems= softRestaurants.map(el=><SoftRestaurantCard restaurant={el}/>)
  
  return (
    <div className="my-besties-page">
      <div className="my-besties-page-content container">
        <div className="my-besties-page-content-feed">
          <div className="autour-de-moi-page-content container">
            <div className="autour-de-moi-page-content-inner">
              <div className="autour-de-moi-page-content-inner-feed-and-more">
                <div className="autour-de-moi-page-content-inner-feed">
                  <RCardMiniPost
                    restaurant={{
                      name: "Restaurant 5chine",
                      profileImage: "https://picsum.photos/400",
                      image: "https://picsum.photos/200/300",
                      location: "Tunis",
                    }}
                  />

                  <EpicEatsFiltre />

                  <div className="restaurants-found">
                    <div className="restaurants-found-header" style={{marginBottom: 20}}>
                      <span className="founds" >Tunis, {restaurants.length} restaurants trouvés</span>
                      <span className="refresh">
                        <i className="icon-location" />
                        Actualiser
                      </span>
                      <div className="filter">
                        <span>Les plus évalués </span>
                        <i className="fal fa-sort-down" />
                        <div className="filter-pane">
                          <div className="filter-header">
                            Filtrez l’affichage des restaurants
                            <i className="fal fa-sort-up" />
                          </div>
                          <div className="filter-content">
                            <span className="content-title">Nouveaux</span>
                            <span className="content-title">Les plus évalués</span>
                            <span className="content-title">Les plus appreciés</span>
                            <span className="content-title">Les plus visités</span>
                            <span className="content-title">Les plus visités</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Slider {...settings} style={{ padding: "0px 50px" }}>
                        {items}
                      </Slider>
                    </div>
                  </div>

                  <div className="best-of-taktak">
                    <div className="best-of-taktak-header">
                      <div className="header-top">
                        <span className="header-title">Best of TAKTAK</span>
                        <span className="header-number">({restaurants.length})</span>
                        <button>
                          <i className="icon-dots-horizontal" />
                        </button>
                      </div>
                      <div className="header-bottom">
                        Explorez les listes organisées des meilleurs restaurants, cafés,
                        pubs et bars de {location}.
                      </div>
                    </div>
                    <div className="best-of-taktak-body">
                      <Slider {...settings1}>{items1}</Slider>
                    </div>
                  </div>

                  <div className="soft-restaurants">
                    <div className="soft-restaurants-header">
                      <div className="header-top">
                        <span className="header-title">Restaurants Soft</span>
                        <span className="header-number">({softRestaurants.length})</span>
                        <button>
                          <i className="icon-dots-horizontal" />
                        </button>
                      </div>
                      <div className="header-bottom">
                        Explorez les listes organisées des meilleurs restaurants, cafés,
                        pubs et bars de {location}.
                      </div>
                    </div>
                    <div className="soft-restaurants-body" style={{maxHeight:400,Y:'scroll',overflowX:'hidden'}}>
                      {softRestaurantItems}
                    </div>
                    {/* <div className="soft-restaurants-footer">
                      <div className="line" />
                      <span>Afficher Plus</span>
                      <div className="line" />
                    </div> */}
                  </div>

                  <div className="you-may-like">
                    <div className="you-may-like-header">
                      <div className="header-top">
                        <span className="header-title">Vous aimerez peut-être aussi</span>
                        <button>
                          <i className="icon-dots-horizontal" />
                        </button>
                      </div>
                    </div>
                    <div className="you-may-like">
                      <div className="you-may-like-body">
                        {restaurants.map((el) =>
                          <Rcards restaurant={el}/>
                        )}
                        {/*<Rcards restaurant={restaurants[0]}/>
                        <Rcards restaurant={restaurants[1]}/>
                        <Rcards restaurant={restaurants[2]}/>*/}
                      </div>
                    </div>
                  </div>

                  {/* <div className="program">
                    <img src="../assets/img/svg/store.svg" />
                    <div className="program-info">
                      <span className="program-title">
                        Programme Partenaire de lancement
                      </span>
                      <span className="program-description">
                        Rejoignenz notre programme de lancement et garantissez un
                        affichage PREMIUM pour votre restaurant sur notre plateforme.
                      </span>
                    </div>
                    <i className="icon-arrow-right" />
                  </div> */}

                  <div className="popular-restaurants">
                    <div className="popular-restaurants-header">
                      <div className="header-top">
                        <span className="header-title">Populaires dans les environs</span>
                        <button>
                          <i className="icon-dots-horizontal" />
                        </button>
                      </div>
                    </div>
                    <div className="popular-restaurants-body">
                      <div className="popular-restaurant">
                        <span className="location">Sousse</span>
                        <span className="number-of-restaurants">( 12 restaurants)</span>
                      </div>
                      <div className="popular-restaurant">
                        <span className="location">Monastir</span>
                        <span className="number-of-restaurants">( 09 restaurants)</span>
                      </div>
                      <div className="popular-restaurant">
                        <span className="location">Tunis</span>
                        <span className="number-of-restaurants">( 22 restaurants)</span>
                      </div>
                      <div className="popular-restaurant">
                        <span className="location">Ben Arous</span>
                        <span className="number-of-restaurants">( 08 restaurants)</span>
                      </div>
                      <div className="popular-restaurant">
                        <span className="location">Nabeul</span>
                        <span className="number-of-restaurants">( 03 restaurants)</span>
                      </div>
                      <div className="popular-restaurant">
                        <span className="location">Mahdia</span>
                        <span className="number-of-restaurants">( 01 restaurants)</span>
                      </div>
                    </div>
                  </div>

                  <div className="soft-restaurants">
                    <div className="soft-restaurants-header">
                      <div className="header-top">
                        <span className="header-title">Curabitur luctus sodales lectus</span>
                        <span className="header-number">(12)</span>
                        <button>
                          <i className="icon-dots-horizontal" />
                        </button>
                      </div>
                      <div className="header-bottom">
                        Explorez les listes organisées des meilleurs restaurants, cafés, pubs et bars de Sousse.
                      </div>
                    </div>
                    <div className="soft-restaurants-body">
                      {softRestaurantItems}
                    </div>
                  </div>
              
                  <MobileAppAd />
                  <SodexoAd />
                </div>
                {/* <ResultsSideBar /> */}
              </div> 
            </div>
          </div>
          <ResultsSideBar /> 
        </div>
      </div>       
    </div>
  );
}

export default Results;
