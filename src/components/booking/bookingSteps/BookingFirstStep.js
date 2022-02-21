import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import { UserContext } from '../../../context/UserContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Multiselect from "./Multiselect";
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    styleClicked: {
        border: '1px solid #ff6900',
    },
    styleUnClicked: {
        border: '1px solid #ffffff',
        
    }
});

function BookingFirstStep(props) {
    const { classes } = props;
    const {myReservation, setMyReservation, guestsList, setGuestsList} = useContext(RestaurantContext);
    const {getUsers, users} = useContext(UserContext);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[4];
        
        return url;
    };

    useEffect(() => {
        getUsers();
    }, [props]);

    const handleChange = (e) => {
        const re = /^[0-9\b]+$/
        const value = e.target.value

        if (e.target.value === '' || re.test(e.target.value)) {
            setMyReservation({ ...myReservation, peopleNumber: value });
        }
    }

    const handleClickChange = (value) => {
        setMyReservation({ ...myReservation, peopleNumber: value, restaurantId: getUrlFromPath() })
    };

    const handleAutocomplete = (event, newValue) => {
        if (newValue != null) {
          const p = newValue.map((option) => option._id);
          setMyReservation((prev) => ({ ...prev, guests: p }));

          const value = newValue.map((option) => option);
          setGuestsList(value);
        }
    };

    return (
        <div className="orbit-slide">
            <div className="slide-title">
                Nombre de personne ?
            </div>
            <div className="booking-persons">
                <div className="numbers">
                    <div className={myReservation.peopleNumber===1 ? classes.styleClicked : classes.styleUnClicked} style={{marginRight: 10}} >
                        <div className={ "number-person"} onClick={(e) => handleClickChange(1)} defaultValue={1}>    
                            1
                        </div>
                    </div>
                    <div className={myReservation.peopleNumber===2 ? classes.styleClicked : classes.styleUnClicked} style={{marginRight: 10}}>
                        <div className="number-person" onClick={() => handleClickChange(2)}>
                            2
                        </div>
                    </div>
                    <div className={myReservation.peopleNumber===3 ? classes.styleClicked : classes.styleUnClicked} style={{marginRight: 10}} >
                        <div className="number-person" onClick={() => handleClickChange(3)}>
                            3
                        </div>
                    </div>
                    <div className={myReservation.peopleNumber===4 ? classes.styleClicked : classes.styleUnClicked} style={{marginRight: 10}} >
                        <div className="number-person" onClick={() => handleClickChange(4)}>
                            4
                        </div>
                    </div>
                    <div className={myReservation.peopleNumber===5 ? classes.styleClicked : classes.styleUnClicked} style={{marginRight: 10}} >
                        <div className="number-person" onClick={() => handleClickChange(5)}>
                            5
                        </div>
                    </div>
                    <div className="number-value">
                        <span>+5? Précisez:</span>
                        <input onChange={handleChange} value={myReservation.peopleNumber}/>
                    </div>
                </div>
            </div>
            <div className="tag-people">
                <div className="tag-people-info">
                    <span>Identification invité</span>
                    {users && (<Multiselect options={users} selectedOptions={myReservation.guests} handleMultiselect={(e,n) => handleAutocomplete(e,n)} labelText="Tapez son nom pour lui envoyer une notification"/>)}
                </div>
                <div className="tag-people-persons">
                    {guestsList.map((item) => (
                        <div className="tag-people-person">
                            {item.avatar ?
                                <img src={`https://${item.avatar}`} />
                            :
                            <img src="../../assets/img/avatar.png" />
                        }
                            <span className="name"> {item.firstName} {item.lastName} </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(BookingFirstStep)
