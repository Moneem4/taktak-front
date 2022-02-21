import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TodayIcon from '@material-ui/icons/Today';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Slider from "infinite-react-carousel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '../../util/UtilModal';

const styles = (theme) => ({
    container: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        height: 510,
        width: 550,
        padding: 10
    },
    appBar: {
        borderBottom: '0.1px groove white',
    },
    inputForm: {
        boxShadow: 'none',
        height: '6rem',
        backgroundColor: '#fff',
        border: '1px solid #e8e8e8',
        fontSize: '2rem',
        color: '#484848',
        borderRadius: '5px',
        padding: '0 2rem',
        margin: 10
    },
    iconStyle: {
        marginTop: 5,
        fontSize: '4rem',
        color: '#ff6900',
    },
    autocomplete: {
        width: '87%',
        margin: 10,
        fontSize: '2rem'
    },
    label: {
        fontSize: 14,
        color: '#d40562',
        textAlign: "left",
        marginLeft: "1vw",
        marginRight: "1vw",
        marginTop: 20,
        width: "-webkit-fill-available",
    },
    styleClicked: {
        border: '1px solid #d40562',
        borderRadius: 5,
        width: '93% !important'
    },
    styleUnClicked: {
        border: '1px solid #ffffff',
    },
    serviceItem: {
        width: 105,
        height: '8rem',
        borderRadius: '5px',
        backgroundColor: '#fff',
        border: '1px solid #e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        cursor: 'pointer'
    },
    formControl: {
        margin: theme.spacing(1),
        width: 500,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});

const cuisines = ["American", "Chinese", "French", "Greek", "Indian", "Italian", "Japanese", "Korean",
    "Mediterranean", "Mexican", "Spanish", "Syrian", "Thai", "Tunisian", "Turkish" ];

const servicesItems = ["OUTDOOR_SEATING", "FAMILY_FRIENDLY", "KIDS_FRIENDLY", "LGBTQ_FRIENDLY", "LARGE_GATHERING",
    "WHEELCHAIR_ACCESSIBLE", "HAS_TV", "PET_FRIENDLY", "LIVE_MUSIC", "PARKING", "LIVE_FOOTBALL_GAMES", "SMOKING_AREA",
    "NO_SMOKING", "MINDFUL_DINING", "BEERS_AND_WINE", "HAPPY_HOUR", "FREE_WIFI", "GOOD_FOR_ANNIVERSARIES",
    "GOOD_FOR_BIRTHDAYS", "ROMANTIC", "PANORAMIC_VIEW", "PRIVATE_DINING", "BUSINESS_MEETINGS"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function UpdateCordonneesResto(props) {
    const {classes, activeResto, clicked, setClicked, checked, setChecked} = props;
    const [showModal, setShowModal] = useState(false);
    const {updateRestaurant, horaireResto, setHoraireResto} = useContext(RestaurantContext);
    const [servicesName, setServicesName] = useState(activeResto.services);
    const [time, setTime] = useState(horaireResto)
    
    var settings = {
        slidesToShow: 8,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: -200,
    };

    const [newRestoData, setNewRestoData] = useState({
        services: activeResto.services, 
        openingTime: {
            timeFrom: activeResto.openingTime.timeFrom,
            timeTo: activeResto.openingTime.timeTo,
            days: activeResto.openingTime.days
        },
        specialty: activeResto.specialty,
        averageCost: activeResto.averageCost,
        payment: activeResto.payment,
    });
    
    const handleClose = () => {
        props.setShowModal(!props.showModal)
    }
    
    const handleChange = (event) => {
        const value = event.target.value
        const field = event.target.name
        setNewRestoData({ ...newRestoData, [field]: value })
    }    

    const handleCuisinesChange = (event, value) => {    
        setNewRestoData({ ...newRestoData, specialty: value })
    };
    
    const handlePayementChange = (value, e) => {

        setChecked({ ...checked, [value]: e.target.checked });

        if(!checked[value] === true) {
    
            setNewRestoData((prevNewRestoData) => {
                let items = {...prevNewRestoData};
          
                let modes = [...items.payment, value];
                
                let updatedMode = {...prevNewRestoData, payment: modes}
                
                return updatedMode;
            });
        } else {
            setNewRestoData((prevNewRestoData) => {
                let items = {...prevNewRestoData};
                let modes = [...items.payment]
    
                const indexMode = modes.findIndex(
                    el => el.mode === value
                );
    
                modes.splice(indexMode, 1);
                
                return { ...prevNewRestoData, payment: modes };
            })
        }
    }

    const [clickedDays, setClickedDays] = useState({
        Lundi: false,
        Mardi: false,
        Mercredi: false,
        Jeudi: false,
        Vendredi: false,
        Samedi: false,
        Dimanche: false
    });

    const openModal = () => {
        if(newRestoData.openingTime.days)
        {
            for (var i = 0; i < newRestoData.openingTime.days.length; i++) {

                const item = newRestoData.openingTime.days[i];
                setClickedDays((prevClickedDays) => {
        
                    let items = {...prevClickedDays};
                    
                    let daysList = prevClickedDays;
                    
                    const updatedClickedList = {...daysList , [item]: true }
                    items = updatedClickedList;
        
                    return (items) ;
                });
            }
        }
        setShowModal(true);
    };

    const handleClickChange = (value) => {

        setClicked({ ...clicked, [value]: !clicked[value] });
        
        if(!clicked[value] === true) {
    
            setNewRestoData((prevNewRestoData) => {
                let items = {...prevNewRestoData};
          
                let services = [...items.services, value];
                
                let updatedServices = {...prevNewRestoData, services: services}
    
                return updatedServices;
            });
        } else {
            setNewRestoData((prevNewRestoData) => {

                let items = {...prevNewRestoData};
                let services = [...items.services]
    
                const indexService = services.findIndex(
                    el => el === value
                );
    
                services.splice(indexService, 1);
                
                return { ...prevNewRestoData, services: services };
            })
        }
    }

    const handleServicesChange = (event) => {
        setServicesName(event.target.value);  
    };

    async function submitChange () {
        const data = {
            services: servicesName,
            timeFrom: newRestoData.openingTime.timeFrom,
            timeTo: newRestoData.openingTime.timeTo,
            days: newRestoData.openingTime.days,
            specialty: newRestoData.specialty,
            averageCost: newRestoData.averageCost,
            payment: newRestoData.payment
        };
        
        await updateRestaurant(activeResto._id, data, "cordonnees");

        const timeF = data.timeFrom.toString().substr(16, 5);
        const timeT = data.timeTo.toString().substr(16, 5);
        //setHoraireResto(timeF + " - " + timeT)
        handleClose()
    }

    const services = (
        <div style={{marginTop: 10, marginBottom: 10}}>
            <Slider { ...settings }>
                <div className={clicked.OUTDOOR_SEATING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.OUTDOOR_SEATING} onClick={() => handleClickChange("OUTDOOR_SEATING")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Outdoor Seating</span>
                    </div>
                </div>
                <div className={clicked.FAMILY_FRIENDLY ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.FAMILY_FRIENDLY} onClick={() => handleClickChange("FAMILY_FRIENDLY")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Family Friendly</span>
                    </div>
                </div>
                <div className={clicked.KIDS_FRIENDLY ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.KIDS_FRIENDLY} onClick={() => handleClickChange("KIDS_FRIENDLY")}>
                        <i className="fal fa-wifi" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Kids Friendly</span>
                    </div>
                </div>
                <div className={clicked.LGBTQ_FRIENDLY ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.LGBTQ_FRIENDLY} onClick={() => handleClickChange("LGBTQ_FRIENDLY")} >
                        <i className="fal fa-futbol" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>LGBTQ Friendly</span>
                    </div>
                </div>
                <div className={clicked.LARGE_GATHERING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.LARGE_GATHERING} onClick={() => handleClickChange("LARGE_GATHERING")} >
                        <i className="fal fa-child" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Large Gathering</span>
                    </div>
                </div>
                <div className={clicked.WHEELCHAIR_ACCESSIBLE ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.WHEELCHAIR_ACCESSIBLE} onClick={() => handleClickChange("WHEELCHAIR_ACCESSIBLE")} >
                        <i className="fal fa-baby" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Wheelchair Accessible</span>
                    </div>
                </div>
                <div className={clicked.HAS_TV ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.HAS_TV} onClick={() => handleClickChange("HAS_TV")} >
                        <i className="fal fa-users" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Has TV</span>
                    </div>
                </div>
                <div className={clicked.PET_FRIENDLY ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.PET_FRIENDLY} onClick={() => handleClickChange("PET_FRIENDLY")} >
                        <i className="fal fa-users" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Pet-Friendly</span>
                    </div>
                </div>
                <div className={clicked.LIVE_MUSIC ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.LIVE_MUSIC} onClick={() => handleClickChange("LIVE_MUSIC")} >
                        <i className="fal fa-users" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Live Music</span>
                    </div>
                </div>
                <div className={clicked.PARKING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.PARKING} onClick={() => handleClickChange("PARKING")} >
                        <i className="fal fa-parking" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Parking</span>
                    </div>
                </div>
                <div className={clicked.LIVE_FOOTBALL_GAMES ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.LIVE_FOOTBALL_GAMES} onClick={() => handleClickChange("LIVE_FOOTBALL_GAMES")} >
                        <i className="fal fa-futbol" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Live football games</span>
                    </div>
                </div>
                <div className={clicked.SMOKING_AREA ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.SMOKING_AREA} onClick={() => handleClickChange("SMOKING_AREA")} >
                        <i className="fal fa-users" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Smoking Area</span>
                    </div>
                </div>
                <div className={clicked.NO_SMOKING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.NO_SMOKING} onClick={() => handleClickChange("NO_SMOKING")} >
                        <i className="fal fa-futbol" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Smoking Area</span>
                    </div>
                </div>
                <div className={clicked.MINDFUL_DINING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.MINDFUL_DINING} onClick={() => handleClickChange("MINDFUL_DINING")} >
                        <i className="fal fa-futbol" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Mindful Dining</span>
                    </div>
                </div>
                <div className={clicked.BEERS_AND_WINE ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.BEERS_AND_WINE} onClick={() => handleClickChange("BEERS_AND_WINE")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Beers &#38; Wine</span>
                    </div>
                </div>
                <div className={clicked.HAPPY_HOUR ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.HAPPY_HOUR} onClick={() => handleClickChange("HAPPY_HOUR")} >
                        <i className="fal fa-futbol" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Happy Hour</span>
                    </div>
                </div>
                <div className={clicked.FREE_WIFI ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.FREE_WIFI} onClick={() => handleClickChange("FREE_WIFI")}>
                        <i className="fal fa-wifi" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Free Wifi</span>
                    </div>
                </div>
                <div className={clicked.GOOD_FOR_ANNIVERSARIES ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.GOOD_FOR_ANNIVERSARIES} onClick={() => handleClickChange("GOOD_FOR_ANNIVERSARIES")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Good for Anniversaries</span>
                    </div>
                </div>
                <div className={clicked.GOOD_FOR_BIRTHDAYS ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.GOOD_FOR_BIRTHDAYS} onClick={() => handleClickChange("GOOD_FOR_BIRTHDAYS")}>
                        <i className="fal fa-wifi" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Good for Birthdays</span>
                    </div>
                </div>
                <div className={clicked.ROMANTIC ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.ROMANTIC} onClick={() => handleClickChange("ROMANTIC")}>
                        <i className="fal fa-wifi" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Romantic</span>
                    </div>
                </div>
                <div className={clicked.PANORAMIC_VIEW ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.PANORAMIC_VIEW} onClick={() => handleClickChange("PANORAMIC_VIEW")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Panoramic View</span>
                    </div>
                </div>
                <div className={clicked.PRIVATE_DINING ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.PRIVATE_DINING} onClick={() => handleClickChange("PRIVATE_DINING")}>
                        <i className="fal fa-wifi" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Private Dining</span>
                    </div>
                </div>
                <div className={clicked.BUSINESS_MEETINGS ? classes.styleClicked : classes.styleUnClicked}>
                    <div className={classes.serviceItem} checked={clicked.BUSINESS_MEETINGS} onClick={() => handleClickChange("BUSINESS_MEETINGS")} >
                        <i className="fal fa-wine-glass-alt" style={{fontSize: '2rem', color: '#d40562', fontWeight: 'normal', marginTop: '1rem'}}/>
                        <span>Business Meetings</span>
                    </div>
                </div>
            </Slider>
        </div>
    );

    const servicesList = (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Services</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={servicesName}
                defaultValue={newRestoData.services}
                onChange={handleServicesChange}
                name={"services"}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
            {servicesItems.map((service) => (
                <MenuItem key={service} value={service}>
                    <Checkbox checked={servicesName.indexOf(service) > -1} />
                    <ListItemText primary={service} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    );
    
    return (
        <div className={classes.container}>
            <Grid container direction="row">
                <Grid item xs={11} style={{ marginTop: 10 }}>
                    <Typography variant="h4" style={{marginBottom: 10, color: "#175db3"}}>
                        Cordonnees Restaurant
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="Close" arrow>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => handleClose()}
                        >
                            <CloseIcon style={{fontSize: 20, color: "#ff6900"}}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <div className="services">
                {servicesList}               
            </div>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h4" className={classes.label}>
                        Horaires d'ouverture
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <input type="text" className={classes.inputForm} placeholder="Horaires d’ouverture"
                        value={time}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => openModal()}
                    >
                        <TodayIcon className={classes.iconStyle} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                style={{marginTop: -20}}
            >
                <Grid item xs={4} className={classes.labelTitle}>
                    <Typography variant="h4" className={classes.label}>
                        Cuisine
                    </Typography>
                </Grid>
                <Grid item xs={8} style={{height: 70, overflow: "scroll"}}>
                    <Autocomplete
                        multiple
                        limitTags={1}
                        id="multiple-limit-tags"
                        options={cuisines}
                        defaultValue={newRestoData.specialty}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => handleCuisinesChange(event, value)}
                        name={"specialty"}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Cuisine" placeholder="Cuisines" Style={{fontSize: 14}}/>
                        )}
                        style={{marginLeft: 10}}
                    />
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h4" className={classes.label}>
                        Côut moyen
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <input type="text" className={classes.inputForm} placeholder="Côut moyen" 
                        value={newRestoData.averageCost} name="averageCost" onChange={handleChange}/>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h4" style={{marginTop: 20}}>
                        Dt
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h4" className={classes.label}>
                Moyen de payement
            </Typography>
            <Grid container direction="row" spacing={1} style={{marginLeft: 10}}>
                <Grid item xs={4}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={6} style={{marginTop: 10}}>
                            <span style={{fontSize: 12, color: "#000"}}>Espèce</span>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={checked.CASH}
                                onChange={(e) => handlePayementChange("CASH", e)}
                                name="CASH"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={6} style={{marginTop: 10}}>
                            <span style={{fontSize: 12, color: "#000"}}>Credit Cards</span>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={checked.BANK_CARD} 
                                onChange={(e) => handlePayementChange("BANK_CARD", e)}
                                name="BANK_CARD"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={6} style={{marginTop: 10}}>
                            <span style={{fontSize: 12, color: "#000"}}>Chèque</span>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={checked.CHECK}
                                onChange={(e) => handlePayementChange("CHECK", e)}
                                name="CHECK"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={6} style={{marginTop: 10}}>
                            <span style={{fontSize: 12, color: "#000"}}>Meal Voucher</span>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={checked.TAKTAK_POINTS}
                                onChange={(e) => handlePayementChange("TAKTAK_POINTS", e)}
                                name="TAKTAK_POINTS"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="row" spacing={1}>
                        <Grid item xs={6} style={{marginTop: 10}}>
                            <span style={{fontSize: 12, color: "#000"}}>Ticket Restaurant</span>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={checked.RESTAURANT_TICKET}
                                onChange={(e) => handlePayementChange("RESTAURANT_TICKET", e)}
                                name="RESTAURANT_TICKET"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider />
            <Grid container direction="row" style={{marginTop: 5}}>
                <Grid item xs={8}></Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={submitChange}
                        style={{fontSize: 12}}
                    >
                        Enregistrer
                    </Button>
                </Grid>
            </Grid>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                page="updateHoraire"
                newRestoData={newRestoData}
                setNewRestoData={setNewRestoData}
                clickedDays={clickedDays}
                setClickedDays={setClickedDays}
                time={time}
                setTime={setTime}
            />
        </div>
    )
}

export default withStyles(styles)(UpdateCordonneesResto)