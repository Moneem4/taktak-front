import React, {useState, useContext, useEffect} from 'react';
import {RestaurantContext} from "../../../context/RestaurantContext";
import { UserContext } from '../../../context/UserContext';
import { UiContext } from '../../../context/UiContext';
import CardMenu from '../menu/CardMenu';
import { NavLink } from "react-router-dom";

function BookingFifthStep(props) {
    const { restaurant } = props;
    const { getPersonalizedMenuByUserIdRestaurantId } = useContext(RestaurantContext);
    const { handleNext } = useContext(UiContext);
    const { activeUser } = useContext(UserContext);

    const [menuPersonaliser, setMenuPersonaliser] = useState(null);
    useEffect(() => {
        getPersonalizedMenuByUserIdRestaurantId(activeUser.userId, restaurant._id, setMenuPersonaliser);
    }, [props]);
     
    return (
        <div className="orbit-slide">
            <div className="menu-perso-header">
                <div className="left-side">
                    <div className="title"> Menu personnalisé </div>
                    {menuPersonaliser ?
                        <div className="sub-title"> 
                            Nous avons détecter que vous avez sauvegardé un menu personnalisé avec ce restaurant !
                        </div>
                    :
                        <></>
                    }
                </div>
                <NavLink exact to={`/profileRestaurant/` + restaurant._id + `/menu`} >
                    <div className="right-side">
                        <button>Choisir un menu</button>
                    </div>
                </NavLink>
            </div>
            <div className="menu">
                <div className="list-menu">
                    {menuPersonaliser && menuPersonaliser.map((article) => (
                        <CardMenu article={article} key={article._id}/>
                    ))}
                </div>
            </div>

            <span style={{marginTop: 190, marginLeft: "53%"}} onClick={() => {handleNext()}}>
                Continuer sans menu
            </span>
        </div>
    )
};

export default BookingFifthStep
