import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from '../../context/UserContext';
import InfoIcon from '@material-ui/icons/Info';
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";

function FaireUnDon(props) {
    const {myCommande, setMyCommande, toggleDrawer} = props;
    const {activeUser} = useContext(UserContext);
    const [associations, setAssociations] = useState ([{
        _id: 1,
        image: "assets/img/eb255963c2a2ba64893f3cc6c805b593.png",
        name: "Association Rahma",
        address: "Marsa, Tunis"
    },{
        _id: 2,
        image: "assets/img/b56dde25b4f3ad0bce59ff891991f07d.png",
        name: "Association Rahma",
        address: "Marsa, Tunis"
    }]);

    let history=useHistory();

    const handleClickChange = (item) => {
        setMyCommande((prev) => ({ ...prev, associationId: item }));
    };

    const handleSwitchChange = (e) => {
        setMyCommande({ ...myCommande, winTak: !e.target.checked })
    };

    function commander(){
        history.push('/payerResidus/'+myCommande.articles[0].restaurantId)
    }

    return (myCommande &&
        <div className="faire-don" style={{border: "20px solid #e1e4e8", marginRight: "-2%", height: "100%"}}>
            <div className="name">
                <span>{activeUser.firstName} {activeUser.lastName},</span>
            </div>
            <div className="thanks">
                <span className="sentence-of-thanks">C’est très gentil de votre part.</span>
                <span className="sub-title"> Vous avez choisi de fair un Don !</span>
            </div>
            <div className="faire-un-don-lists">
                <span className="title">Votre liste (<span style={{color: '#ff6900'}}>
                    {myCommande.articles.length}
                </span>)</span>
                <div className="faire-un-don-lists-food">
                    {myCommande.articles.map((el) => (
                        <div className="list-food">
                            <img src={`https://${el.image}`} style={{borderRadius: 5}}/>
                            <div className="food-details">
                                <span className="food-name">{el.name}</span>
                                <span className="price">{el.price} dt</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="choose-ONG">
                <span className="title">Choisissez une ONG</span>
                <div className="associations">
                    {associations.map((el) => (
                        <div className="association" onClick={() => handleClickChange(el._id)}
                            style={myCommande.associationId === el._id ? {border: '1px solid #ff6900'} : {border: '1px solid #ffffff'}}>
                            <div className="association-img">
                                {/*<img src={`https://${el.image}`} />*/}
                                <img src={el.image} />
                            </div>
                            <div className="association-details">
                                <span className="association-name"> {el.name} </span>
                                <div className="association-location">
                                    <img src="assets/img/svg/location.png" />
                                    <span className="adress"> {el.address} </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <InfoIcon style={{color: "#ccc", marginBottom: -3}} fontSize='large'/>
                <span className="ONG-bottom"> Vous pouvez sélectionner une ONG à la fois</span>
            </div>
            <div className="faire-un-don-checkbox" style={{border: "1px solid #ccc", width: "97%",
                height: 50, borderRadius: 5}}>
                <div className="container">
                    <div className="switch">
                        <Grid container direction="row" style={{marginTop: "3%"}}>
                            <Grid item xs={9}>
                                <span>Acceptiez-vous de publier votre action sur notre timeline?</span>
                            </Grid>
                            <Grid item xs={1} style={{marginRight: "-2%"}}><span>OUI</span></Grid>
                            <Grid item xs={1}>
                                <input className="switch-input" 
                                    id="usePointTaktak" 
                                    type="checkbox" 
                                    name="usePointTaktak"
                                    checked={!myCommande.winTak}
                                    onClick={(e) => handleSwitchChange(e)} 
                                />
                                <label className="switch-paddle" htmlFor="usePointTaktak"> </label>
                            </Grid>
                            <Grid item xs={1} style={{marginLeft: "-2%"}}><span>NON</span></Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <div className="faire-un-don-buttom">
                <button className="cancel" onClick={toggleDrawer('right', false)}>Annuler l'opération</button>
                <button className="continuer" onClick={commander}>Continuer</button>
            </div>
        </div>
    )
}

export default FaireUnDon