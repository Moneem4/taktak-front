import React, {useState, useEffect, useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Modal from '../../util/UtilModal';

function CordonneesResto(props) {
    const {restaurant, isMyResto} = props;
    const {horaireResto, setHoraireResto} = useContext(RestaurantContext);
    const [ouvert, setOuvert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [clicked, setClicked] = useState({
        OUTDOOR_SEATING: false,
        FAMILY_FRIENDLY: false,
        KIDS_FRIENDLY: false,
        LGBTQ_FRIENDLY: false,
        LARGE_GATHERING: false,
        WHEELCHAIR_ACCESSIBLE: false,
        HAS_TV: false,
        PET_FRIENDLY: false,
        LIVE_MUSIC: false,
        PARKING: false,
        LIVE_FOOTBALL_GAMES: false,
        SMOKING_AREA: false,
        NO_SMOKING: false,
        MINDFUL_DINING: false,
        BEERS_AND_WINE: false,
        HAPPY_HOUR: false,
        FREE_WIFI: false,
        GOOD_FOR_ANNIVERSARIES: false,
        GOOD_FOR_BIRTHDAYS: false,
        ROMANTIC: false,
        PANORAMIC_VIEW: false,
        PRIVATE_DINING: false,
        BUSINESS_MEETINGS: false,
    });

    const [checked, setChecked] = useState({
        CASH: false,
        BANK_CARD: false,
        CHECK: false,
        TAKTAK_POINTS: false,
        RESTAURANT_TICKET: false
    });

    const openModal = () => {
        for (var i = 0; i < restaurant.services.length; i++) {

            const item = restaurant.services[i];
            setClicked((prevClickedServices) => {
    
                let items = {...prevClickedServices};
                
                let servicesList = prevClickedServices;
                
                const updatedClickedList = {...servicesList , [item]: true }
                items = updatedClickedList;
    
                return (items) ;
            });
        }

        for (var i = 0; i < restaurant.payment.length; i++) {

            const item = restaurant.payment[i];
            setChecked((prevCheckedPayment) => {
    
                let items = {...prevCheckedPayment};
                
                let paymentList = prevCheckedPayment;
                
                const updatedCheckedList = {...paymentList , [item]: true }
                items = updatedCheckedList;
    
                return (items) ;
            });
        }

        setShowModal(true);
    };

    const timeFrom = restaurant.openingTime.timeFrom.substr(11, 5);
    const timeTo = restaurant.openingTime.timeTo.substr(11, 5);
    const horaire = timeFrom + " - " + timeTo
    setHoraireResto(horaire);

    const renderService = (param) => {
        switch (param) {
            case "OUTDOOR_SEATING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-wine-glass-alt" aria-hidden="true" />
                            <span>Outdoor seating</span>
                        </div>;
            case "FAMILY_FRIENDLY":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-wifi" aria-hidden="true" />
                            <span>Family friendly</span>
                        </div>;
            case "KIDS_FRIENDLY":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-futbol" aria-hidden="true" />
                            <span>Kids friendly</span>
                        </div>;
            case "LGBTQ_FRIENDLY":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-wine-glass-alt" aria-hidden="true" />
                            <span>LGBTQ Friendly</span>
                        </div>;
            case "KIDS_FRIENDLY":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-baby" aria-hidden="true" />
                            <span>Kids friendly</span>
                        </div>;
            case "LARGE_GATHERING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-child" aria-hidden="true" />
                            <span>Large gathering</span>
                        </div>;
            case "WHEELCHAIR_ACCESSIBLE":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-baby" aria-hidden="true" />
                            <span>Wheelchair accessible</span>
                        </div>;
            case "HAS_TV":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Has TV</span>
                        </div>;
            case "PET_FRIENDLY":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Pet friendly</span>
                        </div>;
            case "LIVE_MUSIC":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Live music</span>
                        </div>;
            case "PARKING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-parking" aria-hidden="true" />
                            <span>Parking</span>
                        </div>;
            case "LIVE_FOOTBALL_GAMES":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-futbol" aria-hidden="true" />
                            <span>Live football games</span>
                        </div>;
            case "SMOKING_AREA":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Smoking area</span>
                        </div>;
            case "NO_SMOKING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>No smoking</span>
                        </div>;
            case "MINDFUL_DINING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Mindful dining</span>
                        </div>;
            case "BEERS_AND_WINE":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-wine-glass-alt" aria-hidden="true" />
                            <span>Beers and wine</span>
                        </div>;
            case "HAPPY_HOUR":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Happy hour</span>
                        </div>;
            case "FREE_WIFI":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-wifi" aria-hidden="true" />
                            <span>Free wifi</span>
                        </div>;
            case "GOOD_FOR_ANNIVERSARIES":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Good for anniversaries</span>
                        </div>;
            case "GOOD_FOR_BIRTHDAYS":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Good for birthdays</span>
                        </div>;
            case "ROMANTIC":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Romantic</span>
                        </div>;
            case "PANORAMIC_VIEW":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Panoramic view</span>
                        </div>;
            case "PRIVATE_DINING":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Private dining</span>
                        </div>;
            case "BUSINESS_MEETINGS":
                return  <div className="service-item" key={param}>
                            <i className="fal fa-users" aria-hidden="true" />
                            <span>Business meetings</span>
                        </div>;
            default:
                return null;
        }
    }    

    useEffect(() => {
		const heureFrom = restaurant.openingTime.timeFrom.substr(11, 2);
        const minuteFrom = restaurant.openingTime.timeFrom.substr(14, 2);
        const heureTo = restaurant.openingTime.timeTo.substr(11, 2);
        const minuteTo = restaurant.openingTime.timeTo.substr(14, 2);

        const start = Number(heureFrom) * 60 + Number(minuteFrom);
        const end =  Number(heureTo) * 60 + Number(minuteTo);
        const date = new Date(); 
        const now = date.getHours() * 60 + date.getMinutes();

        if(start <= now && now <= end)
        {
            setOuvert(true);
        }
	}, [ouvert, restaurant.openingTime]);

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
            >
                <Grid item xs={10} >
                    <h3 className="brief-title profile-title">Cordonnees Restaurant </h3>
                </Grid>
                <Grid item xs={1}>
                    <IconButton edge="end" color="inherit" aria-label="menu" style={{marginTop: -20}} onClick={() => openModal()}
                        style={{ display: isMyResto ? "block" : "none" }}>
                        <EditIcon style={{fontSize: 20, color: "#ff6900"}} />
                    </IconButton>
                </Grid>
            </Grid>
            <div className="services">
                {restaurant.services.map((service) => (
                    renderService(service)
                ))}
            </div>
            <div className="my-booking-ele-bottom">
                <div>
                    <span className="my-booking-label"> Horaires d’ouverture</span>
                    <span className="my-booking-value">
                        <span className="open" style={{ display: ouvert ? "block" : "none" }}>OUVERT</span> 
                        <span className="close" style={{ display: ouvert ? "none" : "block" }}>FERMER</span> 
                        {/*horaireResto*/}
                        <i className="fal fa-calendar-alt" />
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Cuisines</span>
                    <span className="my-booking-value">
                    <span className="my-booking-value">{restaurant.specialty.map((el) => `#${el} `)}</span>
                    {/* <span className="number-sur-taktak"> Dont 3 son sur TakTak</span> */}
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Coût moyen <i className="fal fa-info-square" /></span>
                    <span className="my-booking-value">
                    <span className="number">{restaurant.averageCost} dt </span>
                    <span className="sous-value "> / personne</span>
                    <span className="my-booking-sous-value"> (environ)</span>
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Modalité de payement</span>
                    <span className="my-booking-value"> {restaurant.payment.map((el) => `#${el} `)} </span>
                </div>
            </div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                page="restoCordonnees"
                activeResto={restaurant}
                clicked={clicked}
                setClicked={setClicked}
                checked={checked}
                setChecked={setChecked}
            />
        </div>      
    )
}

CordonneesResto.propTypes = {

}

export default CordonneesResto