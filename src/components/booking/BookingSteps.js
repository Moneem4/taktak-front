import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';
import { useTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import BookingEighthStep from './bookingSteps/BookingEighthStep';
import BookingFifthStep from './bookingSteps/BookingFifthStep';
import BookingFirstStep from './bookingSteps/BookingFirstStep';
import BookingForthStep from './bookingSteps/BookingForthStep';
import BookingSecondStep from './bookingSteps/BookingSecondStep';
import BookingSeventhStep from './bookingSteps/BookingSeventhStep';
import BookingSixthStep from './bookingSteps/BookingSixthStep';
import BookingThirdStep from './bookingSteps/BookingThirdStep';
import BookingNinthStep from './bookingSteps/BookingNinthStep';
import { NavLink } from 'react-router-dom';
import Modal from "../util/UtilModal";
import ReactStars from "react-rating-stars-component";

const styles = (theme) => ({
    input: {

    }
});

function BookingSteps(props) {
    const { classes } = props;
    const { activeStep, handleNext, handleBack } = useContext(UiContext);
    const {getRestaurantData, createReservation, myReservation, setMyReservation, getMenuPersonaliserList} = useContext(RestaurantContext);
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const [showModalRating, setShowModalRating] = useState(false);

    const theme = useTheme();

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[4];
        
        return url;
    };

    const [restaurant, setRestaurant] = useState(null);
    const [menuPersonaliser, setMenuPersonaliser] = useState(null);
    useEffect(() => {
        getRestaurantData(getUrlFromPath(), setRestaurant);
        getMenuPersonaliserList(activeUser.userId,  getUrlFromPath(), setMenuPersonaliser);
    }, [props]);

    const openModalRating = () => {
        setShowModalRating(true);
    };

    let firstExample;
    if(restaurant){
        firstExample = {
            size: 20,
            value: restaurant.restaurantRate,
            edit: false,
        };
    }

    let page;
    if(restaurant){
        if (activeStep === 0) {
            page = <BookingFirstStep />;
        } else if (activeStep === 1) {
            page = <BookingSecondStep restaurant={restaurant} />;
        } else if (activeStep === 2) {
            page = <BookingThirdStep />;
        } else if (activeStep === 3) {
            page = <BookingForthStep restaurant={restaurant} />;
        } else if (activeStep === 4) {
            page = <BookingFifthStep restaurant={restaurant} />;
        } else if (activeStep === 5) {
            page = <BookingSixthStep />;
        } else if (activeStep === 6) {
            page = <BookingSeventhStep />;
        } else if (activeStep === 7) {
            page = <BookingEighthStep restaurant={restaurant}/>;
        } else if (activeStep === 8) {
            page = <BookingNinthStep />;
        } 
    };
    
    const confirmBooking = () => {
        if(activeStep=== 7){
            createReservation(myReservation).then(response => {
                //updateTaktakPoints( activeUser.userId, activeUser.countPoints+Math.round(myReservation.prix));
            });
        }
    };

    const savePM = () => {
        if(activeStep=== 4){
            setMyReservation({ ...myReservation, menuPersonaliserId: menuPersonaliser._id });
        }
    };
    
    return restaurant ? (
        <div className="booking-page">
            <div className="booking-page-content">
                <div className="eprimez-vous">
                    Réservation
                </div>
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="step-two booking-step">
                            <div className="step-two-body">
                                <div className="header-inner container">
                                    <div className="profile-picture">
                                        <img src={`https://${restaurant.avatar}`} />
                                    </div>
                                    <div className="user-info">
                                        <div className="user-info-info">
                                            <span className="name">{restaurant.name} </span>
                                            <span className="location">
                                                <i className="fal fa-map-marker-alt" /> {restaurant.address}
                                                <div onClick={openModalRating}>
                                                    <ReactStars {...firstExample} />
                                                </div>
                                                <div className="votes">
                                                    {restaurant.restaurantRate}/5
                                                </div>
                                                <div className="votes-nb">
                                                    {restaurant.countVotes} votes
                                                </div>
                                            </span>
                                            <div className="tags">{restaurant.tags.map((el) => `#${el} `)}</div>
                                        </div>  
                                    </div>
                                    <div className="other-info">
                                        <span>
                                            <i className="fal fa-phone-volume" />
                                            {restaurant.phone}
                                        </span>
                                        <NavLink exact to={`/taktakPoints`}>
                                            <a> 
                                                <img src="../../assets/img/row_.png" />X6 <span className="wintak">WinTak</span> 
                                            </a>
                                        </NavLink>
                                    </div>
                                </div>
                                <div style={{height: 350}}>
                                    {page}
                                </div>
                                <div style={{display: activeStep === 8 ? "none" : "block"}}>
                                    <MobileStepper
                                        variant="dots"
                                        steps={9}
                                        position="static"
                                        activeStep={activeStep}
                                        style={{ width: '100%', flexGrow: 1, position: "relative", bottom: "0 !important", backgroundColor:"#fff" }}
                                        nextButton={
                                            <Button size="small" onClick={() => {handleNext(); confirmBooking(); savePM()}} disabled={activeStep === 8}>
                                                Continuer
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                            </Button>
                                        }
                                        backButton={
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0 || activeStep === 8}>
                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                Retour
                                            </Button>
                                        }
                                    />
                                </div>
                                <div className="alert-booking" style={{display: activeStep === 4 ? "block" : "none"}}>
                                    <span>Si vous choisissez de continuer, TakTak prendra, automatiquement, en considération vos menus personnalisés</span>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>           
            </div> 
            <Modal
                showModal={showModalRating}
                setShowModal={setShowModalRating}
                page="createRating"
                evaluatedId={restaurant._id}
                ratingType="RESTAURANT"
            /> 
        </div>
    ) : (
        <></>
    );
}

export default withStyles(styles)(BookingSteps)
